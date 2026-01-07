import React from 'react';
import { Scissors } from 'lucide-react';

export const Portfolio: React.FC = () => {
    const images = [
        { src: '/images/portfolio/haircut-1.png', alt: 'Professzionális férfi hajvágás' },
        { src: '/images/portfolio/haircut-2.png', alt: 'Modern frizura szakállal' },
        { src: '/images/portfolio/haircut-3.png', alt: 'Klasszikus borbély stílus' },
    ];

    return (
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-black to-barbershop-navy overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C41E3A_1px,transparent_1px)] [background-size:30px_30px]"></div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-barbershop-red/10 text-barbershop-red px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-barbershop-red/20">
                        <Scissors size={16} />
                        Munkáink
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
                        Így dolgozunk
                    </h2>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-barbershop-red/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-barbershop-red/20"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white font-semibold text-lg">{image.alt}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
