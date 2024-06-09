import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { UserContext } from '../context/UserContext';

const UserPage = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/orders/my_orders/', {
          headers: {
            'x-include-token': true // Include token for this request
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Could not fetch order data.');
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4 user-page">
      <h2>User Account</h2>
      {user ? (
        <div className="user-details mb-4">
          <h4>Profile</h4>
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
      <h4>Order History</h4>
      {orders.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.total_amount.toFixed(2)} zł</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default UserPage;
