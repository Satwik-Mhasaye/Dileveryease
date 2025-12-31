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
          <p>Quick and secure delivery of packages of all sizes across the city. From small envelopes to large boxes, we handle it all with care and precision.</p>
          <ul className="service-features">
            <li>Same-day delivery available</li>
            <li>Insurance coverage up to $1000</li>
            <li>Real-time tracking</li>
            <li>Signature confirmation</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-truck-moving"></i>
          </div>
          <h3>Freight Transport</h3>
          <p>Heavy goods transportation with our fleet of professional trucks. Perfect for businesses needing to move large quantities of goods.</p>
          <ul className="service-features">
            <li>Dedicated truck options</li>
            <li>Temperature-controlled transport</li>
            <li>Overnight delivery</li>
            <li>Bulk discount rates</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-clock"></i>
          </div>
          <h3>Express Delivery</h3>
          <p>Same-day delivery for urgent shipments with real-time tracking. When time is critical, choose our express service.</p>
          <ul className="service-features">
            <li>2-hour delivery windows</li>
            <li>Priority customer support</li>
            <li>GPS tracking</li>
            <li>Flexible scheduling</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-warehouse"></i>
          </div>
          <h3>Warehouse Storage</h3>
          <p>Secure storage facilities for your goods before delivery. Keep your inventory safe and organized.</p>
          <ul className="service-features">
            <li>Climate-controlled storage</li>
            <li>24/7 security monitoring</li>
            <li>Inventory management</li>
            <li>Flexible storage terms</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-shipping-fast"></i>
          </div>
          <h3>International Shipping</h3>
          <p>Global delivery solutions for international shipments. We handle customs clearance and international logistics.</p>
          <ul className="service-features">
            <li>Customs clearance assistance</li>
            <li>International tracking</li>
            <li>Door-to-door service</li>
            <li>Multi-language support</li>
          </ul>
        </div>

        <div className="service-card">
          <div className="service-icon">
            <i className="fas fa-handshake"></i>
          </div>
          <h3>White Glove Service</h3>
          <p>Premium delivery service for high-value or fragile items. Our trained professionals handle your valuables with extra care.</p>
          <ul className="service-features">
            <li>Trained professional handlers</li>
            <li>Specialized packaging</li>
            <li>Installation services</li>
            <li>Premium insurance</li>
          </ul>
        </div>
      </div>

      {/* Additional Service Information */}
      <div className="service-details">
        <div className="detail-section">
          <h3>Why Choose SwiftDeliver?</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <i className="fas fa-shield-alt"></i>
              <h4>Secure & Reliable</h4>
              <p>All packages are fully insured and tracked in real-time</p>
            </div>
            <div className="benefit-item">
              <i className="fas fa-clock"></i>
              <h4>Fast Delivery</h4>
              <p>Multiple delivery options from same-day to scheduled</p>
            </div>
            <div className="benefit-item">
              <i className="fas fa-users"></i>
              <h4>Expert Drivers</h4>
              <p>Professional, background-checked drivers in our network</p>
            </div>
            <div className="benefit-item">
              <i className="fas fa-headset"></i>
              <h4>24/7 Support</h4>
              <p>Round-the-clock customer service for all your needs</p>
            </div>
          </div>
        </div>

        <div className="pricing-section">
          <h3>Service Pricing</h3>
          <p>Transparent pricing with no hidden fees. Contact us for a custom quote.</p>
          <div className="pricing-tiers">
            <div className="pricing-card">
              <h4>Standard</h4>
              <div className="price">$9.99</div>
              <p>Per delivery</p>
              <ul>
                <li>Up to 5 lbs</li>
                <li>2-3 day delivery</li>
                <li>Basic tracking</li>
                <li>Email support</li>
              </ul>
            </div>
            <div className="pricing-card featured">
              <h4>Express</h4>
              <div className="price">$19.99</div>
              <p>Per delivery</p>
              <ul>
                <li>Up to 20 lbs</li>
                <li>Same-day delivery</li>
                <li>GPS tracking</li>
                <li>Priority support</li>
              </ul>
            </div>
            <div className="pricing-card">
              <h4>Premium</h4>
              <div className="price">$39.99</div>
              <p>Per delivery</p>
              <ul>
                <li>Up to 50 lbs</li>
                <li>White glove service</li>
                <li>Real-time updates</li>
                <li>Dedicated support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
