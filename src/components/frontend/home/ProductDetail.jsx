import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductListService from '../../../services/ProductListService';
import { FaShoppingCart } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductListService.show(id);
        console.log('Fetched product:', response);
        setProduct(response.product);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      // Xử lý gửi bình luận ở đây
      console.log('Comment submitted:', comment);
      setComment("");
    }
  };

  return (
    <div className="product-detail p-6 lg:p-12 bg-gray-50">
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-6 lg:mb-0">
          {product && product.images && product.images.length > 0 ? (
            <img
              className="w-full lg:w-3/4 rounded-lg shadow-md object-cover"
              src={product.images[0].thumbnail}
              alt={product.name}
            />
          ) : (
            <span className="text-gray-500">Không có hình ảnh</span>
          )}
        </div>


        <div className="w-full lg:w-1/2 lg:pl-10">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">{product?.name}</h2>
          <h3 className="text-xl font-bold text-red-500 mb-4">Giá: {product?.price} VND</h3>
          <p className="text-gray-600 mb-6">{product?.description}</p>

      
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded"
            >
              -
            </button>
            <span className="text-lg font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-3 rounded"
            >
              +
            </button>
          </div>


          <div className="flex space-x-4 mb-6">
            <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg">
              <FaShoppingCart className="mr-2" /> Thêm vào giỏ hàng
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

    
      <div className="mt-8 w-full">
        <h3 className="text-lg font-semibold mb-2">Bình luận của bạn:</h3>
        <form onSubmit={handleCommentSubmit} className="flex space-x-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Nhập bình luận..."
            className="flex-1 border border-gray-300 rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;
