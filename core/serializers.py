from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
from .models import Group, Comment, Post, UserGroup
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')  
   
class GroupSerializer(serializers.ModelSerializer):
    creator = UserSerializer(many=False, read_only=True)
    users = UserSerializer(many=True, read_only=True)
    admins = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Group
        fields = '__all__'

class GroupPartialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id','name','description')

class UserGroupSerializer(serializers.ModelSerializer):
    group = serializers.PrimaryKeyRelatedField(many=True, queryset = Group.objects.all())
    class Meta:
        model = UserGroup
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    creator = UserSerializer(many=False, read_only=False)

    class Meta:
        model = Post
        fields = ('creator', 'title', 'description', 'file',)

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
