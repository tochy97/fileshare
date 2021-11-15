from django.urls import path
from rest_framework import routers, urlpatterns
from .views import current_user, UserList, GroupViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('groups', GroupViewSet,'groups')
router.register('users', UserViewSet,'users')

urlpatterns = [
    path('current_user/', current_user),
    path('list_users/', UserList.as_view()),
]

urlpatterns += router.urls