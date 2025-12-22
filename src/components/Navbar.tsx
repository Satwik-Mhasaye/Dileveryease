import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
}

interface NavbarProps {
  authState: AuthState;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ authState, logout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openDriverModal = () => {
    const modal = document.getElementById('driverModal') as HTMLElement;
    if (modal) {
      modal.classList.add('active');
    }
  };

  const openTrackModal = () => {
    const modal = document.getElementById('trackModal') as HTMLElement;
    if (modal) {
      modal.classList.add('active');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <i className="fas fa-truck-fast"></i>
          <span>SwiftDeliver</span>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
          <li><a href="#" onClick={() => scrollToSection('home')} className="active">Home</a></li>
          <li><a href="#" onClick={() => scrollToSection('services')}>Services</a></li>
          <li><a href="#" onClick={() => scrollToSection('how-it-works')}>How It Works</a></li>
          <li><a href="#" onClick={() => scrollToSection('about')}>About Us</a></li>
          <li><a href="#" onClick={() => scrollToSection('contact')}>Contact</a></li>
          <li><a href="#" onClick={openTrackModal}>Track Order</a></li>
          <li className="driver-link">
            <a href="#" className="driver-btn" onClick={openDriverModal}>
              <i className="fas fa-id-card"></i> Driver Login
            </a>
          </li>
        </ul>
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} id="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
