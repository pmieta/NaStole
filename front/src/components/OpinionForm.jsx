import React, { useState } from 'react';
import api from '../api';
import "../styles/Form.css"

const OpinionForm = ({ productId }) => {
    const [formData, setFormData] = useState({
        rating: 0,
        comment: '',
        product: productId
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/reviews/', formData, {
                headers: {
                    'x-include-token': true
                }
            }
            );
            console.log('Review created:', response.data);
            setSuccess('Review submitted successfully!');
            navigate('/review-success');
            setError(null);
        } catch (error) {
            setError('Failed to submit review. Please try again.');
            setSuccess(null);
        }
    };

    return (
        <div className="form-container">
            <h2>Dodaj opinię</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Rating</label>
                    <select name="rating" value={formData.rating} onChange={handleChange} required>
                        <option value="">Select Rating</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Comment</label>
                    <textarea name="comment" value={formData.comment} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
        </div>
    );
};

export default OpinionForm;
