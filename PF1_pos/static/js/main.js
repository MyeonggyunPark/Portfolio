let currentOrderType = null;
let currentOrderNumber = null;
let currentOrderId = null;

// 주문 불러오기 / Load order and display modal
function loadOrder(orderType, orderNumber) {
  currentOrderType = orderType;
  currentOrderNumber = orderNumber;

  fetch(`/order/api/order-detail/${orderType}/${orderNumber}/`)
    .then((res) => res.json())
    .then((data) => {
      currentOrderId = data.order_id;

      let html = `
        <h2 class="text-2xl font-bold mb-10">
          ${data.order_type === "table" ? "🪑 Table" : "⏳ Waiting"} ${
        data.table_number
      }
        </h2>
        <ul class="space-y-2">
      `;

      // 메뉴 항목 렌더링 / Render each order item
      data.items.forEach((item) => {
        html += `
          <li class="flex justify-between items-center p-2 border rounded bg-gray-100">
            <div class="flex items-center gap-2">
              <span>${item.name} (${item.quantity})</span>
              <button onclick="updateQuantity(${item.menu_id}, -1)"
                      class="text-lg px-2 bg-gray-300 rounded hover:bg-gray-400">−</button>
              <button onclick="updateQuantity(${item.menu_id}, 1)"
                      class="text-lg px-2 bg-gray-300 rounded hover:bg-gray-400">+</button>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-semibold">${item.total_price.toFixed(
                2
              )} €</span>
              <button onclick="deleteOrderItem(${item.menu_id})"
                class="px-2 py-0.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 active:scale-95 transition duration-150"
                title="삭제 / Delete">X</button>
            </div>
          </li>
        `;
      });

      // 합계 및 기능 버튼 / Total price and action buttons
      html += `
        </ul>
        <div class="text-right font-bold text-lg mt-4">
          Total: ${data.total_price.toFixed(2)} €
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <button onclick="showCategorySelector()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            주문 추가
          </button>
          <button onclick="payOrder()" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            결제
          </button>
        </div>
        <div id="menu-selector" class="mt-6 space-y-2 hidden"></div>
      `;

      document.getElementById("modal-content").innerHTML = html;
      openModal();
    });
}

// 수량 변경 / Update item quantity
function updateQuantity(menuId, delta) {
  fetch("/order/api/update-quantity/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
    body: JSON.stringify({
      order_id: currentOrderId,
      menu_id: menuId,
      change: delta,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        loadOrder(currentOrderType, currentOrderNumber); // 다시 로드 / Reload
      } else {
        alert("❌ 수량 변경 실패 / Failed to update quantity");
      }
    });
}

// 메뉴 삭제 / Delete item from order
function deleteOrderItem(menuId) {
  fetch("/order/api/delete-order-item/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
    body: JSON.stringify({
      order_id: currentOrderId,
      menu_id: menuId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        loadOrder(currentOrderType, currentOrderNumber);
      } else {
        alert("❌ 삭제 실패 / Failed to delete item");
      }
    });
}

// 카테고리 선택 UI 출력 / Show category selection UI
function showCategorySelector() {
  fetch("/order/api/menu-categories/")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("menu-selector");
      container.innerHTML = `<h3 class="font-semibold">카테고리 선택 / Choose Category</h3>`;
      data.categories.forEach((cat) => {
        container.innerHTML += `
          <button onclick="showMenusByCategory(${cat.id})"
                  class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">${cat.name}</button>
        `;
      });
      container.classList.remove("hidden");
    });
}

// 카테고리 내 메뉴 출력 / Show menu items within selected category
function showMenusByCategory(categoryId) {
  fetch(`/order/api/menus-by-category/${categoryId}/`)
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("menu-selector");
      container.innerHTML = `<h3 class="font-semibold mb-2">메뉴 선택 / Choose Menu</h3>`;
      data.menus.forEach((menu) => {
        container.innerHTML += `
          <button onclick="addMenuToOrder(${menu.id})"
                  class="block w-full text-left px-4 py-2 border rounded mb-1 hover:bg-gray-100">
            ${menu.name} - ${menu.price.toFixed(2)} €
          </button>
        `;
      });
    });
}

// 주문에 메뉴 추가 / Add selected menu to order
function addMenuToOrder(menuId) {
  fetch("/order/api/add-order-item/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCSRFToken(),
    },
    body: JSON.stringify({
      order_id: currentOrderId,
      menu_id: menuId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        loadOrder(currentOrderType, currentOrderNumber);
      } else {
        alert("❌ 추가 실패 / Failed to add item");
      }
    });
}

// 결제 버튼 동작 / Payment button (not implemented yet)
function payOrder() {
  alert(
    "💳 결제 기능은 아직 구현되지 않았습니다. / Payment not implemented yet."
  );
}

// 모달 열기 / Open modal
function openModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// 모달 닫기 / Close modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("flex");
  modal.classList.add("hidden");
}

// 모달 외부 클릭 시 닫기 / Close modal when clicking outside
document.getElementById("modal").addEventListener("click", function (e) {
  if (e.target.id === "modal") {
    closeModal();
  }
});

// CSRF 토큰 추출 / Get CSRF token from cookie
function getCSRFToken() {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  return cookie ? cookie.split("=")[1] : "";
}
