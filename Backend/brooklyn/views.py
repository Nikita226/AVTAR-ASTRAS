from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from rest_framework.response import Response
from .models import *
from django.contrib.auth.models import User
from datetime import datetime, timedelta
import jwt
from cryptography.fernet import Fernet


KEY = b'lUon1kigtr-M1YaYmlliE4R4jmUZu02hlrkDDJ9wNu4='

def validateJWT(request):
    jwtToken = request.META['HTTP_AUTHORIZATION']
    try:
        validation = jwt.decode(jwtToken, 'maths', algorithms="HS256")
        return True
    except:
        return False

class LoginAPI(APIView):

    def post(self, request):
        JWT_SECRET = 'maths'
        JWT_ALGORITHM = 'HS256'
        JWT_EXP_DELTA_SECONDS = 2628000
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            payload = {
                'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
            }

            jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)

            return Response({"status": "200 OK", "username": username, "token": jwt_token})
        else:
            return Response({"status": "400 Bad Request", "message": "Invalid Password/Username"})


class RegisterAPI(APIView):
    def post(self, request):
        JWT_SECRET = 'maths'
        JWT_ALGORITHM = 'HS256'
        JWT_EXP_DELTA_SECONDS = 2628000
        username = request.data['username']
        password = request.data['password']
        email = request.data['email']
        fname = request.data['fname']
        lname = request.data['lname']

        try:
            user = User.objects.create_user(username, email, password, first_name=fname, last_name=lname)
            user.save()
            try:
                payload = {
                    'user_id': user.id,
                    'exp': datetime.utcnow() + timedelta(seconds=JWT_EXP_DELTA_SECONDS)
                }

                jwt_token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)

                return Response(
                    {"status": "200 OK", "username": username, "fname": fname, "lname": lname, "email": email,
                     "token": jwt_token})
            except:
                return Response({"status": "400 Bad Request", "message": "Invalid Password/Username"})
        except:
            return Response({"status": "403 User already exists", "message": "User already exists."})


class Secrets(APIView):
    def post(self, request):
        if validateJWT(request) is False:
            return Response({"status": "401 Unauthorized", "message": "authentication token invalid."})
        usersUsername = request.data['usersUsername']
        password = request.data['password']
        website = request.data['website']
        username = request.data['username']

        thatUser = User.objects.filter(username=usersUsername)[0]

        # encrypt the password
        fernet = Fernet(KEY)

        password = fernet.encrypt(password.encode())
        # password = password.decode('UTF-8')
        newSecret = Secret(username=username, password=password, website=website, user=thatUser)
        newSecret.save()

        return Response({
            "status": "200 OK",
            "website": website,
            "username": username})

class AllSecrets(APIView):
    def get(self, request, username):
        if validateJWT(request) is False:
            return Response({"status": "401 Unauthorized", "message": "authentication token invalid."})
        thatUser = User.objects.filter(username=username)[0]
        allSecrets = Secret.objects.filter(user=thatUser)
        thoseSecrets = []
        for secret in allSecrets:
            theSecret = {}
            theSecret['id'] = secret.id
            theSecret['website'] = secret.website
            theSecret['password'] = secret
            fernet = Fernet(KEY)
            theSecret['password'] = fernet.decrypt(secret.password.tobytes()).decode()
            theSecret['username'] = secret.username
            thoseSecrets.append(theSecret)
        return Response(thoseSecrets)

class TheSecret(APIView):
    def get(self, request, id):
        if validateJWT(request) is False:
            return Response({"status": "401 Unauthorized", "message": "authentication token invalid."})
        thatSecret = Secret.objects.filter(id=id)[0]
        fernet = Fernet(KEY)
        password = fernet.decrypt(thatSecret.password.tobytes()).decode()
        # thatSecret['password'] = fernet.decrypt(TheSecret.password.tobytes()).decode()
        website = thatSecret.website
        username = thatSecret.username
        return Response({"id": id, "website": website, "username": username, "password": password})

    def put(self, request, id):
        if validateJWT(request) is False:
            return Response({"status": "401 Unauthorized", "message": "authentication token invalid."})
        username = request.data['username']
        password = request.data['password']
        #encrypt password
        fernet = Fernet(KEY)
        password = fernet.encrypt(password.encode())
        website = request.data['website']
        Secret.objects.filter(id=id).update(username=username, password=password, website=website)
        return Response({
            "status": "200 OK",
            "website": website,
            "username": username})

    def delete(self, request, id):
        if validateJWT(request) is False:
            return Response({"status": "401 Unauthorized", "message": "authentication token invalid."})
        Secret.objects.filter(id=id).delete()
        return Response({"status": "204", "message": "deleted successfully"})

