import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import '../styles/AddressForm.css';
import api from '../api';
import InputMask from 'react-input-mask';

const AddressForm = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [isOrderCreating, setIsOrderCreating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setIsOrderCreating(true);
    try {
      const orderData = {
        items: cart,
        total: cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
        address
      };
      const response = await api.post('/api/orders/', orderData);
      console.log('Order created successfully:', response.data);
      clearCart();
      alert('Order created successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsOrderCreating(false);
    }
  };

  return (
    <div className="address-form">
      <h2>Adres dostawy</h2>
      <form onSubmit={handleCreateOrder}>
        <div className="mb-3">
          <label className="form-label">Imie</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={address.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nazwisko</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={address.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Adres</label>
          <input
            type="text"
            className="form-control"
            name="street"
            value={address.street}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Miejscowość</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={address.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kod pocztowy</label>
          <InputMask
            mask="99-999"
            maskChar=" "
            type="text"
            className="form-control"
            name="postalCode"
            value={address.postalCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={isOrderCreating}>
          {isOrderCreating ? 'Tworzenie zamówienia...' : 'Złóż zamówienie'}
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
