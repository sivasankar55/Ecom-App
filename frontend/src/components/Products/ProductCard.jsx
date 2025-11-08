
import React from 'react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { handleAddToCart } = useCart();
    const isItemInCart = false; 

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-[1.02] transition duration-300">
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between h-52">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm mt-1 mb-2">{product.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-extrabold text-vibe-primary">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={() => handleAddToCart(product._id, 1)}
                        className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ${
                            isItemInCart ? 'bg-vibe-secondary' : 'bg-vibe-primary hover:bg-indigo-700'
                        }`}
                    >
                        {isItemInCart ? 'Update Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;