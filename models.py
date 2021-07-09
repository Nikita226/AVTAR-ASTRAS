from django.db import models
from django.contrib.auth.models import User

class Secret(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    website = models.CharField(max_length=14000)
