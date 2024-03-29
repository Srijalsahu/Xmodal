import React, { useState } from 'react';
import styles from './modal.module.css';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, dob, phone } = formData;

    if (!username || !email || !dob || !phone) {
      setError('Please fill out all fields.');
    } else if (!email.includes('@')) {
      setError('Invalid email. Please check your email address.');
    } else if (phone.length !== 10 || isNaN(phone)) {
      setError('Invalid phone number. Please enter a 10-digit phone number.');
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(dob);
      if (selectedDate > currentDate) {
        setError('Invalid Date of Birth. Please select a past date.');
      } else {
        setError('');
        setIsOpen(false);
        setFormData({
          username: '',
          email: '',
          dob: '',
          phone: ''
        });
        alert('Form submitted successfully!');
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setError('');
  };

  return (
    <div className={styles.modal}>
      <button className={styles.openButton} onClick={() => setIsOpen(true)}>
        Open Form
      </button>
      {isOpen && (
        <div className={styles.modalContent} onClick={handleClose}>
          <form className={styles.form} onClick={(e) => e.stopPropagation()}>
            <h2>Modal Form</h2>
            {error && <div className={styles.error}>{error}</div>}
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="email" // Changed type to email for proper email validation
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="date"
              id="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleInputChange}
            />
            <input
              type="tel" // Changed type to tel for proper phone number validation
              id="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <button className={styles.submitButton} onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Modal;
