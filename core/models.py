from django.db import models
from django.contrib.auth.models import User

class Comment(models.Model):
    id = models.AutoField(primary_key = True, unique = True)
    data_added = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=255, default="_Empty_")

    def __str__(self):
        return self.creator

class Post(models.Model):
    id = models.AutoField(primary_key = True, unique = True)
    data_added = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=25, default="_Empty_")
    description = models.CharField(max_length=255, default="_Empty_")
    file = models.FileField()

    def __str__(self):
        return self.title

class Group(models.Model):
    name = models.CharField(max_length=100, default=("_Empty_"))
    description = models.CharField(max_length=255, default="_Empty_")
    id = models.AutoField(primary_key = True, unique = True)    
    data_added = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="User")
    users = models.ManyToManyField(User)
    admins = models.ManyToManyField(User, related_name='admins')
    posts = models.ManyToManyField(Post, blank = True)
    
    def __str__(self):
        return self.name

class UserGroup(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    group = models.ManyToManyField(Group, blank=True)