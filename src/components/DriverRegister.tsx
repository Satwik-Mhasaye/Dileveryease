import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DriverRegister: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    vehicleType: 'bike',
    vehicleModel: '',
    licensePlate: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (formData.firstName.trim().length < 2) {
      setError('First name must be at least 2 characters');
      setIsLoading(false);
      return;
    }

    if (formData.lastName.trim().length < 2) {
      setError('Last name must be at least 2 characters');
      setIsLoading(false);
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setError('Phone number must be at least 10 digits');
      setIsLoading(false);
      return;
    }

    if (formData.licenseNumber.trim().length < 5) {
      setError('License number must be at least 5 characters');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;

      const response = await fetch('http://localhost:5000/api/auth/driver/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Registration successful! Please login to continue.');
        navigate('/'); // Redirect to home or login
      } else {
        if (result.errors && Array.isArray(result.errors)) {
          setError(result.errors.map((err: any) => err.msg || err.message || err).join(', '));
        } else {
          setError(result.error || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="driver-register-page">
      <div className="register-container">
        <div className="register-header">
          <i className="fas fa-user-plus"></i>
          <h2>Driver Registration</h2>
          <p>Join our delivery network</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <div className="input-wrapper">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <div className="input-wrapper">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-wrapper">
                <i className="fas fa-phone"></i>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="licenseNumber">License Number</label>
              <div className="input-wrapper">
                <i className="fas fa-id-card"></i>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="Enter your license number"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="vehicleType">Vehicle Type</label>
              <div className="input-wrapper">
                <i className="fas fa-car"></i>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  required
                >
                  <option value="bike">Bike</option>
                  <option value="car">Car</option>
                  <option value="van">Van</option>
                  <option value="truck">Truck</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="vehicleModel">Vehicle Model (Optional)</label>
              <div className="input-wrapper">
                <i className="fas fa-car"></i>
                <input
                  type="text"
                  id="vehicleModel"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  placeholder="Enter vehicle model"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="licensePlate">License Plate (Optional)</label>
              <div className="input-wrapper">
                <i className="fas fa-tags"></i>
                <input
                  type="text"
                  id="licensePlate"
                  name="licensePlate"
                  value={formData.licensePlate}
                  onChange={handleChange}
                  placeholder="Enter license plate"
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register as Driver'}
          </button>

          <div className="form-footer">
            <p>Already have an account? <a href="#" onClick={() => navigate('/')}>Login here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverRegister;
