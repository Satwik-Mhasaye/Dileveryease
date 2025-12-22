import React from 'react';

const About: React.FC = () => {
  return (
    <section className="about" id="about">
      <div className="section-header">
        <h2>About Us</h2>
        <p>Your trusted delivery partner</p>
      </div>
      <div className="about-content">
        <div className="about-text">
          <p>SwiftDeliver is a leading logistics platform that connects businesses and individuals with professional drivers for transporting goods. Founded with the mission to make delivery services accessible, reliable, and efficient.</p>
          <p>Our network of verified drivers ensures your goods are handled with care and delivered on time, every time.</p>
          <div className="stats">
            <div className="stat-item">
              <h3>5000+</h3>
              <p>Deliveries</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Drivers</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Cities</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
