import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AddressForm = () => {
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      address,
      postal_code: postalCode,
      city,
      items: cart.map(item => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price
      }))
    };

    try {
      const response = await api.post('/api/orders/', orderData, {
        headers: {
          'x-include-token': true // Include token for this request
        }
      });
      console.log('Order created:', response.data);
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Adres</label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="postalCode" className="form-label">Kod pocztowy</label>
        <input
          type="text"
          className="form-control"
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          pattern="\d{2}-\d{3}"
          title="Format should be xx-xxx"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label">Miejscowość</label>
        <input
          type="text"
          className="form-control"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Złóż zamówienie</button>
    </form>
  );
};

export default AddressForm;
