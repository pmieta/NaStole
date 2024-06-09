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
          <h2>Zamówienie nr {order.id}</h2>
          <p><strong>Data:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
          <p><strong>Łączna kwota:</strong> {order.total_amount.toFixed(2)} zł</p>
          <p><strong>Adres:</strong> {order.address}</p>
          <p><strong>Kod pocztowy:</strong> {order.postal_code}</p>
          <p><strong>Miejscowość:</strong> {order.city}</p>
          <h4>Przedmioty</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Ilość</th>
                <th>Cena</th>
                <th>Łącznie</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {order.items.map(item => (
                <tr key={item.product}>
                  <td><Link to={`/product/${item.product}`}>{productNames[item.product] || 'Loading...'}</Link></td>
                  <td>{item.quantity}</td>
                  <td>{item.price.toFixed(2)} zł</td>
                  <td>{(item.quantity * item.price).toFixed(2)} zł</td>
                  <td><Link to={`/products/${item.product}/review`}>Dodaj opinie</Link></td>
                  
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
