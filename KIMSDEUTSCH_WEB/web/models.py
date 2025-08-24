from django.db import models

# Create your models here.

class CourseMaterial(models.Model):
    title = models.CharField("강의 제목", max_length=100)
    content = models.TextField("강의 설명")
    thumbnail_image = models.ImageField("썸네일", upload_to="thumbnail/%Y/%m/%d/")
    video_file = models.FileField("강의영상", upload_to="video/%Y/%m/%d/")
    pdf_file = models.FileField("강의자료", upload_to="file/%Y/%m/%d/")
    view_count = models.IntegerField("조회수", default=0)
    created_at = models.DateTimeField("생성일", auto_now_add=True)
    updated_at = models.DateTimeField("수정일", auto_now=True)

    
    def __str__(self):
        return self.title 