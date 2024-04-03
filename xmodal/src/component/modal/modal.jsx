// Modal.jsx

import React, { useState } from 'react';
import styles from './modal.module.css';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setError('');
    setUsername('');
    setEmail('');
    setDob('');
    setPhone('');
  };

  const handleSubmit = () => {
    if (!username || !email || !dob || !phone) {
      alert('Please fill out all fields.');
      return;
    }

    if (!email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(dob);

    if (selectedDate > currentDate) {
      alert('Invalid date of birth. Please select a past date.');
      return;
    }

    // Handle form submission
    alert('Form submitted successfully!');
    handleCloseModal();
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Form</button>
      {isOpen && (
        <div className={styles.modal} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <form>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />

              <label htmlFor="phone">Phone:</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

              <button type="button" className="submit-button" onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
