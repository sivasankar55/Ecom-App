
import express from 'express';

import { getProducts } from '../controllers/productController.js'; 
import { getCart, addToCart, removeItem } from '../controllers/cartController.js';
import { mockCheckout } from '../controllers/checkoutController.js';

const router = express.Router();

// --- Product Routes ---
router.get('/products', getProducts);

// --- Cart Routes ---
router.get('/cart', getCart);
router.post('/cart', addToCart); 
router.delete('/cart/:id', removeItem); 

// --- Checkout Route ---
router.post('/checkout', mockCheckout);

export default router;