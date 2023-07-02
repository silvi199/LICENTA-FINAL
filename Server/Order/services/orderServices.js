const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const OrderController = require("../controllers/ordersController");

router.post("/addOrder", [checkAuth.verifyToken], OrderController.addOrder);

router.get("/findCompltedOrders", OrderController.findCompltedOrders);

router.patch(
    "/update/:orderId",
    [checkAuth.verifyToken],
    OrderController.updateOrder
  );

module.exports = router;
