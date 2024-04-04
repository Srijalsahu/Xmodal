import React, { useState, useEffect, useRef } from 'react';

function XModal() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showModal]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !dob || !phone) {
      alert('Please fill out all fields.');
      return;
    }

    if (email.indexOf('@') === -1) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const today = new Date();
    if (new Date(dob) > today) {
      alert('Invalid date of birth. Please enter a past date.');
      return;
    }

    setShowModal(false);
    setUsername('');
    setEmail('');
    setDob('');
    setPhone('');
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Form</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br /><br />
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required /><br /><br />
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="[0-9]{10}" required /><br /><br />
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default XModal;
