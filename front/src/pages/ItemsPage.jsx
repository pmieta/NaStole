// ItemsPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/ItemsPage.css';
import FilterOptions from '../components/FilterOptions';
import ProductCard from '../components/ProductCard';

const ItemsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 9999],
    search: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products/');
        setProducts(response.data);
        setFilteredItems(response.data); // Initialize filteredItems
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      if (filters.categories.length > 0) {
        console.log(products)
        filtered = filtered.filter(product => filters.categories.includes(product.category.name));
      }

      filtered = filtered.filter(product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);

      if (filters.search) {
        filtered = filtered.filter(product => product.title.toLowerCase().includes(filters.search.toLowerCase()));
      }

      setFilteredItems(filtered);
    };

    applyFilters();
  }, [filters, products]);

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 filter-column">
          <FilterOptions categories={categories} filters={filters} onFilterChange={handleFilterChange} />
        </div>
        <div className="col-md-9">
          {filteredItems.length > 0 ? (
            <div className="row">
              {filteredItems.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-items-found">
              <p>No items found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
