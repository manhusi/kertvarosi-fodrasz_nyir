import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Star } from 'lucide-react';
import { BookingWidget } from '../booking/BookingWidget';
import '../booking/styles.css';

export const BookingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-barbershop-navy via-gray-900 to-black font-body">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-barbershop-red/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-barbershop-burgundy/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-barbershop-red hover:text-barbershop-burgundy transition-colors font-medium group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Vissza a főoldalra
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-barbershop-red/10 text-barbershop-red px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-barbershop-red/20">
            <Calendar size={16} />
            Online időpontfoglalás
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Foglalj <span className="text-barbershop-red">időpontot</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Kertvárosi Fodrászat – válaszd ki a számodra megfelelő időpontot pár kattintással.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-8 h-8 bg-barbershop-red/10 rounded-full flex items-center justify-center border border-barbershop-red/20">
              <Clock size={16} className="text-barbershop-red" />
            </div>
            <span>Rugalmas időpontok</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-8 h-8 bg-barbershop-red/10 rounded-full flex items-center justify-center border border-barbershop-red/20">
              <Star size={16} className="text-barbershop-red" />
            </div>
            <span>5 csillagos értékelés</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-8 h-8 bg-barbershop-red/10 rounded-full flex items-center justify-center border border-barbershop-red/20">
              <MapPin size={16} className="text-barbershop-red" />
            </div>
            <span>Nyíregyháza, Újház sor</span>
          </div>
        </div>

        {/* Booking Widget Container */}
        <div className="max-w-lg mx-auto">
          <BookingWidget />
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-8 max-w-md mx-auto">
          A foglalás után visszaigazolást kapsz. Ha kérdésed van, keress bátran!
        </p>
      </main>
    </div>
  );
};

export default BookingPage;
