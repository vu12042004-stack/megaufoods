let adminProducts = getProducts();

function saveProducts() {
  localStorage.setItem("megaufoods_products", JSON.stringify(adminProducts));
}

function renderAdminProducts() {
  const list = document.getElementById("adminProductList");

  if (adminProducts.length === 0) {
    list.innerHTML = "<p>Chưa có sản phẩm.</p>";
    return;
  }

  list.innerHTML = adminProducts.map(product => `
    <div class="admin-card">
      <img src="${product.image}">
      <div>
        <h3>${product.name}</h3>
        <p>${product.category} | ${product.origin}</p>
        <p>${product.unit}</p>
        <strong>${product.price.toLocaleString()}đ</strong>
      </div>
      <div>
        <button onclick="editProduct(${product.id})">Sửa</button>
        <button onclick="deleteProduct(${product.id})">Xóa</button>
      </div>
    </div>
  `).join("");
}

function saveProduct() {
  const id = document.getElementById("productId").value;
  const name = document.getElementById("adminName").value.trim();
  const category = document.getElementById("adminCategory").value.trim();
  const origin = document.getElementById("adminOrigin").value.trim();
  const unit = document.getElementById("adminUnit").value.trim();
  const price = Number(document.getElementById("adminPrice").value);
  const image = document.getElementById("adminImage").value.trim();
  const desc = document.getElementById("adminDesc").value.trim();

  if (!name || !category || !origin || !unit || !price || !image) {
    alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
    return;
  }

  if (id) {
    const product = adminProducts.find(p => p.id == id);
    product.name = name;
    product.category = category;
    product.origin = origin;
    product.unit = unit;
    product.price = price;
    product.image = image;
    product.desc = desc;
  } else {
    adminProducts.push({
      id: Date.now(),
      name,
      category,
      origin,
      unit,
      price,
      image,
      desc
    });
  }

  saveProducts();
  resetForm();
  renderAdminProducts();
  alert("Đã lưu sản phẩm!");
}

function editProduct(id) {
  const product = adminProducts.find(p => p.id === id);

  document.getElementById("productId").value = product.id;
  document.getElementById("adminName").value = product.name;
  document.getElementById("adminCategory").value = product.category;
  document.getElementById("adminOrigin").value = product.origin;
  document.getElementById("adminUnit").value = product.unit;
  document.getElementById("adminPrice").value = product.price;
  document.getElementById("adminImage").value = product.image;
  document.getElementById("adminDesc").value = product.desc;
}

function deleteProduct(id) {
  if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

  adminProducts = adminProducts.filter(p => p.id !== id);
  saveProducts();
  renderAdminProducts();
}

function resetForm() {
  document.getElementById("productId").value = "";
  document.getElementById("adminName").value = "";
  document.getElementById("adminCategory").value = "";
  document.getElementById("adminOrigin").value = "";
  document.getElementById("adminUnit").value = "";
  document.getElementById("adminPrice").value = "";
  document.getElementById("adminImage").value = "";
  document.getElementById("adminDesc").value = "";
}

function renderOrders() {
  const orderList = document.getElementById("orderList");
  const orders = JSON.parse(localStorage.getItem("megaufoods_orders")) || [];

  if (orders.length === 0) {
    orderList.innerHTML = "<p>Chưa có đơn hàng.</p>";
    return;
  }

  orderList.innerHTML = orders.reverse().map(order => `
    <div class="order-card">
      <h3>Đơn hàng #${order.id}</h3>
      <p><b>Khách hàng:</b> ${order.customer}</p>
      <p><b>SĐT:</b> ${order.phone}</p>
      <p><b>Địa chỉ:</b> ${order.address}</p>
      <p><b>Thanh toán:</b> ${order.payment}</p>
      <p><b>Thời gian:</b> ${order.createdAt}</p>
      <p><b>Tổng tiền:</b> ${order.total.toLocaleString()}đ</p>
      <p><b>Ghi chú:</b> ${order.note || "Không có"}</p>
      <ul>
        ${order.items.map(item => `
          <li>${item.name} x ${item.quantity} - ${(item.price * item.quantity).toLocaleString()}đ</li>
        `).join("")}
      </ul>
    </div>
  `).join("");
}

renderAdminProducts();
renderOrders();
