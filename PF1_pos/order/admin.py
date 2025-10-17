from django.contrib import admin
from order.models import Category, Menu, Order, OrderDetail

# Register custom user Model

admin.site.register(Category)
admin.site.register(Order)

@admin.register(Menu)
class MenuAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category')
@admin.register(OrderDetail)
class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ('order', 'menu', 'quantity', 'total_price')