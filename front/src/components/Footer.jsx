import React, { useState } from 'react';
import api from '../api';
import '../styles/Footer.css';

const Footer = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        content: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/api/contact_forms/', formData)
            .then(response => {
                setSubmitted(true);
                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    content: '',
                });
            })
            .catch(error => {
                console.error('There was an error submitting the form!', error);
            });
    };

    return (
        <footer className="footer mt-auto py-3">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <h5>Adres sklepu</h5>
                        <address>
                            Plac Grunwaldzki 44<br />
                            Wrocław, 50-320<br />
                            Polska
                        </address>
                    </div>
                    <div className="col-md-3">
                        <h5>Dane kontaktowe</h5>
                        <p>
                            Email: <a >info@nastole.com</a><br />
                            Phone: 123 456 789
                        </p>
                        <h5>Informacje</h5>
                        <ul className="list-unstyled">
                            <li><a href="/about">O nas</a></li>
                            <li><a href="/terms">Regulamin</a></li>
                            <li><a href="/privacy">Polityka prywatności</a></li>
                            <li><a href="/help">Pomoc</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h5>Skontaktuj się z nami</h5>
                        {submitted && <div className="alert alert-success mt-3">Dziękujemy za kontakt!</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="first_name">Imię</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="Imię"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Nazwisko</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Nazwisko"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Twoja wiadomość</label>
                                <textarea
                                    className="form-control form-control-lg"
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder=""
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg">Wyślij</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
