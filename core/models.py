from django.db import models
from django.contrib.auth.models import User

class Comment(models.Model):
    id = models.AutoField(primary_key = True, unique = True)
    data_added = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=255, default="_Empty_")

class Post(models.Model):
    id = models.AutoField(primary_key = True, unique = True)
    data_added = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=25, default="_Empty_")
    description = models.CharField(max_length=255, default="_Empty_")
    file = models.FileField()

class Group(models.Model):
    groupname = models.CharField(max_length=100, default=("_Empty_"))
    id = models.AutoField(primary_key = True, unique = True)    
    data_added = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="User")
    users = models.ManyToManyField(User)
    admin = models.ManyToManyField(User, related_name='admin')
    post = models.ManyToManyField(Post)