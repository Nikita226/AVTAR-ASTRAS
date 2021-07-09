from .views import *
from django.urls import path

urlpatterns = [

    path('api/Secret', SecretAPI.as_view(), name='SecretAPI')
]