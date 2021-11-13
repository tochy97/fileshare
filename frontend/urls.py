
from django.urls import re_path
import frontend.views as views

# All urls will point to same HTML template because it is SPA application
urlpatterns = [
    re_path('', views.index, name='index'),
]
