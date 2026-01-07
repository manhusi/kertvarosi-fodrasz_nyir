import React from 'react';
import { Scissors, Clock, Award, MapPin, ThumbsUp, DollarSign } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: "Tapasztalt Fodrászok",
      description: "15+ év tapasztalat a férfi hajvágás és szakáll ápolás terén. Minden munkatársunk képzett szakember."
    },
    {
      icon: Scissors,
      title: "Modern & Klasszikus",
      description: "A hagyományos borbély technikákat ötvözzük a modern trendekkel, hogy mindig stílusos legyél."
    },
    {
      icon: Clock,
      title: "Rugalmas Időpontok",
      description: "Online időpontfoglalás és rugalmas nyitvatartás, hogy mindig találj szabad időpontot."
    },
    {
      icon: ThumbsUp,
      title: "Kiváló Minőség",
      description: "5 csillagos Google értékelések és elégedett vendégek bizonyítják szakértelmünket."
    },
    {
      icon: MapPin,
      title: "Könnyen Elérhető",
      description: "Nyíregyháza központjában, ingyenes parkolási lehetőséggel az üzlet közelében."
    },
    {
      icon: DollarSign,
      title: "Tisztességes Árak",
      description: "Kiváló ár-érték arány, átlátható árazás, nincs rejtett költség."
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-black via-barbershop-navy to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:30px_30px]"></div>

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-barbershop-red/5 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-barbershop-red/10 text-barbershop-red px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-barbershop-red/20">
            <Award size={16} />
            Miért válassz minket?
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-tight">
            A Legjobb Választás <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-barbershop-red to-barbershop-burgundy">
              Nyíregyházán
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Több mint egy évtizedes tapasztalattal várjuk vendégeinket. Nálunk nem csak hajat vágunk,
            hanem élményt nyújtunk.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-barbershop-red/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-barbershop-red/10"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-br from-barbershop-red to-barbershop-burgundy rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-barbershop-red/20">
                  <Icon size={28} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 font-heading">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-barbershop-red/0 to-barbershop-red/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg mb-6">
            Készen állsz a változásra?
          </p>
          <a
            href="#booking"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-barbershop-red to-barbershop-burgundy text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-barbershop-red/30 hover:shadow-barbershop-red/50"
          >
            Foglalj időpontot
            <Scissors size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};