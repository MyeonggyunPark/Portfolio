from django.contrib import admin
from order.models import Category, Menu, Order, OrderDetail

# 카테고리 모델 등록 / Register the Category model
admin.site.register(Category)

# 메뉴 모델 관리자 설정 / Admin config for Menu model
@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    # 리스트 페이지에 표시할 필드
    # Fields to display in the list view
    list_display = ("name", "price", "category")

# 주문 모델 관리자 설정 / Admin config for Order model
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    # 리스트 페이지에 표시할 필드 지정 / # Fields to display in the list view
    list_display = ("order_type", "number", "created_at")

    # 필터링 옵션 지정 (주문 유형 기준) / # Filter by order_type
    list_filter = ("order_type",)

# 주문 상세 모델 관리자 설정 / Admin config for OrderDetail model
@admin.register(OrderDetail)
class OrderDetailAdmin(admin.ModelAdmin):
    # 리스트 페이지에 표시할 필드 / # Fields to display in the list view
    list_display = ("order", "menu", "quantity", "total_price")
