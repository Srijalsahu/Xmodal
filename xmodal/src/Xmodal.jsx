import React, { Component } from 'react';
import "./XModal.module.css"
class XModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      username: '',
      email: '',
      dob: '',
      phone: ''
    };
  }

  openModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
      username: '',
      email: '',
      dob: '',
      phone: ''
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, dob, phone } = this.state;

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
    this.closeModal();
  };

  render() {
    const { isOpen, username, email, dob, phone } = this.state;

    return (
      <div>
        <button onClick={this.openModal}>Open Form</button>

        {isOpen && (
          <div className="modal" onClick={this.closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Modal Form</h2>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={this.handleChange} />
                <br />
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={email} onChange={this.handleChange} />
                <br />
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" value={dob} onChange={this.handleChange} />
                <br />
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" value={phone} onChange={this.handleChange} />
                <br />
                <button type="submit" className="submit-button">Submit</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default XModal;
