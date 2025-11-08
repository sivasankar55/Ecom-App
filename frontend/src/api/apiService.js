import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});


export const getProducts = () => api.get('/products');
export const getCart = () => api.get('/cart');
export const addToCart = (productId,qty) => api.post('/cart',{productId,qty});
export const removeItemFromCart = (id) => api.delete(`/cart/${id}`);
export const mockCheckout = (fromData) => api.post('/checkout', fromData);

export default api;