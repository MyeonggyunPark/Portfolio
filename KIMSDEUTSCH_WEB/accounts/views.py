from django.shortcuts import render, redirect, reverse
from .forms import CustomUserCreationForm
from django.views import generic

# Create your views here.

class UserSignUpView(generic.CreateView):
    template_name = "accounts/user_signup.html"
    form_class = CustomUserCreationForm
    def get_success_url(self):
        return reverse("home")
