
import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1 
    },
    userId: { 
        type: String, 
        default: 'guest_user' 
    },
});

export default mongoose.model('CartItem', CartItemSchema);

