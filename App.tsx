import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

// Landing Page Component
function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Portfolio />
      <Testimonials />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-black font-body selection:bg-barbershop-red/30 selection:text-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;