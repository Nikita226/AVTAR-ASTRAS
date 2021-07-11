from .views import *
from django.urls import path

urlpatterns = [
    path('api/secrets/<str:username>', AllSecrets.as_view(), name='AllSecrets'),
    path('api/createsecret', Secrets.as_view(), name='Secrets'),
    path('api/thesecret/<int:id>', TheSecret.as_view(), name='TheSecret'),
    path('api/login', LoginAPI.as_view(), name='LoginAPI'),
    path('api/SignUp', RegisterAPI.as_view(), name='RegisterAPI')

]