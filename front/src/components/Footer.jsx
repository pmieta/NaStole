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
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <h5>Shop Address</h5>
                        <address>
                            123 Board Game St.<br />
                            Game City, GC 12345<br />
                            Country
                        </address>
                    </div>
                    <div className="col-md-3">
                        <h5>Contact Info</h5>
                        <p>
                            Email: <a href="mailto:info@boardgamestore.com">info@boardgamestore.com</a><br />
                            Phone: +123 456 7890
                        </p>
                        <h5>Information</h5>
                        <ul className="list-unstyled">
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/help">Help</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h5>Contact Us</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="First name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Last name"
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
                                    placeholder="Your email"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Message</label>
                                <textarea
                                    className="form-control form-control-lg"
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Your message"
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg">Send</button>
                        </form>
                        {submitted && <div className="alert alert-success mt-3">Thank you for your message!</div>}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
