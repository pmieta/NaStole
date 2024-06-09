// OrderSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="container mt-5 text-center">
      <h2>Dziękujemy za złożenie zamówienia!</h2>
      <p>Twoje zamówienie zostało złożone. Możesz zobaczyć je w zakładce <Link to='/user'> moje konto</Link> </p>
      <Link to="/products" className="btn btn-primary mt-3">
        Kontynuuj zakupy
      </Link>
    </div>
  );
};

export default OrderSuccess;
