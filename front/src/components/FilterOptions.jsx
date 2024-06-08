// FilterOptions.jsx
import React, { useState, useEffect } from 'react';
import '../styles/FilterOptions.css';

const FilterOptions = ({ categories, filters, onFilterChange, publishers }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        let updatedCategories = [...localFilters.categories];
        if (checked) {
            updatedCategories.push(value);
        } else {
            updatedCategories = updatedCategories.filter(category => category !== value);
        }
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            categories: updatedCategories,
        }));
    };

    const handlePublisherChange = (e) => {
        const { value, checked } = e.target;
        let updatedPublishers = [...localFilters.publishers];
        if (checked) {
            updatedPublishers.push(value);
        } else {
            updatedPublishers = updatedPublishers.filter(publisher => publisher !== value);
        }
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            publishers: updatedPublishers,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const newPriceRange = [...localFilters.priceRange];
        if (name === 'minPrice') {
            newPriceRange[0] = Number(value);
        } else {
            newPriceRange[1] = Number(value);
        }
        setLocalFilters(prevFilters => ({
            ...prevFilters,
            priceRange: newPriceRange,
        }));
    };

    const handleApplyFilters = () => {
        onFilterChange(localFilters);
    };

    return (
        <div className="filter-options">
            <h4>Filtry</h4>
            <div className="mb-3">
                <label className="form-label">Category</label>
                {categories.map(category => (
                    <div className="form-check" key={category.id}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={category.name}
                            id={`category-${category.id}`}
                            checked={localFilters.categories.includes(category.name)}
                            onChange={handleCategoryChange}
                        />
                        <label className="form-check-label" htmlFor={`category-${category.id}`}>
                            {category.name}
                        </label>
                    </div>
                ))}
            </div>
            <div className="mb-3">
                <label className="form-label">Publisher</label>
                {publishers.map(publisher => (
                    <div className="form-check" key={publisher.id}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value={publisher.name}
                            id={`publisher-${publisher.id}`}
                            checked={localFilters.publishers.includes(publisher.name)}
                            onChange={handlePublisherChange}
                        />
                        <label className="form-check-label" htmlFor={`publisher-${publisher.id}`}>
                            {publisher.name}
                        </label>
                    </div>
                ))}
            </div>
            <div className="mb-3">
                <label className="form-label">Min Price</label>
                <input
                    type="number"
                    className="form-control"
                    name="minPrice"
                    value={localFilters.priceRange[0]}
                    onChange={handlePriceChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Max Price</label>
                <input
                    type="number"
                    className="form-control"
                    name="maxPrice"
                    value={localFilters.priceRange[1]}
                    onChange={handlePriceChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Search</label>
                <input
                    type="text"
                    className="form-control"
                    name="search"
                    value={localFilters.search}
                    onChange={handleInputChange}
                />
            </div>
            <button className="btn btn-primary" onClick={handleApplyFilters}>
                Apply Filters
            </button>
        </div>
    );
};

export default FilterOptions;
