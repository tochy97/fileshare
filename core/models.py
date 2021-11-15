from django.db import models
from django.contrib.auth.models import User

class Comment(models.Model):
    user = models.ManyToManyField(User)
    post = models.CharField(max_length=255, default="Empty")


class File(models.Model):
    file = models.FileField()
    comments = models.ManyToManyField(Comment)
    user = models.ManyToManyField(User)

class Group(models.Model):
    groupname = models.CharField(max_length=100, default=("First"))
    id = models.AutoField(primary_key = True, unique = True)
    data_added = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(User)
    admin = models.ManyToManyField(User, related_name='admin')
    file = models.ManyToManyField(File)