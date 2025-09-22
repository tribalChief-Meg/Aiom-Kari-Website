//packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
//utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import sellerRegistrationRoutes from "./routes/sellerRegistrationRoutes.js";
import { checkSellerRegistration } from "./controllers/sellerRegistrationController.js";

import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

import translateRoute from "./routes/translateRoute.js";

// Add this before your routes
app.use(
    cors({
        origin: "http://localhost:5173", // Replace this with the URL of your frontend
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        credentials: false, // Allow cookies or credentials if needed
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/translate", translateRoute);


//check
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/seller-registrations", sellerRegistrationRoutes);
app.get("/api/seller-registrations", sellerRegistrationRoutes);
app.get("/api/check-seller-registration", checkSellerRegistration); 

app.use("/api/chats", chatRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientID: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


app.post("/api/transform-text", (req, res) => {
  console.log("Request body:", req.body); // Log the incoming body

  const { text } = req.body;

  if (!text) {
      console.log("No text provided in the request");
      return res.status(400).json({ error: "No text provided" });
  }

  const transformedText = text
      .split(/\s+/)
      .map((word) => word + "_")
      .join(" ");

  res.json({ transformedText });
});