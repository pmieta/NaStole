import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../api'
import LoadingIndicator from "./LoadingIndicator";


function Home({ route }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const useEffect = async () => {
        console.log("useEffect")
        setLoading(true)
        try {
            const res = await api.get(route)
            if (Array.isArray(res.data)) {
                setProducts(res.data);
            } else {
                console.error('Unexpected response data format:', res.data);
            }
            setLoading(false);
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    if (!Array.isArray(products)) {
        return <div>Error loading products.</div>;
    }

    return (
        
        <div className="container text-center">
            <h1>Welcome to the Board Game Store</h1>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <Link to={`/products/${product.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
            {loading && <LoadingIndicator />}
        </div>
    );
};

export default Home;
