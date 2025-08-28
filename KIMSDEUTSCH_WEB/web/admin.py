from django.contrib import admin
from .models import Level, Theme, ExamType, CourseMaterial

# Register your models here.

admin.site.register(Level)
admin.site.register(Theme)
admin.site.register(ExamType)
admin.site.register(CourseMaterial)
