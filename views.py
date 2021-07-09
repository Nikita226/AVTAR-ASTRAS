from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from django.contrib.auth.models import User

class SecretAPI(APIView):
    def get(self, request):
        try:
            thatInstance = Secret.objects.filter()
            lst = []
            for i in thatInstance:
                lst.append(i.username)
            return Response(lst)

        except:
            return Response({"status": "500 Some Error Occurred"})

    def post(self, request):
        try:
            username = request.data['username']
            password = request.data['password']
            website = request.data['website']
            newuser = User(username=username, password=password, website=website)
            newuser.save()
            return Response({"status": "200 OK"})
        except:
            return Response({"status": "500 Some Error Occurred"})

    def delete(self, request, user):
        try:
            Secret.objects.filter(user=user).delete()
            return Response({"status": "202 Accepted", "message": "deleted successfully."})
        except:
            return Response({"status": "500 Some Error Occurred"})

    def put(self, request, user):
        try:
            username = request.data['username']
            password = request.data['password']
            website = request.data['website']
            Secret.objects.filter(user=user).update(username=username)
            Secret.objects.filter(user=user).update(password=password)
            Secret.objects.filter(user=user).update(website=website)
            return Response({"status": "202 Accepted", "message": "updated successfully."})
        except:
            return Response({"status": "500 Some Error Occurred"})

    """def get(self, request):
        try:
            thatInstance = User.objects.filter()
            lst = []
            for i in thatInstance:
                lst.append(i.password)
            return Response(lst)

        except:
            return Response({"status": "500 Some Error Occurred"})"""