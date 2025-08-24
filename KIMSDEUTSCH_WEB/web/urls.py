from django.urls import path
from . import views

urlpatterns = [
    path("", views.main, name="main"),
    path("course/", views.course_list, name="course_list"),
    path("create/", views.course_create, name="course_create"),
]
