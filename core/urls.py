from django.urls import path
from rest_framework import routers, urlpatterns
from .views import current_user, UserList, UserGroupDetail, GroupViewSet, CommentViewSet, PostView, UserGroupViewSet, UserViewSet, UserGroupList

router = routers.DefaultRouter()
router.register('groups', GroupViewSet,'groups')
router.register('comments', CommentViewSet,'comments')  
router.register('users', UserViewSet,'users')  
router.register('usergroup', UserGroupViewSet,'usergroup')  

urlpatterns = [
    path('current_user/', current_user),
    path('userlist/', UserList.as_view()),
    path('usergrouplist/', UserGroupList.as_view()),
    path('usergroup/<int:pk>', UserGroupDetail.as_view()),
    path('posts/', PostView.as_view(), name= 'posts_list'),
]

urlpatterns += router.urls