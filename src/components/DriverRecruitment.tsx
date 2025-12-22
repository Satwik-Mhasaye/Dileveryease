import React from 'react';

const DriverRecruitment: React.FC = () => {
  const openDriverModal = () => {
    const modal = document.getElementById('driverModal') as HTMLElement;
    if (modal) {
      modal.classList.add('active');
    }
  };

  return (
    <section className="driver-recruitment" id="drivers">
      <div className="recruitment-content">
        <h2>Join Our Driver Team</h2>
        <p>Become a SwiftDeliver driver and earn money on your own schedule. We're always looking for reliable drivers to join our growing team.</p>
        <ul className="benefits-list">
          <li><i className="fas fa-check-circle"></i> Flexible working hours</li>
          <li><i className="fas fa-check-circle"></i> Competitive pay rates</li>
          <li><i className="fas fa-check-circle"></i> Weekly payments</li>
          <li><i className="fas fa-check-circle"></i> Support available 24/7</li>
        </ul>
        <a href="#" className="btn btn-primary" onClick={openDriverModal}>Apply Now</a>
      </div>
      <div className="recruitment-image">
        <i className="fas fa-user-tie"></i>
      </div>
    </section>
  );
};

export default DriverRecruitment;
