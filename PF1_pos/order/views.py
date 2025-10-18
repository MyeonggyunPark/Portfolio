import json
from django.shortcuts import render
from django.http import JsonResponse
from collections import defaultdict
from django.views.decorators.csrf import csrf_exempt
from order.models import Category, Order, Menu, OrderDetail


# 주문 목록 및 테이블/웨이팅 번호 로딩 뷰 (메인 화면)
# Load all orders with summary totals and table/waiting numbers
def index(request):
    orders = Order.objects.prefetch_related("order_details__menu")

    orders_with_total = []
    for order in orders:
        total = sum(detail.total_price for detail in order.order_details.all())
        orders_with_total.append(
            {
                "order": order,
                "details": order.order_details.all(),
                "total_price": total,
            }
        )

    # 'table' 타입 정보 / Table-type order numbers
    table_numbers = (
        Order.objects.filter(order_type="table")
        .values_list("number", flat=True)
        .distinct()
        .order_by("number")
    )
    table_info = {
        "type": "table",
        "numbers": table_numbers,
    }

    # 'waiting' 타입 정보 / Waiting-type order numbers
    waiting_numbers = (
        Order.objects.filter(order_type="waiting")
        .values_list("number", flat=True)
        .distinct()
        .order_by("number")
    )
    waiting_info = {
        "type": "waiting",
        "numbers": waiting_numbers,
    }

    context = {
        "orders": orders_with_total,
        "table_info": table_info,
        "waiting_info": waiting_info,
    }

    return render(request, "index.html", context)


# 주문 상세 API (프론트 모달용) / Return details of a specific order by type and number
def order_detail_json(request, order_type, number):
    order = (
        Order.objects.filter(order_type=order_type, number=number)
        .order_by("-created_at")
        .prefetch_related("order_details__menu")
        .first()
    )

    if not order:
        return JsonResponse({"error": "주문이 없습니다."}, status=404)

    order_data = {
        "order_id": order.id,
        "order_type": order.order_type,
        "table_number": order.number,
        "created_at": order.created_at.strftime("%Y-%m-%d %H:%M"),
        "items": [],
        "total_price": 0,
    }

    # 메뉴 ID 기준으로 그룹화 / Group by menu ID
    grouped = defaultdict(
        lambda: {"quantity": 0, "total_price": 0, "name": "", "price": 0, "menu_id": 0}
    )

    for item in order.order_details.all():
        menu_id = item.menu.id
        grouped[menu_id]["menu_id"] = menu_id
        grouped[menu_id]["name"] = item.menu.name
        grouped[menu_id]["price"] = float(item.menu.price)
        grouped[menu_id]["quantity"] += item.quantity
        grouped[menu_id]["total_price"] += float(item.total_price)

    for grouped_item in grouped.values():
        order_data["items"].append(grouped_item)
        order_data["total_price"] += grouped_item["total_price"]

    return JsonResponse(order_data)


# 주문에 메뉴 추가 API /Add menu item to an existing order
@csrf_exempt
def add_order_item(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            order_id = data.get("order_id")
            menu_id = data.get("menu_id")

            order = Order.objects.filter(id=order_id).first()
            menu = Menu.objects.filter(id=menu_id).first()

            if not order or not menu:
                return JsonResponse(
                    {"success": False, "error": "Order or Menu not found"}, status=404
                )

            # 기존 항목이면 수량 증가 / Increment if already exists
            detail, created = order.order_details.get_or_create(menu=menu)
            if not created:
                detail.quantity += 1
            detail.total_price = detail.quantity * menu.price
            detail.save()

            return JsonResponse({"success": True})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=400)
    return JsonResponse({"success": False, "error": "Invalid request"}, status=405)


# 주문에서 메뉴 삭제 API /Delete menu item from an existing order
@csrf_exempt
def delete_order_item(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            order_id = data.get("order_id")
            menu_id = data.get("menu_id")

            order = Order.objects.filter(id=order_id).first()
            if not order:
                return JsonResponse(
                    {"success": False, "error": "Order not found"}, status=404
                )

            item = order.order_details.filter(menu_id=menu_id).first()
            if not item:
                return JsonResponse(
                    {"success": False, "error": "Item not found"}, status=404
                )

            item.delete()
            return JsonResponse({"success": True})
        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=400)
    return JsonResponse({"success": False, "error": "Invalid request"}, status=405)


# 수량 변경 API / Update quantity of a menu item in the order
@csrf_exempt
def update_quantity(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            order_id = data.get("order_id")
            menu_id = data.get("menu_id")
            change = int(data.get("change", 0))

            order = Order.objects.filter(id=order_id).first()
            if not order:
                return JsonResponse(
                    {"success": False, "error": "Order not found"}, status=404
                )

            order_item = order.order_details.filter(menu_id=menu_id).first()
            if not order_item:
                return JsonResponse(
                    {"success": False, "error": "Item not found"}, status=404
                )

            new_quantity = order_item.quantity + change
            if new_quantity < 1:
                order_item.delete()
            else:
                order_item.quantity = new_quantity
                order_item.save()

            return JsonResponse({"success": True})

        except Exception as e:
            return JsonResponse({"success": False, "error": str(e)}, status=400)

    return JsonResponse({"success": False, "error": "Invalid request"}, status=405)


# 카테고리 목록 API / Return all menu categories
def menu_categories(request):
    categories = Category.objects.all()
    data = [{"id": c.id, "name": c.name} for c in categories]
    return JsonResponse({"categories": data})


# 특정 카테고리의 메뉴 목록 API / Return all menus under a given category
def menus_by_category(request, category_id):
    menus = Menu.objects.filter(category_id=category_id)
    data = [{"id": m.id, "name": m.name, "price": float(m.price)} for m in menus]
    return JsonResponse({"menus": data})
