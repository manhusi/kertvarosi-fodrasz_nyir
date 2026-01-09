import React from 'react';
import { Star } from 'lucide-react';
import { LANDING_DATA } from '../constants';

export const Testimonials: React.FC = () => {
  const testimonials = LANDING_DATA.trust_signals;

  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-b from-barbershop-warmBeige to-barbershop-cream overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          {/* Google Badge */}
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-xl mb-8">
            <div className="flex text-2xl font-bold tracking-tighter">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <div className="flex gap-1 text-[#FBBC05]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={20} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-gray-800 font-bold text-lg">5.0</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-heading text-barbershop-anthracite">
            Vendégeink véleménye
          </h2>
        </div>

        {/* Google Reviews - White cards like real Google reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Reviewer Header */}
              <div className="flex items-start gap-3 mb-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {testimonial.source.charAt(0)}
                </div>

                {/* Name & Meta */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">{testimonial.source}</div>
                  <div className="text-gray-500 text-xs">{testimonial.reviewCount}</div>
                </div>

                {/* Google G */}
                <div className="shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
              </div>

              {/* Stars & Date */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5 text-[#FBBC05]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">{testimonial.date}</span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};