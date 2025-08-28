from django.shortcuts import render, redirect, get_object_or_404
from .models import Level, Theme, ExamType, CourseMaterial
from .forms import MaterialForm

# Create your views here.

# 메인 페이지
def main(request):
    return render(request, "web/main.html")

# 클래스 페이지
def course_list(request):
    level = request.GET.get("level")
    theme = request.GET.get("theme")
    exam = request.GET.get("exam")
    filter_type = request.GET.get("filter")
    
    courses = CourseMaterial.objects.all()
    
    if level:
        courses = courses.filter(levels__level_code=level)

    if theme:
        courses = courses.filter(themes__theme_code=theme)

    if exam:
        courses = courses.filter(exams__exam_code=exam)
    
    context = {
        "courses": courses,
        "levels": Level.objects.all(),
        "themes": Theme.objects.all(),
        "exams": ExamType.objects.all(),
        
        "selected_level": level,
        "selected_theme": theme,
        "selected_exam": exam,
        "selected_filter": filter_type,
        }
    
    return render(request, "web/course_list.html", context)

# 강의 업로드 페이지
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

# 강의 상세 페이지
def course_detail(request, pk):
    course = get_object_or_404(CourseMaterial, pk=pk)
    context = {"course": course}
    return render(request, "web/course_detail.html", context)

# 강의 수정 페이지
# 강의 삭제 페이지