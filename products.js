const defaultProducts = [
  {
    id: 1,
    name: "Thăn Nội Bò Canada",
    category: "Steak cao cấp",
    origin: "Canada",
    unit: "500g",
    price: 899000,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800",
    desc: "Phần thịt mềm cao cấp, phù hợp làm steak áp chảo."
  },
  {
    id: 2,
    name: "Ribeye Bò Canada",
    category: "Steak cao cấp",
    origin: "Canada",
    unit: "500g",
    price: 799000,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    desc: "Vân mỡ đẹp, vị béo thơm, phù hợp steak và BBQ."
  },
  {
    id: 3,
    name: "Tomahawk Steak Canada",
    category: "Steak cao cấp",
    origin: "Canada",
    unit: "1kg",
    price: 1299000,
    image: "https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?w=800",
    desc: "Miếng steak xương dài cao cấp cho tiệc BBQ."
  },
  {
    id: 4,
    name: "Ba Chỉ Bò Canada",
    category: "BBQ",
    origin: "Canada",
    unit: "500g",
    price: 289000,
    image: "https://images.unsplash.com/photo-1529692236671-f1de41e1caba?w=800",
    desc: "Thái lát mỏng, phù hợp nướng, lẩu, cuốn rau."
  },
  {
    id: 5,
    name: "Dẻ Sườn Bò Canada",
    category: "BBQ",
    origin: "Canada",
    unit: "500g",
    price: 349000,
    image: "https://images.unsplash.com/photo-1600891963935-c1b4b17e4a71?w=800",
    desc: "Thịt thơm, mềm, thích hợp nướng BBQ."
  },
  {
    id: 6,
    name: "Bắp Hoa Bò Canada",
    category: "Lẩu",
    origin: "Canada",
    unit: "500g",
    price: 369000,
    image: "https://images.unsplash.com/photo-1588347818036-558601350947?w=800",
    desc: "Phù hợp nhúng lẩu, hầm, nấu phở."
  },
  {
    id: 7,
    name: "Nạm Bò Canada",
    category: "Lẩu",
    origin: "Canada",
    unit: "500g",
    price: 279000,
    image: "https://images.unsplash.com/photo-1529694157871-4e3b5f29d8f5?w=800",
    desc: "Dùng cho lẩu, phở, bò kho."
  },
  {
    id: 8,
    name: "Cá Hồi Na Uy Phi Lê",
    category: "Cá hồi nhập khẩu",
    origin: "Na Uy",
    unit: "300g",
    price: 349000,
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800",
    desc: "Cá hồi phi lê tươi ngon, giàu dinh dưỡng."
  },
  {
    id: 9,
    name: "Sashimi Cá Hồi Na Uy",
    category: "Cá hồi nhập khẩu",
    origin: "Na Uy",
    unit: "300g",
    price: 399000,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    desc: "Phù hợp ăn sashimi, salad, poke bowl."
  },
  {
    id: 10,
    name: "Bụng Cá Hồi Na Uy",
    category: "Cá hồi nhập khẩu",
    origin: "Na Uy",
    unit: "500g",
    price: 199000,
    image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=800",
    desc: "Phần bụng béo, thích hợp nướng hoặc áp chảo."
  }
];

function getProducts() {
  const saved = localStorage.getItem("megaufoods_products");
  if (saved) return JSON.parse(saved);

  localStorage.setItem("megaufoods_products", JSON.stringify(defaultProducts));
  return defaultProducts;
}

let products = getProducts();
