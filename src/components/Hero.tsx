import React from 'react';

const Hero: React.FC = () => {
  const openDeliveryModal = () => {
    const modal = document.getElementById('deliveryModal') as HTMLElement;
    if (modal) {
      modal.classList.add('active');
    }
  };

  const openDriverModal = () => {
    const modal = document.getElementById('driverModal') as HTMLElement;
    if (modal) {
      modal.classList.add('active');
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Fast & Reliable <span>Delivery Services</span></h1>
        <p>We connect you with professional drivers to transport your goods safely and efficiently from one place to another.</p>
        <div className="hero-buttons">
          <a href="#" className="btn btn-primary" onClick={openDeliveryModal}>Book a Delivery</a>
          <a href="#" className="btn btn-secondary" onClick={scrollToServices}>Our Services</a>
          <a href="#" className="btn btn-outline" onClick={openDriverModal}>Become a Driver</a>
        </div>
      </div>
      <div className="hero-image">
        <div className="delivery-illustration">
          <i className="fas fa-truck"></i>
        </div>
      </div>
    </section>
  );
};

export default Hero;
