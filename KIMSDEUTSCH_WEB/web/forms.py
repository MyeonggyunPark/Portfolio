from django import forms
from .models import CourseMaterial

class MaterialForm(forms.ModelForm):
    class Meta:
        model = CourseMaterial
        fields = "__all__"