
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FaTrashAlt } from 'react-icons/fa';

const CartItem = ({ item }) => {
    const { handleRemoveItem, handleAddToCart } = useCart();
    
    const [qty, setQty] = useState(item.quantity); 

    const product = item.productId;

    const handleQtyChange = (e) => {
        const newQty = parseInt(e.target.value);
        if (newQty > 0) {
            setQty(newQty);
    
            handleAddToCart(product._id, newQty);
        } else if (newQty === 0) {
            handleRemoveItem(item._id);
        }
    };

    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border-l-4 border-vibe-secondary">
            <div className="flex items-center space-x-4">
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover rounded-md hidden sm:block"
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600">${product.price.toFixed(2)} / unit</p>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                {/* Quantity Input */}
                <input
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    onBlur={handleQtyChange} // Update cart on unfocus
                    className="w-16 text-center border rounded-lg p-2 focus:ring-vibe-primary focus:border-vibe-primary"
                />

                {/* Subtotal */}
                <span className="text-lg font-bold text-gray-700 w-24 text-right">
                    ${(product.price * item.quantity).toFixed(2)}
                </span>

                {/* Remove Button */}
                <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 hover:text-red-700 transition duration-150 p-2 rounded-full hover:bg-red-50"
                    aria-label="Remove item"
                >
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    );
};

export default CartItem;