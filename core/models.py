from django.db import models
from django.contrib.auth.models import User, Group

class Group(models.Model):
    groupname = models.CharField(max_length=100, default=("First"))
    id = models.AutoField(primary_key = True, unique = True)
    data_added = models.DateTimeField(auto_now_add=True)
    users = models.ManyToManyField(User)
    admin = models.ManyToManyField(User, related_name='admin')
    file = models.FileField(default='')