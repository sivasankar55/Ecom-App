import mongoose from 'mongoose';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

const GUEST_USER_ID = 'guest_user';

const calculateCartTotal = (items) => {
    return items.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);
};

export const getCart = async (req, res) => {
    try {
        const cartItems = await CartItem.find({ userId: GUEST_USER_ID }).populate('productId');
        const total = calculateCartTotal(cartItems);

        res.json({ 
            items: cartItems, 
            total: parseFloat(total.toFixed(2)) 
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error getting cart.' });
    }
};

export const addToCart = async (req, res) => {
    const { productId, qty } = req.body;
    const quantity = parseInt(qty);

    if (!productId || quantity <= 0) {
        return res.status(400).json({ message: 'Invalid product ID or quantity.' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        let cartItem = await CartItem.findOne({ productId, userId: GUEST_USER_ID });

        if (cartItem) {
            cartItem.quantity = quantity; 
            await cartItem.save();
        } else {
            cartItem = new CartItem({ productId, quantity, userId: GUEST_USER_ID });
            await cartItem.save();
        }

        const updatedCart = await CartItem.findOne(cartItem._id).populate('productId');

        res.json(updatedCart);
    } catch (err) {
        res.status(500).json({ message: 'Server error adding item to cart.' });
    }
};

export const removeItem = async (req, res) => {
    try {
        const result = await CartItem.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: 'Cart item not found.' });
        }

        res.status(204).send(); 
    } catch (err) {
        res.status(500).json({ message: 'Server error removing item from cart.' });
    }
};