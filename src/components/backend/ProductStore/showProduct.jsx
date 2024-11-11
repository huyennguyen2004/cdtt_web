import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductStoreService from '../../../services/ProductStoreService';

const ShowProductStore = () => {
  const { id } = useParams();
  const [product_store, setProduct] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductStore = async () => {
      try {
        const response = await ProductStoreService.show(id);
        console.log(response);
        setProduct(response.productstore);
      } catch (error) {
        console.error('Failed to fetch product store:', error);
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
      }
    };
    fetchProductStore();
  }, [id]);
  
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!product_store) return <p className="text-center">Đang tải ...</p>;

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Chi tiết</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-4 text-left">Thông Tin</th>
              <th className="border border-gray-300 p-4 text-left">Giá Trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Tên sản phẩm</strong></td>
              <td className="border border-gray-300 p-4">{product_store.name}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>ID</strong></td>
              <td className="border border-gray-300 p-4">{product_store.id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Giá bán</strong></td>
              <td className="border border-gray-300 p-4">{product_store.priceroot}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Số lượng</strong></td>
              <td className="border border-gray-300 p-4">{product_store.qty}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Ngày nhập hàng</strong></td>
              <td className="border border-gray-300 p-4">{product_store.dateimport}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Trạng thái</strong></td>
              <td className="border border-gray-300 p-4">{product_store.status}</td>
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

export default ShowProductStore;
