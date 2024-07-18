const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('./productController');

const router = express.Router();

router.get('/products', getAllProducts);
router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
