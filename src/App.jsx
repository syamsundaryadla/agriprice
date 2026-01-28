import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import LivePrices from './pages/LivePrices';
import Predictions from './pages/Predictions';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import CropDetail from './pages/CropDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-layout">
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/prices" element={<LivePrices />} />
              <Route path="/crop/:name" element={<CropDetail />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
