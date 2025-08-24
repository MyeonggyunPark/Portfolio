from django.shortcuts import render, redirect, get_object_or_404
from .models import CourseMaterial
from .forms import MaterialForm

# Create your views here.
def main(request):
    return render(request, "web/main.html")

def course_list(request):
    q = request.GET.get("q", "")
    if q:
        course_all = CourseMaterial.objects.filter(title__icontains=q) | CourseMaterial.objects.filter(
            content__icontains=q)
        context = {"course_all": course_all, "q": q}
        return render(request, "web/course_list.html", context)
    course_all = CourseMaterial.objects.all()
    context = {"course_all": course_all}
    return render(request, "web/course_list.html", context)

def course_create(request):
    if request.method == "GET":
        form = MaterialForm()
        context = {"form": form}
        return render(request, "web/course_create.html", context)
    else:
        form = MaterialForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("course_list")
        else:
            form = MaterialForm()
            context = {"form": form}
            return render(request, "web/course_create.html", context)
