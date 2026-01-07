import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { BookingWidget } from '../booking/BookingWidget';
import '../booking/styles.css';

export const BookingSection: React.FC = () => {
    return (
        <section id="booking" className="relative py-20 lg:py-32 bg-gradient-to-b from-barbershop-navy via-black to-gray-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:40px_40px]"></div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-barbershop-red/5 rounded-full blur-[150px]"></div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-barbershop-red/10 text-barbershop-red px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-barbershop-red/20">
                        <Calendar size={16} />
                        Online Időpontfoglalás
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-tight">
                        Foglalj <span className="text-transparent bg-clip-text bg-gradient-to-r from-barbershop-red to-barbershop-burgundy">Időpontot</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Válaszd ki a számodra megfelelő időpontot pár kattintással. Gyors, egyszerű és biztonságos.
                    </p>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <div className="flex items-center gap-2 text-gray-300 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <div className="w-8 h-8 bg-barbershop-red/20 rounded-full flex items-center justify-center border border-barbershop-red/30">
                            <Clock size={16} className="text-barbershop-red" />
                        </div>
                        <span>Azonnali visszaigazolás</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <div className="w-8 h-8 bg-barbershop-red/20 rounded-full flex items-center justify-center border border-barbershop-red/30">
                            <CheckCircle size={16} className="text-barbershop-red" />
                        </div>
                        <span>Ingyenes lemondás 24 órán belül</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <div className="w-8 h-8 bg-barbershop-red/20 rounded-full flex items-center justify-center border border-barbershop-red/30">
                            <Calendar size={16} className="text-barbershop-red" />
                        </div>
                        <span>Rugalmas időpontok</span>
                    </div>
                </div>

                {/* Booking Widget */}
                <div className="max-w-lg mx-auto">
                    <BookingWidget />
                </div>

                {/* Footer Note */}
                <p className="text-center text-gray-500 text-sm mt-8 max-w-md mx-auto">
                    A foglalás után e-mailben vagy SMS-ben kapsz visszaigazolást. Ha kérdésed van, keress minket bátran!
                </p>
            </div>
        </section>
    );
};
