// App.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import OrderSuccess from './pages/OrderSuccess';
import UserPage from './pages/UserPage';
import ProductDetail from './pages/ProductDetail';
import LoginPage from './pages/LoginPage';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import api from './api';
import { ACCESS_TOKEN } from './constants';
import { CartContext } from './context/CartContext';
import CartPage from './pages/CartPage';
import ItemsPage from './pages/ItemsPage';
import OrderDetail from './pages/OrderDetail';
import Form from './components/Form';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  const { cart } = useContext(CartContext);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/api/categories/')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

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
            setUser(null)
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterAndLogout />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:category?" element={<ItemsPage />} /> {/* Allow optional category */}
          <Route path="/products" element={<ItemsPage />} /> {/* Route without category */}
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
