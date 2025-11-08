
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider, useCart } from './context/CartContext';

import ProductList from './components/Products/ProductList';
import CartView from './components/Cart/CartView';
import CheckoutForm from './components/Checkout/CheckoutForm';
import { FaShoppingCart } from 'react-icons/fa';

// Layout components
const Header = () => {
    const { cart } = useCart();
    const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="bg-white shadow-lg sticky top-0 z-10">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-extrabold text-vibe-primary hover:text-indigo-700 transition">
                    Vibe Commerce
                </Link>
                <nav>
                    <Link 
                        to="/cart" 
                        className="flex items-center space-x-2 text-gray-700 hover:text-vibe-primary transition"
                    >
                        <FaShoppingCart className="text-2xl" />
                        <span className="font-bold text-lg">Cart </span>
                        {itemCount > 0 && (
                            <span className="bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    );
};


function App() {
    return (
        <Router>
            {/* Toaster is placed outside the main app for global access */}
            <Toaster position="top-right" reverseOrder={false} /> 
            
            <CartProvider>
                <Header />
                <main className="min-h-screen bg-gray-50 pb-20">
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/cart" element={<CartView />} />
                        <Route path="/checkout" element={<CheckoutForm />} />
                        <Route path="*" element={<div className="text-center mt-10 text-xl">404 Not Found</div>} />
                    </Routes>
                </main>
                <footer className="bg-gray-800 text-white text-center p-4">
                    Vibe Commerce Mock Cart © 2024
                </footer>
            </CartProvider>
        </Router>
    );
}

export default App;