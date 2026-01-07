import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';
import { Plus, Minus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4 text-center">
          Gyakori kérdések
        </h2>
        <p className="text-gray-400 text-center mb-12">
          Válaszok a leggyakrabban feltett kérdésekre
        </p>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="border border-barbershop-red/20 rounded-2xl overflow-hidden transition-all duration-300 hover:border-barbershop-red/40 bg-white/5 backdrop-blur-sm">
              <button
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-lg text-white font-heading">{item.question}</span>
                <span className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-barbershop-red text-white' : 'bg-white/10 text-barbershop-red'}`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/10">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};