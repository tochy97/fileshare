from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, GroupSerializer, CommentSerializer, PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Group, Comment, Post


@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = GroupSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = UserSerializer
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    permissions_classes = [ 
        permissions.AllowAny
    ]
    serializer_class = CommentSerializer

class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = PostSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)