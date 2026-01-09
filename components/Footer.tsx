import React from 'react';
import { MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-barbershop-warmBeige text-barbershop-anthracite py-12 border-t border-barbershop-anthracite/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Brand */}
          <h3 className="text-2xl font-bold font-heading">
            Kertvárosi<span className="text-barbershop-charcoal"> Fodrászat</span>
          </h3>

          {/* Address */}
          <div className="flex items-center gap-2 text-barbershop-anthracite/60">
            <MapPin size={18} className="text-barbershop-anthracite" />
            <span>Újház sor 15., Nyíregyháza 4400</span>
          </div>

          {/* Copyright */}
          <p className="text-barbershop-anthracite/50 text-sm">
            &copy; {new Date().getFullYear()} Kertvárosi Fodrászat - Borbély Üzlet
          </p>
        </div>
      </div>
    </footer>
  );
};