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
    console.log(user)
    const fetchOrders = async () => {
      try {
        const response = await api.get('/api/orders/my_orders/', {
          headers: {
            'x-include-token': true 
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
      <h2>Moje konto</h2>
      {user ? (
        <div className="user-details mb-4">
          <h4>Dane użytkownika</h4>
          <p><strong>Imię i nazwisko:</strong> {user[0].first_name} {user[0].last_name}</p>
          <p><strong>Email:</strong> {user[0].email}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>Brak danych.</p>
      )}
      <h4>Historia zamówień</h4>
      {orders.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID zamówienia</th>
              <th>Data</th>
              <th>Kwota</th>
              <th>Szczegóły</th>
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
                    Zobacz szczegóły
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
