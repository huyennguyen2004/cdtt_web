import React, { useEffect, useState } from 'react';
import BannerService from '../../../services/BannerService';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]); 

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await BannerService.index();
        console.log('fetch banners:', response);
        if (response && response.status && Array.isArray(response.banners)) {
          setSlides(response.banners); 
        } else {
          console.error('Response does not contain a valid banners array:', response);
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };
  
    fetchSlides();
  }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="flex mt-6 mb-6">
      <div className="w-2/3 pr-4 relative">
        <div className="overflow-hidden h-80 relative">
          {slides.map((banner, index) => (
            <div
              key={banner.id} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <a href={banner.link} target="_blank" rel="noopener noreferrer"> 
                <img className="w-full h-full object-cover" src={banner.image} alt={`Slide ${index + 1}`} />
              </a>
            </div>
          ))}

          <button
            onClick={goToPreviousSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 opacity-75 hover:opacity-100"
          >
            &lt;
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 opacity-75 hover:opacity-100"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="w-1/3 flex flex-col">
        <div className="flex-1 mt-1 mb-4">
          <img className="d-block w-full h-40 object-cover" src="/imgs/banner4.jpg" alt="Static Slide 1" />
        </div>
        <div className="flex-1">
          <img className="d-block w-full h-40 object-cover" src="/imgs/banner5.png" alt="Static Slide 2" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
