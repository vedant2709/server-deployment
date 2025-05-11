// server.js
require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const authenticate = require("./middlewares/auth");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173", // or your frontend domain
  credentials: true
}));

app.use("/api/auth", authRoutes);

// Protected root route
app.get("/", authenticate, (req, res) => {
  res.status(200).json({
    message: "✅ Welcome to the protected route!",
    user: req.user,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
