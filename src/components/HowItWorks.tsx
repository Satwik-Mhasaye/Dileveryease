import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-header">
        <h2>How It Works</h2>
        <p>Simple steps to get your goods delivered</p>
      </div>
      <div className="steps-container">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Book a Delivery</h3>
          <p>Enter pickup and drop-off locations with package details.</p>
        </div>
        <div className="step-arrow">
          <i className="fas fa-arrow-right"></i>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>Driver Assigned</h3>
          <p>A verified driver is assigned to your delivery request.</p>
        </div>
        <div className="step-arrow">
          <i className="fas fa-arrow-right"></i>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Track & Receive</h3>
          <p>Track in real-time and receive your goods safely.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
