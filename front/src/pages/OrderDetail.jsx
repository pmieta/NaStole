import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [productNames, setProductNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/api/orders/${orderId}/`, {
          headers: {
            'x-include-token': true // Include token for this request
          }
        });
        setOrder(response.data);
        // Fetch product names
        await fetchProductNames(response.data.items);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Could not fetch order details.');
      }
      setLoading(false);
    };

    const fetchProductNames = async (items) => {
      try {
        const productNamesMap = {};
        for (const item of items) {
          const productResponse = await api.get(`/api/products/${item.product}/`);
          productNamesMap[item.product] = productResponse.data.title;
        }
        setProductNames(productNamesMap);
      } catch (error) {
        console.error('Error fetching product names:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4 order-detail-page">
      {order ? (
        <div>
          <h2>Order #{order.id}</h2>
          <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> {order.total_amount.toFixed(2)} zł</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Postal Code:</strong> {order.postal_code}</p>
          <p><strong>City:</strong> {order.city}</p>
          <h4>Items</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(item => (
                <tr key={item.product}>
                  <td><Link to={`/product/${item.product}`}>{productNames[item.product] || 'Loading...'}</Link></td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toFixed(2)} zł</td>
                  <td>{(item.quantity * item.price).toFixed(2)} zł</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Order not found.</p>
      )}
    </div>
  );
};

export default OrderDetail;
