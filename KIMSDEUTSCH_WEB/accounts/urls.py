from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.UserSignUpView.as_view(), name="user_signup"),
]