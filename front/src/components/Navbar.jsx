import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import '../styles/Navbar.css';

const CustomNavbar = ({ categories }) => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { user, handleLogout } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleButtonClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/user');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="../logo.jpg" alt="Logo" width="50" height="40" className="d-inline-block align-text-top"></img>
          Na Stole
        </Link>
        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/products">Wszystkie przedmioty</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Kategorie
              </a>
              <ul className="dropdown-menu">
                {categories.map(category => (
                  <li key={category.id}>
                    <Link className="dropdown-item" to={`/products/${category.name}`}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <button className="btn btn-outline-primary ms-2" onClick={handleButtonClick}>
            {user ? 'Konto' : 'Login'}
          </button>
          {user && (
            <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
              Logout
            </button>
          )}
          <button className="btn btn-outline-secondary ms-2 position-relative" onClick={handleCartClick}>
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
                <span className="visually-hidden">items in cart</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
