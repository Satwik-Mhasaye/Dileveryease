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
        <Navbar authState={authState} logout={logout} />
        <Routes>
          <Route path="/" element={
            <>
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
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
