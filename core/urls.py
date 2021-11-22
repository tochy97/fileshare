from django.urls import path
from rest_framework import routers, urlpatterns
from .views import current_user, UserList, GroupViewSet, UserViewSet, CommentViewSet, PostViewSet

router = routers.DefaultRouter()
router.register('groups', GroupViewSet,'groups')
router.register('users', UserViewSet,'users')
router.register('comments', CommentViewSet,'comments')
router.register('files', PostViewSet,'files')

urlpatterns = [
    path('current_user/', current_user),
    path('userlist/', UserList.as_view()),
]

urlpatterns += router.urls