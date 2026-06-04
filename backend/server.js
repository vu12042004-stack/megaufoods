const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  origin: String,
  unit: String,
  price: Number,
  image: String,
  desc: String
});

const orderSchema = new mongoose.Schema({
  customer: String,
  phone: String,
  address: String,
  note: String,
  payment: String,
  total: Number,
  status: { type: String, default: "Đơn mới" },
  items: Array,
  createdAt: { type: Date, default: Date.now }
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);
const Admin = mongoose.model("Admin", adminSchema);

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Không có token" });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Token không hợp lệ" });
  }
}

app.get("/", (req, res) => {
  res.send("MEGAUFOODS API is running");
});

app.post("/api/admin/setup", async (req, res) => {
  const existed = await Admin.findOne({ username: process.env.ADMIN_USER });

  if (existed) {
    return res.json({ message: "Admin đã tồn tại" });
  }

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, 10);

  await Admin.create({
    username: process.env.ADMIN_USER,
    password: hashedPassword
  });

  res.json({ message: "Tạo admin thành công" });
});

app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (!admin) {
    return res.status(400).json({ message: "Sai tài khoản" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Sai mật khẩu" });
  }

  const token = jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

app.get("/api/products", async (req, res) => {
  const products = await Product.find().sort({ _id: -1 });
  res.json(products);
});

app.post("/api/products", auth, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

app.put("/api/products/:id", auth, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(product);
});

app.delete("/api/products/:id", auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Đã xóa sản phẩm" });
});

app.post("/api/orders", async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

app.get("/api/orders", auth, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

app.put("/api/orders/:id/status", auth, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(order);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
