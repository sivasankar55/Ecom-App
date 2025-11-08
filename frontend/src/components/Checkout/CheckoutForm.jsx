
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { mockCheckout } from '../../api/apiService';
import toast from 'react-hot-toast';
import ReceiptModal from './ReceiptModal';

const CheckoutForm = () => {
    const { cart, clearCart } = useCart();
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [isProcessing, setIsProcessing] = useState(false);
    const [receiptData, setReceiptData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (cart.items.length === 0 && !receiptData) {
        return (
            <div className="container mx-auto p-8 text-center bg-white rounded-lg shadow-lg mt-10">
                <h2 className="text-2xl font-bold text-red-500">Cart is Empty!</h2>
                <p className="text-gray-600 mt-2">Please add items to proceed to checkout.</p>
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        const tId = toast.loading('Processing mock payment...');

        try {
            const { data } = await mockCheckout(formData);
            
            // Success
            setReceiptData(data.receipt);
            clearCart(); 
            setIsModalOpen(true);
            toast.success('Payment successful! Cart cleared.', { id: tId });

        } catch (error) {
            // Error handling with toast
            toast.error(error.response?.data?.message || 'Checkout failed. Please try again.', { id: tId });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="container mx-auto p-4 flex justify-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg">
                <h1 className="text-3xl font-extrabold text-vibe-primary mb-6 border-b pb-3">Secure Checkout</h1>
                
                {/* Total Display */}
                <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                    <p className="text-xl font-semibold text-gray-700 flex justify-between">
                        <span>Final Total:</span>
                        <span className="text-vibe-primary font-bold">${cart.total.toFixed(2)}</span>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-vibe-primary focus:border-vibe-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-vibe-primary focus:border-vibe-primary"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={isProcessing || cart.items.length === 0}
                        className={`w-full py-3 mt-6 font-bold rounded-lg transition duration-200 ${
                            isProcessing || cart.items.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-vibe-primary hover:bg-indigo-700 text-white'
                        }`}
                    >
                        {isProcessing ? 'Processing...' : `Pay $${cart.total.toFixed(2)}`}
                    </button>
                </form>
            </div>

            {/* Receipt Modal */}
            {receiptData && (
                <ReceiptModal 
                    receipt={receiptData} 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default CheckoutForm;