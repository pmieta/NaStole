// HomePage.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/Home.css'
import '../styles/HomePage.css';
import Navbar from '../components/Navbar';
import LoadingIndicator from '../components/LoadingIndicator';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';

// const HomePage = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         api.get('/api/products/')
//             .then(response => {
//                 setProducts(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('There was an error fetching the products!', error);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!Array.isArray(products) || products.length === 0) {
//         return <div>No products available.</div>;
//     }

//     return (
//         <div className="home">
//             <Navbar/>
//             <h1>Welcome to the Board Game Store</h1>
//             <div className="product-list">
//                 {products.map(product => (
//                     <div key={product.id} className="product-item">
//                         <h2>{product.title}</h2>
//                         <p>{product.description}</p>
//                         <p>Price: ${product.price}</p>
//                         <Link to={`/products/${product.id}`}>View Details</Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HomePage;

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/api/products/')
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

            <Carousel />
            <div className="col-12">
            <div className="row justify-content-start">
                
                    {products.map(product => (
                        <ProductCard product={product}></ProductCard>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default HomePage;
