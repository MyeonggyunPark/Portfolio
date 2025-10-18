from django.urls import path
from order import views

urlpatterns = [
    # 주문 목록 및 테이블/웨이팅 번호 메인 페이지 (Main order list view with table/waiting info)
    path("", views.index, name="index"),
    
    # 주문 상세 정보 API (Order detail JSON API)
    path("api/order-detail/<str:order_type>/<int:number>/", views.order_detail_json, name="order_detail_json"),
    
    # 주문 수량 변경 API (Update item quantity in order)
    path("api/update-quantity/", views.update_quantity, name="update_quantity"),
    
    # 주문 항목 삭제 API (Delete item from order)
    path("api/delete-order-item/", views.delete_order_item, name="delete_order_item"),
    
    # 주문 항목 추가 API (Add item to order)
    path("api/add-order-item/", views.add_order_item, name="add_order_item"),
    
    # 메뉴 카테고리 목록 API (List of menu categories)
    path("api/menu-categories/", views.menu_categories, name="menu_categories"),
    
    # 카테고리별 메뉴 조회 API (List menus by category)
    path("api/menus-by-category/<int:category_id>/", views.menus_by_category, name="menus_by_category"),
]
