from django.contrib import admin
from core.models import Group, Comment, Post

# Register your models here.

admin.site.register(Group)
admin.site.register(Comment)
admin.site.register(Post)