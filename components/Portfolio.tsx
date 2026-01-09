import React, { useState, useEffect, useRef } from 'react';
import { Scissors, ChevronLeft, ChevronRight } from 'lucide-react';

export const Portfolio: React.FC = () => {
    const images = [
        { src: '/images/portfolio/ref-1.jpg', alt: 'Modern átmenetes vágás' },
        { src: '/images/portfolio/ref-2.jpg', alt: 'Precíz fade vágás' },
        { src: '/images/portfolio/ref-3.jpg', alt: 'Klasszikus borbély stílus' },
        { src: '/images/portfolio/ref-4.jpg', alt: 'Rövid átmenetes frizura' },
        { src: '/images/portfolio/haircut-1.png', alt: 'Professzionális férfi hajvágás' },
        { src: '/images/portfolio/haircut-2.png', alt: 'Modern frizura szakállal' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Responsive items per view
    const getItemsPerView = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1024) return 3; // Desktop
            if (window.innerWidth >= 768) return 2;  // Tablet
            return 1; // Mobile
        }
        return 1;
    };

    const [itemsPerView, setItemsPerView] = useState(1); // Default to 1 to match server/hydrate

    useEffect(() => {
        const handleResize = () => {
            setItemsPerView(getItemsPerView());
        };
        handleResize(); // Set initial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, images.length - itemsPerView);

    // Auto-play
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 4000);

        return () => clearInterval(interval);
    }, [isPaused, maxIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    };

    // Swipe handlers
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsPaused(true);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }

        setIsPaused(false);
    };

    return (
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-barbershop-charcoal to-barbershop-anthracite overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#f5f0e6_1px,transparent_1px)] [background-size:30px_30px]"></div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-white/10 text-barbershop-beige px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-white/20">
                        <Scissors size={16} />
                        Munkáink
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">
                        Így dolgozunk
                    </h2>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative max-w-6xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Items Wrapper */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                        >
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    style={{ width: `${100 / itemsPerView}%` }}
                                    className="flex-shrink-0 px-3"
                                >
                                    <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 hover:border-barbershop-beige/40 transition-all duration-300">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            draggable={false}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <p className="text-white font-semibold text-lg">{image.alt}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons (Desktop) */}
                    <button
                        onClick={prevSlide}
                        className="hidden lg:flex absolute top-1/2 -left-12 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white transition-colors border border-white/10"
                        aria-label="Előző kép"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="hidden lg:flex absolute top-1/2 -right-12 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full items-center justify-center text-white transition-colors border border-white/10"
                        aria-label="Következő kép"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex
                                        ? 'w-8 bg-barbershop-beige'
                                        : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                                aria-label={`${i + 1}. oldal`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
