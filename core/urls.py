from django.urls import path
from rest_framework import routers, urlpatterns
from .views import current_user, UserList, GroupViewSet

router = routers.DefaultRouter()
router.register('groups', GroupViewSet,'groups')

urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view()),
]

urlpatterns += router.urls