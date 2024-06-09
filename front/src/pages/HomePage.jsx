import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Home.css'
import '../styles/HomePage.css';
import Navbar from '../components/Navbar';
import LoadingIndicator from '../components/LoadingIndicator';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/api/products/newest/?amount=4')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div><LoadingIndicator /></div>;
    }

    return (
        <div className="container">
            <div className="col-12">
            <h2>Nowości</h2>
            <div className="row justify-content-start">            
                    {products.map(product => (
                        <ProductCard product={product} key={product.id}></ProductCard>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default HomePage;
