import React, { useState, useEffect } from 'react';

interface Order {
  _id: string;
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
  additionalServices: {
    insurance: boolean;
    signature: boolean;
    express: boolean;
  };
  timestamps: {
    booked: string;
  };
  createdAt: string;
}

const DriverDashboard: React.FC = () => {
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [acceptedOrders, setAcceptedOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'available' | 'accepted'>('available');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Fetch available orders
      const availableResponse = await fetch('http://localhost:5000/api/deliveries?status=assigned');
      const availableData = await availableResponse.json();

      // Fetch driver's accepted orders (in a real app, this would be filtered by driver ID)
      const acceptedResponse = await fetch('http://localhost:5000/api/deliveries?status=inTransit');
      const acceptedData = await acceptedResponse.json();

      if (availableResponse.ok) {
        setAvailableOrders(availableData.deliveries || []);
      }

      if (acceptedResponse.ok) {
        setAcceptedOrders(acceptedData.deliveries || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const acceptOrder = async (orderId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deliveries/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'pickedUp' }),
      });

      if (response.ok) {
        alert('Order accepted successfully!');
        fetchOrders(); // Refresh the orders
      } else {
        alert('Failed to accept order');
      }
    } catch (error) {
      console.error('Error accepting order:', error);
      alert('Failed to accept order');
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deliveries/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        alert(`Order status updated to ${status}!`);
        fetchOrders();
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="driver-dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="driver-dashboard">
      <div className="dashboard-header">
        <h1>Driver Dashboard</h1>
        <p>Manage your deliveries</p>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'available' ? 'active' : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Available Orders ({availableOrders.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'accepted' ? 'active' : ''}`}
          onClick={() => setActiveTab('accepted')}
        >
          My Deliveries ({acceptedOrders.length})
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'available' ? (
          <div className="orders-section">
            <h2>Available Orders</h2>
            {availableOrders.length === 0 ? (
              <p className="no-orders">No available orders at the moment.</p>
            ) : (
              <div className="orders-grid">
                {availableOrders.map((order) => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <h3>Order #{order.orderId}</h3>
                      <span className="order-status">{order.status}</span>
                    </div>

                    <div className="order-details">
                      <div className="detail-item">
                        <strong>Customer:</strong> {order.customer.firstName} {order.customer.lastName}
                      </div>
                      <div className="detail-item">
                        <strong>Phone:</strong> {order.customer.phone}
                      </div>
                      <div className="detail-item">
                        <strong>From:</strong> {order.delivery.pickupAddress}
                      </div>
                      <div className="detail-item">
                        <strong>To:</strong> {order.delivery.dropoffAddress}
                      </div>
                      <div className="detail-item">
                        <strong>Package:</strong> {order.delivery.packageType} ({order.delivery.packageWeight}kg)
                      </div>
                      <div className="detail-item">
                        <strong>Delivery:</strong> {order.delivery.deliveryDate} - {order.delivery.deliveryTime}
                      </div>
                      <div className="detail-item">
                        <strong>Booked:</strong> {order.timestamps.booked}
                      </div>
                    </div>

                    <div className="order-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => acceptOrder(order.orderId)}
                      >
                        Accept Order
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="orders-section">
            <h2>My Deliveries</h2>
            {acceptedOrders.length === 0 ? (
              <p className="no-orders">No active deliveries.</p>
            ) : (
              <div className="orders-grid">
                {acceptedOrders.map((order) => (
                  <div key={order._id} className="order-card active-order">
                    <div className="order-header">
                      <h3>Order #{order.orderId}</h3>
                      <span className={`order-status ${order.status}`}>{order.status}</span>
                    </div>

                    <div className="order-details">
                      <div className="detail-item">
                        <strong>Customer:</strong> {order.customer.firstName} {order.customer.lastName}
                      </div>
                      <div className="detail-item">
                        <strong>Phone:</strong> {order.customer.phone}
                      </div>
                      <div className="detail-item">
                        <strong>From:</strong> {order.delivery.pickupAddress}
                      </div>
                      <div className="detail-item">
                        <strong>To:</strong> {order.delivery.dropoffAddress}
                      </div>
                      <div className="detail-item">
                        <strong>Package:</strong> {order.delivery.packageType} ({order.delivery.packageWeight}kg)
                      </div>
                      <div className="detail-item">
                        <strong>Delivery:</strong> {order.delivery.deliveryDate} - {order.delivery.deliveryTime}
                      </div>
                    </div>

                    <div className="order-actions">
                      {order.status === 'pickedUp' && (
                        <button
                          className="btn btn-primary"
                          onClick={() => updateOrderStatus(order.orderId, 'inTransit')}
                        >
                          Start Delivery
                        </button>
                      )}
                      {order.status === 'inTransit' && (
                        <button
                          className="btn btn-success"
                          onClick={() => updateOrderStatus(order.orderId, 'delivered')}
                        >
                          Mark as Delivered
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <span className="delivered-badge">✓ Delivered</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
