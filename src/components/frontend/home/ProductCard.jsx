import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';

const ProductCard = ({ product, type }) => {
  const pricesale = type === 'sale' ? product.pricesale || "Chưa có giá" : null;
  const pricenew = type === 'new' ? product.pricebuy || "Chưa có giá" : null;

  const imageUrl = type === 'sale' 
    ? (product.images && product.images.length > 0 
      ? `http://localhost:8000/${product.images[0].thumbnail}` 
      : '/images/product/default.jpg') 
    : (product.images && product.images.length > 0 
      ? `${product.images[0].thumbnail}` 
      : '/images/product/default.jpg');
  
  return (
    <Link to={`/product/show/${product.id}`} className="border p-2 rounded-lg">
      <div className="relative">
        {type === 'new' && (
          <img 
            src="/imgs/logonew.png" 
            alt="New Logo" 
            className="absolute top-2 left-2 w-12 h-12"
          />
        )}
        <img 
          src={imageUrl}
          alt={product.name} 
          className="w-full h-48 mb-4 object-cover" 
        />
      </div>  
      <h2 className="text-xl font-bold">{product.name}</h2>
      <div className="flex justify-left p-1/4">
        <span className="text-gray-600 mr-2">Giá:</span>
        <div className="flex items-center space-x-2">
          {type === 'sale' && (
            <>
              <span className="text-red-500 font-bold">{pricesale} VND</span>
              <span className="text-slate-500 line-through">{pricesale}VND</span>
            </>
          )}
        </div>
        {type === 'new' && (
          <span className="text-black font-bold">{pricenew} VND</span>
        )}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <button title="Yêu thích" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-red-500 hover:bg-red-200">
          <FaHeart size={20} />
        </button>
        <button title="Thêm vào giỏ hàng" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-green-500 hover:bg-green-200">
          <FaShoppingCart size={20} />
        </button>
        <button title="Xem nhanh" className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-yellow-500 hover:bg-yellow-200">
          <FaEye size={20} />
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
