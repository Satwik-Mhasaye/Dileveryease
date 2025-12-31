import React from 'react';

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="section-header">
        <h2>About Us</h2>
        <p>Your trusted delivery partner since 2020</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <p>SwiftDeliver is a leading logistics platform that connects businesses and individuals with professional drivers for transporting goods. Founded in 2020 with the mission to revolutionize the delivery industry, we have grown to become one of the most trusted names in logistics.</p>

          <p>Our platform leverages cutting-edge technology to provide seamless, reliable, and efficient delivery solutions. We understand that in today's fast-paced world, timely delivery is not just a service—it's a necessity.</p>

          <div className="mission-vision">
            <div className="mission-item">
              <h3>Our Mission</h3>
              <p>To make delivery services accessible, reliable, and efficient for everyone, everywhere. We strive to connect people and businesses through seamless logistics solutions that exceed expectations.</p>
            </div>

            <div className="mission-item">
              <h3>Our Vision</h3>
              <p>To be the world's most customer-centric delivery platform, setting the standard for innovation, reliability, and customer satisfaction in the logistics industry.</p>
            </div>
          </div>

          <div className="stats">
            <div className="stat-item">
              <h3>10,000+</h3>
              <p>Successful Deliveries</p>
            </div>
            <div className="stat-item">
              <h3>750+</h3>
              <p>Verified Drivers</p>
            </div>
            <div className="stat-item">
              <h3>85+</h3>
              <p>Cities Covered</p>
            </div>
            <div className="stat-item">
              <h3>4.9/5</h3>
              <p>Customer Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional About Information */}
      <div className="about-details">
        <div className="team-section">
          <h3>Meet Our Leadership Team</h3>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo">
                <i className="fas fa-user-tie"></i>
              </div>
              <h4>Sarah Johnson</h4>
              <p>CEO & Founder</p>
              <p>Former logistics executive with 15+ years of experience in supply chain management.</p>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <i className="fas fa-user"></i>
              </div>
              <h4>Mike Chen</h4>
              <p>CTO</p>
              <p>Technology innovator specializing in logistics software and real-time tracking systems.</p>
            </div>

            <div className="team-member">
              <div className="member-photo">
                <i className="fas fa-user"></i>
              </div>
              <h4>Emily Rodriguez</h4>
              <p>Head of Operations</p>
              <p>Expert in fleet management and driver relations with a focus on safety and efficiency.</p>
            </div>
          </div>
        </div>

        <div className="values-section">
          <h3>Our Core Values</h3>
          <div className="values-grid">
            <div className="value-item">
              <i className="fas fa-shield-alt"></i>
              <h4>Reliability</h4>
              <p>We deliver on our promises, every time. Trust is the foundation of our service.</p>
            </div>

            <div className="value-item">
              <i className="fas fa-lightbulb"></i>
              <h4>Innovation</h4>
              <p>We continuously evolve our platform to meet the changing needs of our customers.</p>
            </div>

            <div className="value-item">
              <i className="fas fa-users"></i>
              <h4>Community</h4>
              <p>We build strong relationships with drivers, customers, and partners.</p>
            </div>

            <div className="value-item">
              <i className="fas fa-leaf"></i>
              <h4>Sustainability</h4>
              <p>We're committed to reducing our environmental impact through efficient routing and eco-friendly practices.</p>
            </div>
          </div>
        </div>

        <div className="certifications-section">
          <h3>Certifications & Partnerships</h3>
          <p>SwiftDeliver is proud to maintain the highest standards in the industry:</p>
          <div className="certifications-grid">
            <div className="certification-item">
              <i className="fas fa-award"></i>
              <h4>ISO 9001 Certified</h4>
              <p>Quality Management Systems</p>
            </div>

            <div className="certification-item">
              <i className="fas fa-shield-check"></i>
              <h4>Verified Safe Delivery</h4>
              <p>Insurance & Safety Standards</p>
            </div>

            <div className="certification-item">
              <i className="fas fa-handshake"></i>
              <h4>Industry Partnerships</h4>
              <p>Collaborating with leading logistics companies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
