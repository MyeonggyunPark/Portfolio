from django import forms
from .models import SignUpUser
from django.contrib.auth.forms import UserCreationForm, UsernameField
from django.contrib.auth import get_user_model

user = get_user_model()

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = user
        fields = "__all__"
        