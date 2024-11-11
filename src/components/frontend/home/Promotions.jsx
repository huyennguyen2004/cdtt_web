import React from 'react';
import { Link } from 'react-router-dom';

const Promotions = () => {
  return (
    <div className="promotions-section">

      <div className="bg-slate-300 text-black text-left p-4 rounded-lg mb-6 mt-5">
        <h2 className="text-3xl font-bold">Sản phẩm khuyến mãi</h2>
      </div>
      
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
  
        <div className="border rounded-lg overflow-hidden shadow-lg p-4">
          <img src="/imgs/product1.jpg" alt="Product 1" className="w-full h-48 object-cover mb-4" />
          <h3 className="text-xl font-semibold">Tên sản phẩm</h3>
          <p className="text-gray-500">Giá: <span className="font-bold text-black">200,000 VND</span></p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Thêm vào giỏ hàng
          </button>
        </div>
        
 
        <div className="border rounded-lg overflow-hidden shadow-lg p-4">
          <img src="/imgs/product2.jpg" alt="Product 2" className="w-full h-48 object-cover mb-4" />
          <h3 className="text-xl font-semibold">Tên sản phẩm</h3>
          <p className="text-gray-500">Giá: <span className="font-bold text-black">150,000 VND</span></p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Link to="/promotions" className="mb-5 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
          Xem thêm
        </Link>
      </div>
    </div>
  );
};

export default Promotions;
