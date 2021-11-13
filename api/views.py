from api.models import User, Group
from rest_framework import serializers, viewsets, permissions
from .serializers import UserSerializer, GroupSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = GroupSerializer