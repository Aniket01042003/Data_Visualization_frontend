import { useState, useEffect, useRef } from "react";

const Carousel = () => {
    const slides = [
        {
            img: "caousel1.png",
            title: "Visual Insights",
            desc: "Transforming raw data into meaningful and interactive visual stories."
        },
        {
            img: "corusel2.png",
            title: "Data Universe",
            desc: "Explore patterns, trends, and relationships hidden within complex datasets."
        },
        {
            img: "crousel3.png",
            title: "Insightful Analytics",
            desc: "Bringing data to life with real-time, dynamic 2D and 3D visualizations."
        }
    ];


    const [currentSlide, setCurrentSlide] = useState(0);
    const autoAdvanceTimer = useRef(null);

    useEffect(() => {
        resetAutoAdvance();
        return () => clearInterval(autoAdvanceTimer.current);
    }, [currentSlide]);

    const resetAutoAdvance = () => {
        clearInterval(autoAdvanceTimer.current);
        autoAdvanceTimer.current = setInterval(() => {
            nextSlide();
        }, 5000);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className=" bg-gradient-to-br from-black via-gray-900 to-black  " >
            <div className="relative w-full  mx-auto">
                <div className="absolute top-0 left-0 right-0 h-1  rounded-full overflow-hidden">
                    <div className="progress-bar h-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}></div>
                </div>
                <div className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                        >
                            <div className="w-full h-full p-4 sm:p-8">
                                <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative">
                                    <img src={slide.img} alt={slide.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500" />
                                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                        <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">{slide.title}</h3>
                                        <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl">{slide.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    &#9664;
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    &#9654;
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                        <button key={index} onClick={() => setCurrentSlide(index)} className={`w-8 h-1 rounded-full transition-colors ${index === currentSlide ? "bg-white/60" : "bg-white/20"}`}></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
