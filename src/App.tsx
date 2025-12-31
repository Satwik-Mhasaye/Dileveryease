import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import DriverRecruitment from './components/DriverRecruitment';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DeliveryModal from './components/DeliveryModal';
import DriverModal from './components/DriverModal';
import TrackOrderModal from './components/TrackOrderModal';
import DriverDashboard from './components/DriverDashboard';
import DriverRegister from './components/DriverRegister';
import ServicesPage from './components/ServicesPage';
import HowItWorksPage from './components/HowItWorksPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
}

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  const login = (user: any, token: string) => {
    setAuthState({
      isAuthenticated: true,
      user,
      token
    });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Navbar authState={authState} logout={logout} />
              <Hero />
              <Services />
              <HowItWorks />
              <DriverRecruitment />
              <About />
              <Contact />
              <Footer />

              {/* Modals */}
              <DeliveryModal />
              <DriverModal login={login} />
              <TrackOrderModal />
            </>
          } />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/driver-dashboard" element={
            <div>
              <Navbar authState={authState} logout={logout} />
              <DriverDashboard authState={authState} />
              <Footer />
            </div>
          } />
          <Route path="/driver-register" element={
            <div>
              <Navbar authState={authState} logout={logout} />
              <DriverRegister />
              <Footer />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
