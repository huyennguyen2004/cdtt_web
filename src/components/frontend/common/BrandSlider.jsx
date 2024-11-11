import React from 'react';

const BrandSlider = () => {
  return (
    <div className="overflow-hidden py-8 bg-gray-100">
      <div className="flex animate-scroll space-x-8">
        <div className="flex items-center justify-center w-40 h-24 bg-white shadow-md rounded-lg">
          <img src="/brand/adidas.jpg" alt="Brand 1" className="h-full object-contain" />
        </div>
        <div className="flex items-center justify-center w-40 h-24 bg-white shadow-md rounded-lg">
          <img src="/brand/bitis.png" alt="Brand 2" className="h-full object-contain" />
        </div>
        <div className="flex items-center justify-center w-40 h-24 bg-white shadow-md rounded-lg">
          <img src="/brand/nike.jpg" alt="Brand 3" className="h-full object-contain" />
        </div>
        <div className="flex items-center justify-center w-40 h-24 bg-white shadow-md rounded-lg">
          <img src="/brand/puma.jpg" alt="Brand 4" className="h-full object-contain" />
        </div>
        <div className="flex items-center justify-center w-40 h-24 bg-white shadow-md rounded-lg">
          <img src="/brand/rienevan.jpg" alt="Brand 5" className="h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
