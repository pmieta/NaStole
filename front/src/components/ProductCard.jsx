import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {

    const { cart, addToCart } = useContext(CartContext);

    const formatPrice = (price) => {
        return `${price.toFixed(2)} zł`;
    };

    const handleAddToCart = () => {
        addToCart(product);
    };
    return (
        <div key={product.id} className="col-lg-3 col-md-4 mb-4">
            <div className="card h-100">
                <img className="card-img-top" src={product.image} alt='Image not found'/>
                <div className="card-body">
                    <h4 className="card-title">{product.title}</h4>
                    <p className="card-text">{formatPrice(product.price)}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    
                    <div className="d-flex">
                        <Link to={`/products/${product.id}`} className="btn btn-primary me-2">View Details</Link>
                        <button className="btn btn-secondary" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
