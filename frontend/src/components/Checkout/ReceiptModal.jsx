
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReceiptModal = ({ receipt, isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
        navigate('/'); 
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-green-600 mb-4 border-b-2 border-green-200 pb-2">
                    ✅ Order Confirmed!
                </h2>
                
                <p className="text-lg text-gray-700 mb-4">
                    Thank you, **{receipt.customer.name}**! Your mock order has been successfully placed.
                </p>

                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between font-medium">
                        <span>Receipt ID:</span>
                        <span className="text-gray-900">{receipt.receiptId.substring(0, 8)}...</span>
                    </div>
                    <div className="flex justify-between font-medium">
                        <span>Total Items:</span>
                        <span className="text-gray-900">{receipt.itemsCount}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                        <span>Date:</span>
                        <span className="text-gray-900">{new Date(receipt.timestamp).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="mt-6 flex justify-between items-center pt-4 border-t-2 border-green-300">
                    <span className="text-2xl font-bold text-vibe-primary">
                        Total Paid: ${receipt.total.toFixed(2)}
                    </span>
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-vibe-primary hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptModal;