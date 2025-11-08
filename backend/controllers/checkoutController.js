
import CartItem from '../models/CartItem.js';
import { v4 as uuidv4 } from 'uuid'; 

const GUEST_USER_ID = 'guest_user';

export const mockCheckout = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required for checkout.' });
    }

    try {
        const cartItems = await CartItem.find({ userId: GUEST_USER_ID }).populate('productId');

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty.' });
        }

        const finalTotal = cartItems.reduce((acc, item) => acc + (item.productId.price * item.quantity), 0);

        await CartItem.deleteMany({ userId: GUEST_USER_ID });

        const receipt = {
            receiptId: uuidv4(),
            total: parseFloat(finalTotal.toFixed(2)),
            timestamp: new Date().toISOString(),
            customer: { name, email },
            itemsCount: cartItems.length,
        };

        res.json({ 
            message: 'Checkout successful! Your order has been placed.', 
            receipt 
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error during checkout.' });
    }
};
