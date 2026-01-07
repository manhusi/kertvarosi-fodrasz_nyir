import React from 'react';
import { MapPin, Star, Scissors } from 'lucide-react';
import { BookingWidget } from '../booking/BookingWidget';
import '../booking/styles.css';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen pt-24 pb-16 overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-barbershop-navy to-[#0a0a0a] flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-barbershop-red/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-barbershop-burgundy/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-barbershop-red/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Striped pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,#C41E3A,#C41E3A_1px,transparent_1px,transparent_20px)]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left Side - Branding & Info */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-xl">

            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-xl rounded-full shadow-2xl border border-barbershop-red/20 mx-auto lg:mx-0 group hover:scale-105 transition-transform">
              <div className="flex gap-0.5 text-[#FBBC05]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div className="flex text-base font-bold tracking-tighter">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              <span className="text-white/70 text-sm font-medium">5.0</span>
            </div>

            {/* Icon */}
            <div className="hidden lg:flex w-20 h-20 bg-gradient-to-br from-barbershop-red to-barbershop-burgundy rounded-2xl items-center justify-center shadow-2xl shadow-barbershop-red/30 mx-auto lg:mx-0 rotate-3 hover:rotate-0 transition-transform">
              <Scissors size={40} className="text-white" />
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading text-white leading-[0.95] tracking-tight">
                Kertvárosi
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading leading-[0.95] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-barbershop-red via-red-500 to-barbershop-burgundy">
                  Fodrászat
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-white/60 font-medium tracking-wide uppercase">
              Borbély Üzlet
            </p>

            {/* Address Card */}
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-barbershop-red/20 to-barbershop-burgundy/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-barbershop-red/30 shadow-xl mx-auto lg:mx-0">
              <div className="w-12 h-12 bg-barbershop-red/20 rounded-xl flex items-center justify-center border border-barbershop-red/30">
                <MapPin size={24} className="text-barbershop-red" />
              </div>
              <div className="text-left">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Helyszín</p>
                <p className="text-white font-semibold text-lg">Újház sor 15., Nyíregyháza</p>
              </div>
            </div>

            {/* Trust elements */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-white/40 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online foglalás</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-barbershop-red rounded-full"></div>
                <span>Professzionális szolgáltatás</span>
              </div>
            </div>
          </div>

          {/* Right Side - Booking Widget */}
          <div className="flex-1 w-full max-w-md lg:max-w-lg">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-barbershop-red/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-barbershop-burgundy/20 rounded-full blur-2xl"></div>

              {/* Widget */}
              <div className="relative z-10">
                <BookingWidget />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};