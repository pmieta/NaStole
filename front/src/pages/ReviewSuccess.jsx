import React from 'react';
import { Link } from 'react-router-dom';

const ReviewSuccess = () => {
  return (
    <div className="container mt-5 text-center">
      <h2>Dziękujemy za opinie!</h2>
      <p>Twoje opinia została dodana pomyślnie! Możesz ją zobaczyć w zakładce <Link to='/user'> moje konto</Link> </p>
      <Link to="/products" className="btn btn-primary mt-3">
        Kontyuuj zakupy
      </Link>
    </div>
  );
};

export default ReviewSuccess;
