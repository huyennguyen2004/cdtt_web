import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BannerService from '../../../services/BannerService';

const Showbanner = () => {
  const { id } = useParams();
  const [banner, setbanner] = useState(null);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchbanner = async () => {
      try {
        const response = await BannerService.show(id);
        console.log(response); 
        if (response.status && response.banner) {
          setbanner(response.banner);
        } else {
          setError('Banner không tồn tại.');
        }
      } catch (error) {
        console.error('Failed to fetch banner:', error);
        setError('Không thể tải banner. Vui lòng thử lại sau.');
      }
    };
    fetchbanner();
  }, [id]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!banner) return <p className="text-center">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{banner.name}</h2>
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
              <td className="border border-gray-300 p-4">{banner.name}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Ảnh</strong></td>
              <td className="border border-gray-300 p-4">
                <img src={banner.image} alt={banner.name} className="w-24 h-16 object-cover" />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>ID</strong></td>
              <td className="border border-gray-300 p-4">{banner.id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Vị trí</strong></td>
              <td className="border border-gray-300 p-4">{banner.position}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Mô tả</strong></td>
              <td className="border border-gray-300 p-4">{banner.description}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Liên kết</strong></td>
              <td className="border border-gray-300 p-4">{banner.link}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Ngày tạo</strong></td>
              <td className="border border-gray-300 p-4">{banner.created_at}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Trạng thái</strong></td>
              <td className="border border-gray-300 p-4">{banner.status}</td>
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

export default Showbanner;
