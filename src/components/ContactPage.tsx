import React, { useState } from 'react';
import Navbar from './Navbar';
import Contact from './Contact';
import Footer from './Footer';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  token: string | null;
}

const ContactPage: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token')
  });

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
    <div>
      <Navbar authState={authState} logout={logout} />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
