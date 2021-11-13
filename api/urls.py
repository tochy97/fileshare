from rest_framework import routers, urlpatterns
from .views import UserViewSet, GroupViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet,'users')
router.register('groups', GroupViewSet,'groups')

urlpatterns = router.urls