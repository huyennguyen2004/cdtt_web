import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';


const Showcategory = () => {
  const { id } = useParams();
  const [category, setcategory] = useState(null);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchcategory = async () => {
        try {
            const response = await CategoryService.show(id);
            console.log(response); 
            if (response) { 
                setcategory(response);
            } else {
                setError('category không tồn tại.');
            }
        } catch (error) {
            console.error('Failed to fetch category:', error);
            setError('Không thể tải category. Vui lòng thử lại sau.');
        }
    };
    fetchcategory();
}, [id]);


  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!category) return <p className="text-center">Đang tải dữ liệu...</p>;

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
              <td className="border border-gray-300 p-4"><strong>Tên</strong></td>
              <td className="border border-gray-300 p-4">{category.name}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>ID</strong></td>
              <td className="border border-gray-300 p-4">{category.id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Slug</strong></td>
              <td className="border border-gray-300 p-4">{category.slug}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Mô tả</strong></td>
              <td className="border border-gray-300 p-4">{category.description}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>parent_id</strong></td>
              <td className="border border-gray-300 p-4">{category.parent_id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Ngày tạo</strong></td>
              <td className="border border-gray-300 p-4">{category.created_at}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Trạng thái</strong></td>
              <td className="border border-gray-300 p-4">{category.status}</td>
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

export default Showcategory;
