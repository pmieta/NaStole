import React, { useContext } from 'react';
import CartDetails from '../components/CartDetails';
import AddressForm from '../components/AddressForm';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cart } = useContext(CartContext);

  return (
    <div className="container mt-4">
      <CartDetails />
      {cart.length > 0 && 
        <AddressForm />
      }
    </div>
  );
};

export default CartPage;
