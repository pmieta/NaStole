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
                <Link to={`/products/${product.id}`}>
                    <img className="card-img-top" src={product.image} onError={
                        (e) => (e.target.src = "../../logo.jpg")} />
                </Link>
                <div className="card-body">
                    <h4 className="card-title">{product.title}</h4>
                    <p className="card-text">{product.min_players + '-' + product.max_players + ' graczy'}</p>
                    <p className="card-text">{formatPrice(product.price)}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">

                    <div className="d-flex">
                        <button className="btn btn-primary" onClick={handleAddToCart}>Dodaj do koszyka</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
