import React, { useState, useEffect } from 'react';

interface Driver {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  vehicleType: string;
  rating: number;
  totalDeliveries: number;
}

const DeliveryModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loadingDrivers, setLoadingDrivers] = useState(false);

  // Fetch available drivers on component mount
  useEffect(() => {
    fetchAvailableDrivers();
  }, []);

  const fetchAvailableDrivers = async () => {
    setLoadingDrivers(true);
    try {
      console.log('Fetching available drivers...');
      const response = await fetch('http://localhost:5000/api/drivers/available');
      const data = await response.json();
      console.log('API Response:', data);
      if (data.success) {
        setDrivers(data.drivers);
        console.log('Drivers set:', data.drivers);
      } else {
        console.log('API did not return success');
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
    } finally {
      setLoadingDrivers(false);
    }
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const deliveryDate = formData.get('deliveryDate') as string;
    
    // Convert date to ISO8601 format
    const isoDate = new Date(deliveryDate).toISOString().split('T')[0];
    
    const data = {
      customer: {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone')
      },
      delivery: {
        pickupAddress: formData.get('pickupAddress'),
        dropoffAddress: formData.get('dropoffAddress'),
        packageType: formData.get('packageType'),
        packageWeight: parseFloat(formData.get('packageWeight') as string),
        packageDescription: formData.get('packageDescription'),
        deliveryDate: isoDate,
        deliveryTime: formData.get('deliveryTime')
      },
      additionalServices: {
        insurance: formData.has('insurance'),
        signature: formData.has('signature'),
        express: formData.has('express')
      },
      selectedDriverId: formData.get('selectedDriver') || null
    };

    try {
      console.log('Sending delivery booking request with data:', JSON.stringify(data, null, 2));
      
      const response = await fetch('http://localhost:5000/api/deliveries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`Delivery booked successfully!\n\nOrder ID: ${result.orderId}\n\nYou can track your order using this ID.`);
        closeModal();
        (e.target as HTMLFormElement).reset();
      } else {
        console.error('Error response from server:', result);
        if (result.errors && Array.isArray(result.errors)) {
          const errorMessages = result.errors.map((err: any) => `${err.param}: ${err.msg}`).join('\n');
          alert(`Booking failed:\n\n${errorMessages}`);
        } else {
          alert(result.error || 'Failed to book delivery');
        }
      }
    } catch (error) {
      console.error('Error booking delivery:', error);
      alert('Failed to book delivery. Please try again.');
    }
  };

  // This component renders the modal structure but visibility is controlled by CSS
  return (
    <div className="modal" id="deliveryModal">
      <div className="modal-content modal-large">
        <span className="close-modal" id="closeDeliveryModal" onClick={closeModal}>&times;</span>
        <div className="modal-header">
          <i className="fas fa-box-open"></i>
          <h2>Book a Delivery</h2>
          <p>Enter your details and delivery information</p>
        </div>
        <form className="delivery-form" id="deliveryBookingForm" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="section-title">Your Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerFirstName">First Name</label>
                <input type="text" id="customerFirstName" name="firstName" placeholder="First Name" required />
              </div>
              <div className="form-group">
                <label htmlFor="customerLastName">Last Name</label>
                <input type="text" id="customerLastName" name="lastName" placeholder="Last Name" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerEmail">Email Address</label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope"></i>
                  <input type="email" id="customerEmail" name="email" placeholder="Enter your email" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="customerPhone">Phone Number</label>
                <div className="input-wrapper">
                  <i className="fas fa-phone"></i>
                  <input type="tel" id="customerPhone" name="phone" placeholder="Enter your phone number" required />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Select Driver (Optional)</h3>
            <div className="form-group">
              <label htmlFor="selectedDriver">Choose a Driver</label>
              <select id="selectedDriver" name="selectedDriver">
                <option value="">Auto-assign Available Driver</option>
                {loadingDrivers ? (
                  <option value="">Loading drivers...</option>
                ) : drivers.length > 0 ? (
                  drivers.map(driver => (
                    <option key={driver._id} value={driver._id}>
                      {driver.firstName} {driver.lastName} ({driver.vehicleType}) - Rating: {driver.rating.toFixed(1)}⭐
                    </option>
                  ))
                ) : (
                  <option value="">No drivers available</option>
                )}
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Delivery Details</h3>
            <div className="form-group">
              <label htmlFor="pickupAddress">Pickup Address</label>
              <div className="input-wrapper">
                <i className="fas fa-map-marker-alt"></i>
                <input type="text" id="pickupAddress" name="pickupAddress" placeholder="Enter pickup location" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="dropoffAddress">Drop-off Address</label>
              <div className="input-wrapper">
                <i className="fas fa-map-marker-alt"></i>
                <input type="text" id="dropoffAddress" name="dropoffAddress" placeholder="Enter delivery location" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="packageType">Package Type</label>
                <select id="packageType" name="packageType" required>
                  <option value="">Select Package Type</option>
                  <option value="document">Document</option>
                  <option value="small">Small Package</option>
                  <option value="medium">Medium Package</option>
                  <option value="large">Large Package</option>
                  <option value="fragile">Fragile Item</option>
                  <option value="food">Food Delivery</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="packageWeight">Approximate Weight (kg)</label>
                <input type="number" id="packageWeight" name="packageWeight" placeholder="0.5" step="0.1" min="0.1" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="packageDescription">Package Description</label>
              <textarea id="packageDescription" name="packageDescription" placeholder="Describe your package (contents, special handling instructions, etc.)" rows={3} required></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="deliveryDate">Preferred Delivery Date</label>
                <input type="date" id="deliveryDate" name="deliveryDate" required />
              </div>
              <div className="form-group">
                <label htmlFor="deliveryTime">Preferred Time Slot</label>
                <select id="deliveryTime" name="deliveryTime" required>
                  <option value="">Select Time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                  <option value="anytime">Anytime</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Additional Services</h3>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" name="insurance" />
                Package Insurance (+$5.00)
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="signature" />
                Signature Required (+$2.00)
              </label>
              <label className="checkbox-label">
                <input type="checkbox" name="express" />
                Express Delivery (+$10.00)
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" name="termsAgreement" required />
              I agree to the <a href="#" target="_blank">Terms & Conditions</a> and <a href="#" target="_blank">Cancellation Policy</a>
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-full">Book Delivery</button>
          <div className="form-footer">
            <p>Need help? <a href="#contact">Contact our support team</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryModal;
