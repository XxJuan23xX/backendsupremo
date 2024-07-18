const express = require('express');
const { authenticateJWT } = require('./authMiddleware');
const { createOrder, getOrderHistory, getOrdersForAdmin } = require('./orderController');

const router = express.Router();

router.post('/orders', authenticateJWT, createOrder);
router.get('/orders/history', authenticateJWT, getOrderHistory);
router.get('/admin/orders', authenticateJWT, getOrdersForAdmin);

module.exports = router;
