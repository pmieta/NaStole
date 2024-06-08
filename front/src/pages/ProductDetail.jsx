import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../api';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { productId } = useParams();
    const { cart, addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/api/products/${productId}/`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        addToCart(product);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mt-4 product-detail">
            {product && (
                <>
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src={product.image || '/default-product-image.jpg'}
                                alt={product.title}
                                className="img-fluid"
                            />
                        </div>
                        <div className="col-md-6">
                            <h1>{product.title}</h1>
                            <p><strong>Cena:</strong> {product.price.toFixed(2)} zł</p>
                            <p><strong>Kategoria:</strong> {product.category}</p>
                            <p><strong>Wydawca:</strong> {product.publisher}</p>
                            <p><strong>Data wydania:</strong> {new Date(product.release_date).toLocaleDateString()}</p>
                            <p><strong>Ilość graczy</strong> {product.min_players} - {product.max_players}</p>
                            <p><strong>Dostępne sztuki:</strong> {product.stock_quantity}</p>
                            <p><button className="btn btn-primary" onClick={handleAddToCart}>Dodaj do koszyka</button></p>

                        </div>
                    </div>
                    <div className="row">
                        <p><strong>Opis:</strong></p>
                        <p>{product.description}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetail;
