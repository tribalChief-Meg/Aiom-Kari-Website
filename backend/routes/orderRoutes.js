import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
  getSellerOrders, // Import the new controller
  // updateDeliveryStatus,
  // getDeliveryDetails,
} from "../controllers/orderController.js";

import { authenticate, authorizeAdmin, authorizeSeller } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(authenticate, createOrder)
  .get(authenticate, authorizeAdmin, getAllOrders);

router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
router.route("/seller").get(authenticate, authorizeSeller, getSellerOrders); // Add the new route
router.route("/:id").get(authenticate, findOrderById);
router.route("/:id/pay").put(authenticate, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authenticate, authorizeSeller, markOrderAsDelivered);

// router
//   .route("/:id/delivery")
//   .put(authenticate, authorizeSeller, updateDeliveryStatus);
// router.route("/:id/delivery-details").get(authenticate, getDeliveryDetails);

export default router;

