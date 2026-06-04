let cart = [];
let currentCategory = "all";
let currentSlide = 0;

function renderProducts(list = products) {
  const productList = document.getElementById("productList");

  if (list.length === 0) {
    productList.innerHTML = "<p>Không tìm thấy sản phẩm.</p>";
    return;
  }

  productList.innerHTML = list.map(product => `
    <div class="product">
      <img src="${product.image}" alt="${product.name}" onclick="openProductDetail(${product.id})">
      <h3>${product.name}</h3>
      <p class="category">${product.category}</p>
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

  let filtered = products.filter(product => {
    const matchCategory = currentCategory === "all" || product.category === currentCategory;
    const matchKeyword = product.name.toLowerCase().includes(keyword);
    return matchCategory && matchKeyword;
  });

  renderProducts(filtered);
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  cart.push(product);
  renderCart();
  alert("Đã thêm sản phẩm vào giỏ hàng!");
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const total = document.getElementById("total");

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Giỏ hàng đang trống.</p>";
    total.innerText = "Tổng tiền: 0đ";
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <span>${item.name}</span>
      <strong>${item.price.toLocaleString()}đ</strong>
      <button onclick="removeItem(${index})">Xóa</button>
    </div>
  `).join("");

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  total.innerText = `Tổng tiền: ${totalPrice.toLocaleString()}đ`;
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }

  const name = prompt("Nhập tên khách hàng:");
  const phone = prompt("Nhập số điện thoại:");
  const address = prompt("Nhập địa chỉ giao hàng:");

  if (!name || !phone || !address) {
    alert("Vui lòng nhập đầy đủ thông tin.");
    return;
  }

  alert(
    `Đặt hàng thành công!\n\n` +
    `Khách hàng: ${name}\n` +
    `SĐT: ${phone}\n` +
    `Địa chỉ: ${address}\n\n` +
    `MEGAUFOODS sẽ liên hệ xác nhận đơn hàng.`
  );

  cart = [];
  renderCart();
}

function openProductDetail(id) {
  const product = products.find(item => item.id === id);

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalName").innerText = product.name;
  document.getElementById("modalCategory").innerText = "Danh mục: " + product.category;
  document.getElementById("modalUnit").innerText = "Quy cách: " + product.unit;
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

function showSlides() {
  const slides = document.querySelectorAll(".slide");

  slides.forEach(slide => slide.classList.remove("active"));

  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  slides[currentSlide].classList.add("active");
}

setInterval(showSlides, 3000);

renderProducts();
renderCart();
