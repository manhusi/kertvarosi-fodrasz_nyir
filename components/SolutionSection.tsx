import React from 'react';
import { Scissors, Clock, DollarSign } from 'lucide-react';
import { FULL_SERVICES_DATA } from '../constants';

export const SolutionSection: React.FC = () => {
  const services = FULL_SERVICES_DATA.kertvarosifodraszat_barbershop_services;

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-barbershop-navy overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:40px_40px]"></div>

      {/* Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-barbershop-red/5 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-barbershop-red/10 text-barbershop-red px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-barbershop-red/20">
            <Scissors size={16} />
            Szolgáltatásaink
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-tight">
            Professzionális <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-barbershop-red to-barbershop-burgundy">
              Fodrász Szolgáltatások
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Hajvágástól a szakáll ápolásig – minden, amire szükséged van a tökéletes megjelenéshez.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-barbershop-red/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-barbershop-red/10"
            >
              {/* Service Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-barbershop-red to-barbershop-burgundy rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-barbershop-red/20">
                <Scissors size={24} className="text-white" />
              </div>

              {/* Service Name */}
              <h3 className="text-2xl font-bold text-white mb-3 font-heading">
                {service.service_name}
              </h3>

              {/* Service Description */}
              <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                {service.detailed_description}
              </p>

              {/* Service Details */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock size={16} className="text-barbershop-red" />
                  <span className="text-sm font-medium">{service.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-barbershop-red font-bold text-xl">
                  <span>{service.pricing}</span>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-barbershop-red/0 to-barbershop-red/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-6">
          <p className="text-gray-400 text-lg">
            Találd meg a számodra tökéletes szolgáltatást!
          </p>
          <a
            href="#booking"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-barbershop-red to-barbershop-burgundy text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-barbershop-red/30 hover:shadow-barbershop-red/50"
          >
            Foglalj időpontot most
            <Scissors size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};