from django.urls import path
from . import views

urlpatterns = [
    path("", views.main, name="main"),
    path("course/", views.course_list, name="course_list"),
    path("course/create/", views.course_create, name="course_create"),
    path("course/<int:pk>/", views.course_detail, name="course_detail"),
    path("course/<int:pk>/update/", views.course_update, name="course_update"),
    path("course/<int:pk>/delete/", views.course_delete, name="course_delete"),
]
