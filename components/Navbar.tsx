import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-barbershop-navy/95 backdrop-blur-md shadow-lg shadow-black/20 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-barbershop-red to-barbershop-burgundy rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold font-heading leading-none text-white">
              Kertvárosi
            </span>
            <span className="text-sm font-bold text-barbershop-red tracking-widest uppercase">
              Fodrászat
            </span>
          </div>
        </div>

        {/* Address */}
        <div className="hidden sm:flex items-center gap-2 text-gray-400 text-sm">
          <MapPin size={16} className="text-barbershop-red" />
          <span>Újház sor 15., Nyíregyháza</span>
        </div>
      </div>
    </nav>
  );
};