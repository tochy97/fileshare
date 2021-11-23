from django.urls import path
from rest_framework import routers, urlpatterns
from .views import current_user, UserList, GroupViewSet, UserViewSet, CommentViewSet, PostView

router = routers.DefaultRouter()
router.register('groups', GroupViewSet,'groups')
router.register('users', UserViewSet,'users')
router.register('comments', CommentViewSet,'comments')  

urlpatterns = [
    path('current_user/', current_user),
    path('userlist/', UserList.as_view()),
    path('posts/', PostView.as_view(), name= 'posts_list'),
]

urlpatterns += router.urls