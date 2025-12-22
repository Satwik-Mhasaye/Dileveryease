import React from 'react';

const Footer: React.FC = () => {
  const openDriverModal = () => {
    const modal = document.getElementById('driverModal') as HTMLElement;
    if (modal) {
      modal.classList.add('active');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo">
            <i className="fas fa-truck-fast"></i>
            <span>SwiftDeliver</span>
          </div>
          <p>Fast, reliable, and secure delivery services at your fingertips.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#" onClick={() => scrollToSection('services')}>Services</a></li>
            <li><a href="#" onClick={() => scrollToSection('about')}>About Us</a></li>
            <li><a href="#" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>For Drivers</h4>
          <ul>
            <li><a href="#" onClick={openDriverModal}>Driver Login</a></li>
            <li><a href="#" onClick={() => scrollToSection('drivers')}>Become a Driver</a></li>
            <li><a href="#">Driver Support</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 SwiftDeliver. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
