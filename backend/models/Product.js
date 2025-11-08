
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { 
        type: String, 
        default: 'https://picsum.photos/id/145/300/200' 
    },
});

export default mongoose.model('Product', ProductSchema);