import React, { useState } from 'react';

interface DeliveryData {
  orderId: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  delivery: {
    pickupAddress: string;
    dropoffAddress: string;
    packageType: string;
    packageWeight: number;
    packageDescription: string;
    deliveryDate: string;
    deliveryTime: string;
  };
  status: string;
  driver: {
    name: string;
    phone: string;
    vehicle: string;
  };
  timestamps: {
    booked: string;
    assigned?: string;
    pickedUp?: string;
    inTransit?: string;
    delivered?: string;
  };
  additionalServices: {
    insurance: boolean;
    signature: boolean;
    express: boolean;
  };
}

const TrackOrderModal: React.FC = () => {
  const [orderData, setOrderData] = useState<DeliveryData | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const closeModal = () => {
    const modal = document.getElementById('trackModal') as HTMLElement;
    if (modal) {
      modal.classList.remove('active');
    }
    setOrderData(null);
    setIsTracking(false);
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const orderId = formData.get('orderId') as string;

    if (!orderId) {
      alert('Please enter an order ID');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/deliveries/track/${orderId.toUpperCase()}`);
      const result = await response.json();

      if (response.ok) {
        setOrderData(result.delivery);
        setIsTracking(true);
      } else {
        alert('Order not found. Please check your order ID and try again.');
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      alert('Failed to track order. Please try again.');
    }
  };

  const getStatusSteps = () => {
    const steps = ['booked', 'assigned', 'pickedUp', 'inTransit', 'delivered'];
    const currentIndex = steps.indexOf(orderData?.status || 'booked');

    return steps.map((step, index) => ({
      step,
      isCompleted: index < currentIndex,
      isCurrent: index === currentIndex,
      timestamp: orderData?.timestamps[step as keyof typeof orderData.timestamps]
    }));
  };

  const getStatusDisplayName = (status: string) => {
    const statusMap: { [key: string]: string } = {
      booked: 'Order Booked',
      assigned: 'Driver Assigned',
      pickedUp: 'Package Picked Up',
      inTransit: 'In Transit',
      delivered: 'Delivered'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="modal" id="trackModal">
      <div className="modal-content">
        <span className="close-modal" id="closeTrackModal" onClick={closeModal}>&times;</span>
        <div className="modal-header">
          <i className="fas fa-search-location"></i>
          <h2>Track Your Order</h2>
          <p>Enter your order ID to track your delivery</p>
        </div>

        {!isTracking ? (
          <form className="track-form" id="trackOrderForm" onSubmit={handleTrackOrder}>
            <div className="form-group">
              <label htmlFor="orderId">Order ID</label>
              <div className="input-wrapper">
                <i className="fas fa-hashtag"></i>
                <input type="text" id="orderId" name="orderId" placeholder="Enter your order ID (e.g., SD20251222001)" required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-full">Track Order</button>
          </form>
        ) : (
          <div className="order-status" id="orderStatus">
            <div className="status-header">
              <h3>Order Status</h3>
              <span className="order-id-display" id="orderIdDisplay">{orderData?.orderId}</span>
            </div>

            <div className="status-timeline">
              {getStatusSteps().map(({ step, isCompleted, isCurrent, timestamp }) => (
                <div key={step} className={`status-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="status-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="status-content">
                    <h4>{getStatusDisplayName(step)}</h4>
                    <p>
                      {step === 'booked' && 'Your delivery has been booked successfully'}
                      {step === 'assigned' && 'A driver has been assigned to your delivery'}
                      {step === 'pickedUp' && 'Your package has been collected from pickup location'}
                      {step === 'inTransit' && 'Your package is on the way to the delivery location'}
                      {step === 'delivered' && 'Your package has been delivered successfully'}
                    </p>
                    {timestamp && <span className="status-time">{timestamp}</span>}
                  </div>
                </div>
              ))}
            </div>

            {(orderData?.status === 'assigned' || orderData?.status === 'pickedUp' || orderData?.status === 'inTransit' || orderData?.status === 'delivered') && (
              <div className="driver-info" id="driverInfo">
                <h4>Driver Information</h4>
                <div className="driver-details">
                  <div className="driver-item">
                    <i className="fas fa-user"></i>
                    <span id="driverName">{orderData.driver.name}</span>
                  </div>
                  <div className="driver-item">
                    <i className="fas fa-phone"></i>
                    <span id="driverPhone">{orderData.driver.phone}</span>
                  </div>
                  <div className="driver-item">
                    <i className="fas fa-truck"></i>
                    <span id="driverVehicle">{orderData.driver.vehicle}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="delivery-info">
              <h4>Delivery Details</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>From:</label>
                  <span id="pickupLocation">{orderData?.delivery.pickupAddress}</span>
                </div>
                <div className="info-item">
                  <label>To:</label>
                  <span id="dropoffLocation">{orderData?.delivery.dropoffAddress}</span>
                </div>
                <div className="info-item">
                  <label>Package:</label>
                  <span id="packageDetails">{orderData?.delivery.packageType} ({orderData?.delivery.packageWeight}kg)</span>
                </div>
                <div className="info-item">
                  <label>Estimated Delivery:</label>
                  <span id="estimatedDelivery">{orderData?.delivery.deliveryDate} - {orderData?.delivery.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="form-footer">
          <p>Can't find your order? <a href="#contact">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderModal;
