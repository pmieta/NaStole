import React from 'react';
import CartDetails from '../components/CartDetails';
import AddressForm from '../components/AddressForm';

const CartPage = () => {
  return (
    <div className="container mt-4">
      <CartDetails />
      <AddressForm />
    </div>
  );
};

export default CartPage;
