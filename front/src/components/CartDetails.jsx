import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/CartDetails.css';

const CartDetails = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const handleIncreaseQuantity = (item) => {
    addToCart(item);
  };

  const handleDecreaseQuantity = (item) => {
    const itemInCart = cart.find(cartItem => cartItem.id === item.id);
    if (itemInCart.quantity > 1) {
      removeFromCart(item.id);
      addToCart({ ...item, quantity: itemInCart.quantity - 1 });
    } else {
      removeFromCart(item.id);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-details">
      <h1>Koszyk</h1>
      {cart.length === 0 ? (
        <p>Koszyk jest pusty</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Produkt</th>
                <th scope="col">Cena</th>
                <th scope="col">Ilość</th>
                <th scope="col">Łącznie</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.price.toFixed(2)} zł</td>
                  <td>{item.quantity}</td>
                  <td>{(item.price * item.quantity).toFixed(2)} zł</td>
                  <td>
                    <button className="btn btn-secondary me-2" onClick={() => handleIncreaseQuantity(item)}>+</button>
                    <button className="btn btn-secondary me-2" onClick={() => handleDecreaseQuantity(item)}>-</button>
                    <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Usuń</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <h3>Do zapłaty: {calculateTotal()} zł</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDetails;
