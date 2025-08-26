from django.db import models

# Create your models here.

# 강의 레벨 모델
class Level(models.Model):
    
    LEVEL_CHOICES = [
        ("A1", "A1"),
        ("A2", "A2"),
        ("B1", "B1"),
        ("B2", "B2"),
        ("C1", "C1")
    ]
    
    level_code = models.CharField(max_length=10, choices=LEVEL_CHOICES, unique=True, verbose_name="레벨 코드")
    level_label = models.CharField(max_length=50, verbose_name="레벨 이름")
    
    def __str__(self):
        return self.level_label
    
# 강의 유형 모델
class Theme(models.Model):
    
    THEME_CHOICES = [
        ("GRAMMAR", "Grammatik(문법)"),
        ("READING", "Lesen(읽기)"),
        ("LISTENING", "Hören(듣기)"),
        ("SPEAKING", "Sprechen(말하기)"),
        ("WRITING", "Schreiben(쓰기)"),
        ("VOCABULARY", "Wortschatz(어휘)"),
        ("STRATEGY", "Prüfungsstrategie(시험전략)"),
        ("MOCK", "Probeprüfung(모의고사)"),
        ("ONE_DAY", "Ein-Tages-Kurs(원데이코스)")
    ]
    
    theme_code = models.CharField(max_length=30, choices=THEME_CHOICES, unique=True, verbose_name="강의유형 코드")
    theme_label = models.CharField(max_length=50, verbose_name="강의유형 이름")
    
    def __str__(self):
        return self.theme_label
    
# 시험 유형 모델
class ExamType(models.Model):
    
    EXAM_CHOICES = [
        ("TELC_A1", "Telc A1"),
        ("TELC_A2", "Telc A2"),
        ("TELC_B1", "Telc B1"),
        ("TELC_B2", "Telc B2"),
        ("TELC_C1", "Telc C1 Hochschule"),
        ("TESTDAF_PAPER", "TestDaF(종이 시험)"),
        ("TESTDAF_DIGITAL", "TestDaF(디지털 시험)"),
        ("GOETHE", "Goethe-Zertifikat")
    ]
    exam_code = models.CharField(max_length=30, choices=EXAM_CHOICES, unique=True, verbose_name="시험유형 코드")
    exam_label = models.CharField(max_length=50, verbose_name="시험유형 이름")

    def __str__(self):
        return self.exam_label

# 강의 업로드 모델
class CourseMaterial(models.Model):
    
    title = models.CharField(max_length=100, verbose_name="강의 제목")
    content = models.TextField(verbose_name="강의 설명")
    thumbnail_image = models.ImageField(upload_to="thumbnail/%Y/%m/%d/", blank=True, null=True, verbose_name="썸네임")
    video_file = models.FileField(upload_to="video/%Y/%m/%d/", blank=True, null=True, verbose_name="강의 영상")
    pdf_file = models.FileField(upload_to="file/%Y/%m/%d/", blank=True, null=True, verbose_name="강의자료")
    view_count = models.IntegerField(default=0, verbose_name="조회수")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="게시일")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="수정일")
    
    levels = models.ManyToManyField(Level, verbose_name="레벨")
    themes = models.ManyToManyField(Theme, verbose_name="유형")
    exams = models.ManyToManyField(ExamType, verbose_name="시험")
    
    def __str__(self):
        return self.title 