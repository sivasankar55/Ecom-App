
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { getCart, addToCart, removeItemFromCart } from '../api/apiService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], total: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const fetchCart = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await getCart();
            setCart(data);
        } catch (error) {
            toast.error('Failed to load cart data.', { id: 'load-cart' });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleAddToCart = async (productId, qty = 1) => {
        const tId = toast.loading('Updating cart...');
        try {
            // Note: This API updates or adds.
            await addToCart(productId, qty); 
            await fetchCart(); // Refresh the cart
            toast.success('Cart updated successfully!', { id: tId });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating cart.', { id: tId });
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        const tId = toast.loading('Removing item...');
        try {
            await removeItemFromCart(cartItemId);
            await fetchCart(); // Refresh the cart
            toast.success('Item removed from cart.', { id: tId });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error removing item.', { id: tId });
        }
    };

    const clearCart = () => {
        setCart({ items: [], total: 0 });
    };

    return (
        <CartContext.Provider 
            value={{ 
                cart, 
                isLoading, 
                fetchCart, 
                handleAddToCart, 
                handleRemoveItem, 
                clearCart 
            }}
        >
            {children}
        </CartContext.Provider>
    );
};