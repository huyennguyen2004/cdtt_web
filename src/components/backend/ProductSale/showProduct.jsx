import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductSaleService from '../../../services/ProductSaleService';


const ShowProductSale = () => {
  const { id } = useParams();
  const [product_sale, setProductSale] = useState({});

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log('ShowProduct rendered');

  useEffect(() => {
    const fetchProductSale = async () => {
      try {
        const response = await ProductSaleService.show(id);
        console.log('API response:', response);
        setProductSale(response.product);
      } catch (error) {
        console.error('Failed to fetch product sale:', error);
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
      }
    };
    fetchProductSale();
}, [id]);

if (!product_sale || !product_sale.id) {
  return <p className="text-center">Đang tải ...</p>;
}

  
  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chi tiết sản phẩm</h2>

        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-4 text-left">Thông Tin</th>
              <th className="border border-gray-300 p-4 text-left">Giá Trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-4"><strong>ID</strong></td>
              <td className="border border-gray-300 p-4">{product_sale.id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Giá khuyến mãi</strong></td>
              <td className="border border-gray-300 p-4">{product_sale.pricesale}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Ngày bắt đầu</strong></td>
              <td className="border border-gray-300 p-4">{product_sale.datebegin}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Ngày kết thúc</strong></td>
              <td className="border border-gray-300 p-4">{product_sale.dateend}</td>
    </tr>
          </tbody>
        </table>

        <div className="mt-6 text-center">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" 
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowProductSale;
