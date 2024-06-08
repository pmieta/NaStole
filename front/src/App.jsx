import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import CartPage from './pages/CartPage';
import ItemsPage from './pages/ItemsPage';
import ProtectedRoute from './components/ProtectedRoute';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import api from './api';
import { ACCESS_TOKEN, REFRESH_TOKEN, IS_USER } from "./constants";
import { CartContext } from './context/CartContext';

function Logout() {
  localStorage.clear();
  return <Login />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    // Fetch categories from the API
    api.get('/api/categories/')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    // Fetch user data from the API or local storage
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
          const response = await api.get('/api/user/', {
            headers: { 'x-include-token': true }
          }
          );
          if (response.data.length > 0) {
            setUser(response.data[0]);
          } else {
            console.log('User data is empty');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <CustomNavbar categories={categories} onSearch={handleSearch} user={user} cartCount={cart.length} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/cart" element={<CartPage />} /> 
          <Route path="/items" element={<ItemsPage categories={categories} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
