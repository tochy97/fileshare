from django.urls import path
from rest_framework import routers, urlpatterns
from .views import current_user, UserList, GroupViewSet, UserViewSet, CommentViewSet, FileViewSet

router = routers.DefaultRouter()
router.register('groups', GroupViewSet,'groups')
router.register('users', UserViewSet,'users')
router.register('comments', CommentViewSet,'comments')
router.register('files', FileViewSet,'files')

urlpatterns = [
    path('current_user/', current_user),
    path('list_users/', UserList.as_view()),
]

urlpatterns += router.urls