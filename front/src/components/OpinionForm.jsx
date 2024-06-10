import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import "../styles/Form.css"
import {  toast } from 'react-toastify';

const OpinionForm = ({ productId }) => {
    const navigate = useNavigate();
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
            toast.success("Pomyślnie dodano opinię")
            setSuccess('Review submitted successfully!');
            navigate('/review-success');
            setError(null);
        } catch (error) {
            console.log(error)
            setError('Failed to submit review. Please try again.');
            toast.error("Błąd podczas dodawania opini")
            setSuccess(null);
        }
    };

    return (
        <div className="container">
            <h2>Dodaj opinię</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    
                    <select className="form-select" name="rating" value={formData.rating} onChange={handleChange} required>
                        <option selected>Ocena</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="3">4</option>
                        <option value="3">5</option>
                    </select>
                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Dodaj opinie</label>
                        <textarea class="form-control" name="comment" value={formData.comment} onChange={handleChange} required rows="5"></textarea>
                    </div>
                </div>
    
                <button type="submit" className="btn btn-primary">Dodaj opinię</button>
            </form>
        </div>
    );
};

export default OpinionForm;
