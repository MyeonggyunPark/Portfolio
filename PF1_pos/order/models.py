from django.db import models
from decimal import Decimal

# 카테고리 모델
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

# 메뉴 이미지 업로드 경로 설정 함수
def menu_image_upload_path(instance, filename):
    category_name = instance.category.name.replace(" ", "_") 
    return f"menu_images/{category_name}/{filename}"

# 메뉴 모델
class Menu(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="menus")
    image = models.ImageField(upload_to=menu_image_upload_path, blank=True, null=True)
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

# 주문 모델
class Order(models.Model):
    ORDER_TYPE_CHOICES = [
        ("table", "Table"),
        ("waiting", "Waiting"),
    ]
    order_type = models.CharField(max_length=10, choices=ORDER_TYPE_CHOICES)
    number = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.order_type} No.{self.number}"

# 주문 상세 모델
class OrderDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_details")
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name="menus")
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # 💡 저장 시 자동으로 total_price 계산
    def save(self, *args, **kwargs):
        if self.menu and self.quantity:
            self.total_price = Decimal(self.menu.price) * self.quantity
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Total: {self.total_price}€"
