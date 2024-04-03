import React, { useState } from 'react';
import styles from './modal.module.css'; // Import CSS for styling

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: ''
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormData({
      username: '',
      email: '',
      dob: '',
      phone: ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, dob, phone } = formData;

    // Data validation
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

    const today = new Date();
    const dobDate = new Date(dob);
    if (dobDate > today) {
      alert('Invalid date of birth. Please enter a valid date.');
      return;
    }

    // Reset form and close modal on successful submission
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal}>Open Form</button>

      {isOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Modal Form</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={formData.username} onChange={handleChange} />
              <br />
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" value={formData.email} onChange={handleChange} />
              <br />
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" value={formData.dob} onChange={handleChange} />
              <br />
              <label htmlFor="phone">Phone:</label>
              <input type="text" id="phone" value={formData.phone} onChange={handleChange} />
              <br />
              <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default XModal;
