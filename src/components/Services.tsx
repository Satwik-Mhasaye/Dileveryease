import React from 'react';

const Services: React.FC = () => {
  return (
    <section className="services" id="services">
      <div className="section-header">
        <h2>Our Services</h2>
        <p>We offer a wide range of delivery solutions tailored to your needs</p>
      </div>
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-box"></i>
          </div>
          <h3>Package Delivery</h3>
          <p>Quick and secure delivery of packages of all sizes across the city.</p>
        </div>
        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-truck-moving"></i>
          </div>
          <h3>Freight Transport</h3>
          <p>Heavy goods transportation with our fleet of professional trucks.</p>
        </div>
        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-clock"></i>
          </div>
          <h3>Express Delivery</h3>
          <p>Same-day delivery for urgent shipments with real-time tracking.</p>
        </div>
        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-warehouse"></i>
          </div>
          <h3>Warehouse Storage</h3>
          <p>Secure storage facilities for your goods before delivery.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
