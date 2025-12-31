import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DriverModalProps {
  login: (user: any, token: string) => void;
}

const DriverModal: React.FC<DriverModalProps> = ({ login }) => {
  const navigate = useNavigate();
  const closeModal = () => {
    const modal = document.getElementById('driverModal') as HTMLElement;
    if (modal) {
      modal.classList.remove('active');
    }
  };

  const switchToRegister = () => {
    closeModal();
    navigate('/driver-register');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Debug: Log what we're sending
    console.log('Sending login data:', {
      email: formData.get('email'),
      password: formData.get('password') ? '[HIDDEN]' : null
    });

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      alert('Please fill in both email and password');
      return;
    }

    try {
      const requestData = { email, password };
      console.log('Request payload:', requestData);

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();
      console.log('Response:', result);

      if (response.ok && result.success) {
        // Store authentication data
        login(result.user, result.token);
        closeModal();
        // Navigate to driver dashboard
        navigate('/driver-dashboard');
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="modal" id="driverModal">
      <div className="modal-content">
        <span className="close-modal" id="closeModal" onClick={closeModal}>&times;</span>
        <div className="modal-header">
          <i className="fas fa-user-shield"></i>
          <h2>Driver Login</h2>
          <p>Access your driver dashboard</p>
        </div>
        <form className="login-form" id="driverLoginForm" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="driverEmail">Email Address</label>
            <div className="input-wrapper">
              <i className="fas fa-envelope"></i>
              <input type="email" id="driverEmail" name="email" placeholder="Enter your email" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="driverPassword">Password</label>
            <div className="input-wrapper">
              <i className="fas fa-lock"></i>
              <input type="password" id="driverPassword" name="password" placeholder="Enter your password" required />
            </div>
          </div>
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary btn-full">Login</button>
          <div className="form-footer">
            <p>New driver? <a href="#" onClick={switchToRegister}>Register here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverModal;
