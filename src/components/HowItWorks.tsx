import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="section-header">
        <h2>How It Works</h2>
        <p>Simple steps to get your goods delivered with our seamless platform</p>
      </div>

      <div className="steps-container">
        <div className="step">
          <div className="step-number">1</div>
          <h3>Book a Delivery</h3>
          <p>Enter pickup and drop-off locations with detailed package information. Choose your preferred delivery time and service level.</p>
          <div className="step-details">
            <ul>
              <li>Real-time pricing calculator</li>
              <li>Multiple pickup options</li>
              <li>Flexible scheduling</li>
            </ul>
          </div>
        </div>
        <div className="step-arrow">
          <i className="fas fa-arrow-right"></i>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <h3>Driver Assigned</h3>
          <p>A verified, background-checked driver is automatically assigned to your delivery. Receive instant notifications with driver details.</p>
          <div className="step-details">
            <ul>
              <li>Professional driver profiles</li>
              <li>Vehicle type confirmation</li>
              <li>Contact information provided</li>
            </ul>
          </div>
        </div>
        <div className="step-arrow">
          <i className="fas fa-arrow-right"></i>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <h3>Track & Receive</h3>
          <p>Monitor your delivery in real-time through our app or website. Receive your goods safely with signature confirmation.</p>
          <div className="step-details">
            <ul>
              <li>GPS tracking updates</li>
              <li>Photo delivery proof</li>
              <li>Signature capture</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Process Information */}
      <div className="process-details">
        <div className="process-section">
          <h3>Our Delivery Promise</h3>
          <div className="promise-grid">
            <div className="promise-item">
              <i className="fas fa-clock"></i>
              <h4>On-Time Guarantee</h4>
              <p>95% of deliveries arrive within the promised time window</p>
            </div>
            <div className="promise-item">
              <i className="fas fa-shield-alt"></i>
              <h4>Package Protection</h4>
              <p>All packages are fully insured up to $1,000 value</p>
            </div>
            <div className="promise-item">
              <i className="fas fa-user-check"></i>
              <h4>Verified Drivers</h4>
              <p>Every driver undergoes background checks and vehicle inspection</p>
            </div>
            <div className="promise-item">
              <i className="fas fa-headset"></i>
              <h4>24/7 Support</h4>
              <p>Customer service available around the clock for any issues</p>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How far in advance should I book a delivery?</h4>
              <p>We recommend booking at least 2 hours in advance for standard delivery, or up to 24 hours for scheduled pickups.</p>
            </div>
            <div className="faq-item">
              <h4>What if my package doesn't arrive on time?</h4>
              <p>Our on-time guarantee covers 95% of deliveries. If your delivery is late, you'll receive a full refund or redelivery at no cost.</p>
            </div>
            <div className="faq-item">
              <h4>Can I change the delivery address after booking?</h4>
              <p>Yes, you can modify the delivery address up to 30 minutes before pickup time through our app or by calling customer service.</p>
            </div>
            <div className="faq-item">
              <h4>What types of items can I ship?</h4>
              <p>We accept most items except hazardous materials, perishables, and items prohibited by law. Contact us for special requirements.</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h3>Ready to Get Started?</h3>
          <p>Join thousands of satisfied customers who trust SwiftDeliver for their delivery needs.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Book Your Delivery</button>
            <button className="btn btn-secondary">Download Our App</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
