import React from 'react';
import { MapPin, Star, Scissors } from 'lucide-react';
import { BookingWidget } from '../booking/BookingWidget';
import '../booking/styles.css';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen pt-24 pb-16 overflow-hidden bg-gradient-to-br from-barbershop-beige via-barbershop-cream to-barbershop-warmBeige flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-barbershop-anthracite/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-barbershop-charcoal/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-barbershop-anthracite/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Striped pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-[repeating-linear-gradient(45deg,#4a4a4a,#4a4a4a_1px,transparent_1px,transparent_20px)]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left Side - Branding & Info */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/60 backdrop-blur-xl rounded-full shadow-2xl border border-barbershop-anthracite/15 mx-auto lg:mx-0 group hover:scale-105 transition-transform">
              <div className="flex gap-0.5 text-[#FBBC05]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <div className="h-4 w-px bg-barbershop-anthracite/20"></div>
              <div className="flex text-base font-bold tracking-tighter">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <span className="text-barbershop-anthracite/70 text-sm font-medium">5.0</span>
            </div>

            {/* Icon/Logo */}
            <div className="flex w-32 h-32 lg:w-40 lg:h-40 rounded-2xl items-center justify-center mx-auto lg:mx-0 transition-transform overflow-hidden shadow-2xl shadow-barbershop-anthracite/20 mb-6 lg:mb-0">
              <img
                src="/images/logo.png"
                alt="Kertvárosi Fodrászat Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading text-barbershop-anthracite leading-[0.95] tracking-tight">
                Kertvárosi
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading leading-[0.95] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-barbershop-charcoal via-barbershop-anthracite to-barbershop-charcoal">
                  Fodrászat
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-barbershop-anthracite/60 font-medium tracking-wide uppercase">
              Borbély Üzlet
            </p>

            {/* Address Card */}
            <div className="inline-flex items-center gap-4 bg-white/50 backdrop-blur-sm px-6 py-4 rounded-2xl border border-barbershop-anthracite/15 shadow-xl mx-auto lg:mx-0">
              <div className="w-12 h-12 bg-barbershop-anthracite/10 rounded-xl flex items-center justify-center border border-barbershop-anthracite/20">
                <MapPin size={24} className="text-barbershop-anthracite" />
              </div>
              <div className="text-left">
                <p className="text-barbershop-anthracite/50 text-xs uppercase tracking-widest mb-1">Helyszín</p>
                <p className="text-barbershop-anthracite font-semibold text-lg">Újház sor 15., Nyíregyháza</p>
              </div>
            </div>

            {/* Trust elements */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-barbershop-anthracite/50 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                <span>Online foglalás</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-barbershop-anthracite rounded-full"></div>
                <span>Professzionális szolgáltatás</span>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Widget */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-barbershop-anthracite/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-barbershop-charcoal/10 rounded-full blur-2xl"></div>

              {/* Widget */}
              <div className="relative z-10">
                <BookingWidget />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-barbershop-warmBeige to-transparent pointer-events-none"></div>
    </section>
  );
};