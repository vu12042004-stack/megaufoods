let cart = JSON.parse(localStorage.getItem("megaufoods_cart")) || [];
let currentCategory = "all";

function saveCart() {
  localStorage.setItem("megaufoods_cart", JSON.stringify(cart));
}

function renderProducts(list = products) {
  const productList = document.getElementById("productList");

  if (list.length === 0) {
    productList.innerHTML = "<p>Không tìm thấy sản phẩm.</p>";
    return;
  }

  productList.innerHTML = list.map(product => `
    <div class="product">
      <img src="${product.image}" onclick="openProductDetail(${product.id})">
      <h3>${product.name}</h3>
      <p class="category">${product.category} | ${product.origin}</p>
      <p class="unit">Quy cách: ${product.unit}</p>
      <p class="price">${product.price.toLocaleString()}đ</p>
      <button onclick="addToCart(${product.id})">Thêm vào giỏ</button>
    </div>
  `).join("");
}

function filterCategory(category) {
  currentCategory = category;
  applyFilters();
}

function searchProducts() {
  applyFilters();
}

function applyFilters() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();

  const filtered = products.filter(product => {
    const matchCategory = currentCategory === "all" || product.category === currentCategory;
    const matchKeyword = product.name.toLowerCase().includes(keyword);
    return matchCategory && matchKeyword;
  });

  renderProducts(filtered);
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  const item = cart.find(i => i.id === id);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  alert("Đã thêm sản phẩm vào giỏ hàng!");
}

function increaseQty(id) {
  const item = cart.find(i => i.id === id);
  item.quantity += 1;
  saveCart();
  renderCart();
}

function decreaseQty(id) {
  const item = cart.find(i => i.id === id);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const total = document.getElementById("total");

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Giỏ hàng đang trống.</p>";
    total.innerText = "Tổng tiền: 0đ";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <p>${item.price.toLocaleString()}đ x ${item.quantity}</p>
      </div>

      <div class="qty">
        <button onclick="decreaseQty(${item.id})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increaseQty(${item.id})">+</button>
      </div>

      <strong>${(item.price * item.quantity).toLocaleString()}đ</strong>
      <button onclick="removeItem(${item.id})">Xóa</button>
    </div>
  `).join("");

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  total.innerText = `Tổng tiền: ${totalPrice.toLocaleString()}đ`;
}

function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const note = document.getElementById("customerNote").value.trim();
  const payment = document.querySelector("input[name='payment']:checked").value;

  if (!name || !phone || !address) {
    alert("Vui lòng nhập đầy đủ họ tên, số điện thoại và địa chỉ.");
    return;
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = {
    id: Date.now(),
    customer: name,
    phone,
    address,
    note,
    payment,
    total: totalPrice,
    items: cart,
    status: "Đơn mới",
    createdAt: new Date().toLocaleString("vi-VN")
  };

  const orders = JSON.parse(localStorage.getItem("megaufoods_orders")) || [];
  orders.push(order);
  localStorage.setItem("megaufoods_orders", JSON.stringify(orders));

  alert(
    `Đặt hàng thành công!\n\n` +
    `Khách hàng: ${name}\n` +
    `SĐT: ${phone}\n` +
    `Thanh toán: ${payment}\n` +
    `Tổng tiền: ${totalPrice.toLocaleString()}đ\n\n` +
    `MEGAUFOODS sẽ liên hệ xác nhận đơn hàng.`
  );

  cart = [];
  saveCart();
  renderCart();

  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerAddress").value = "";
  document.getElementById("customerNote").value = "";
}

function openProductDetail(id) {
  const product = products.find(item => item.id === id);

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalName").innerText = product.name;
  document.getElementById("modalCategory").innerText = "Danh mục: " + product.category;
  document.getElementById("modalOrigin").innerText = "Xuất xứ: " + product.origin;
  document.getElementById("modalUnit").innerText = "Quy cách: " + product.unit;
  document.getElementById("modalDesc").innerText = product.desc;
  document.getElementById("modalPrice").innerText = product.price.toLocaleString() + "đ";

  document.getElementById("modalAddBtn").onclick = function () {
    addToCart(product.id);
    closeModal();
  };

  document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

renderProducts();
renderCart();
