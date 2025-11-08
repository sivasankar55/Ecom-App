
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const CartView = () => {
    const { cart, isLoading } = useCart();

    if (isLoading) {
        return <div className="text-center py-10 text-lg">Loading cart...</div>;
    }

    if (cart.items.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-3xl font-bold text-gray-700 mb-4">Your Cart is Empty</h1>
                <Link to="/" className="text-vibe-primary hover:underline">
                    Go shopping!
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 lg:flex lg:space-x-8">
            {/* Cart Items List */}
            <div className="lg:w-2/3">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">Your Shopping Cart ({cart.items.length} Items)</h1>
                <div className="space-y-4">
                    {cart.items.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-1/3 mt-8 lg:mt-0 sticky top-4">
                <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">Order Summary</h2>
                    
                    <div className="flex justify-between text-lg mb-2">
                        <span>Subtotal:</span>
                        <span className="font-semibold">${(cart.total).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-lg mb-4 text-gray-500 border-b pb-4">
                        <span>Shipping (Mock):</span>
                        <span>$0.00</span>
                    </div>

                    <div className="flex justify-between text-2xl font-extrabold text-vibe-primary mb-6">
                        <span>Order Total:</span>
                        <span>${cart.total.toFixed(2)}</span>
                    </div>

                    <Link 
                        to="/checkout"
                        className="w-full block text-center py-3 bg-vibe-primary hover:bg-indigo-700 text-white font-bold rounded-lg transition duration-200"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartView;