import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/CartPage.css';

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  // Function to increase item quantity
  const handleIncreaseQuantity = (item) => {
    addToCart(item);
  };

  // Function to decrease item quantity
  const handleDecreaseQuantity = (item) => {
    // Remove item if quantity is 1, otherwise decrease quantity
    const itemInCart = cart.find(cartItem => cartItem.id === item.id);
    if (itemInCart.quantity > 1) {
      removeFromCart(item.id);
      addToCart({ ...item, quantity: itemInCart.quantity - 1 });
    } else {
      removeFromCart(item.id);
    }
  };

  // Function to calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mt-4">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Actions</th>
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
                    <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <h3>Total: {calculateTotal()} zł</h3>
            <button className="btn btn-primary" onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
