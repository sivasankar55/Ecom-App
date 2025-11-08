
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api/apiService';
import ProductCard from './ProductCard';
import toast from 'react-hot-toast';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await getProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch products. Is the backend running?', { id: 'prod-fetch' });
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-lg">Loading products...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-4 border-vibe-primary pb-2">
                Products Catalog
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;