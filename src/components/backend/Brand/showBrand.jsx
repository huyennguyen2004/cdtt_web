import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BrandService from '../../../services/BrandService';

const Showbrand = () => {
  const { id } = useParams();
  const [brand, setbrand] = useState(null);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchbrand = async () => {
        try {
            const response = await BrandService.show(id);
            console.log(response); 
            if (response) { 
                setbrand(response);
            } else {
                setError('Brand không tồn tại.');
            }
        } catch (error) {
            console.error('Failed to fetch brand:', error);
            setError('Không thể tải brand. Vui lòng thử lại sau.');
        }
    };
    fetchbrand();
}, [id]);


  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!brand) return <p className="text-center">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{brand.name}</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-4 text-left">Thông Tin</th>
              <th className="border border-gray-300 p-4 text-left">Giá Trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Tên</strong></td>
              <td className="border border-gray-300 p-4">{brand.name}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Ảnh</strong></td>
              <td className="border border-gray-300 p-4">
              <img src={`http://localhost:8000/${brand.thumbnail}`} alt={brand.name} className="w-24 h-16 object-cover" />
                  </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>ID</strong></td>
              <td className="border border-gray-300 p-4">{brand.id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Slug</strong></td>
              <td className="border border-gray-300 p-4">{brand.slug}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Mô tả</strong></td>
              <td className="border border-gray-300 p-4">{brand.description}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Ngày tạo</strong></td>
              <td className="border border-gray-300 p-4">{brand.created_at}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Trạng thái</strong></td>
              <td className="border border-gray-300 p-4">{brand.status}</td>
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

export default Showbrand;
