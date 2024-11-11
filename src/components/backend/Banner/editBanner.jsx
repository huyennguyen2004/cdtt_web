import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BannerService from '../../../services/BannerService';

const EditBanner = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState({
    name: '',
    link: '',
    sort_order: 1,
    position: 'slideshow',
    status: 1,
  });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await BannerService.show(id);
        setBannerData(response.banner);
      } catch (error) {
        console.error('Failed to fetch banner:', error);
      }
    };

    fetchBanner();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await BannerService.update(bannerData, id);
      console.log(response); 
      if (response.status === true) {  
        alert('Cập nhật banner thành công!');
        navigate('/admin/banner'); 
      } else {
        console.error('Không thể cập nhật banner:', response.message);
        alert(response.message || 'Có lỗi xảy ra khi cập nhật banner');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật banner:', error);
    }
  };
  

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Edit Banner</h2>
      <form onSubmit={handleUpdate}>

        <div className="mb-4">
          <label className="block mb-1">Tên banner</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={bannerData.name}
            onChange={(e) => setBannerData({ ...bannerData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Link</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={bannerData.link}
            onChange={(e) => setBannerData({ ...bannerData, link: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Sắp Xếp</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={bannerData.sort_order}
            onChange={(e) => setBannerData({ ...bannerData, sort_order: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Vị trí</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={bannerData.position}
            onChange={(e) =>setBannerData({ ...bannerData, position: e.target.value })}
          >
          <option value="slideshow">Slideshow</option>
          <option value="ads">Ads</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Trạng Thái</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={bannerData.status}
            onChange={(e) => setBannerData({ ...bannerData, status: e.target.value })}
          >
            <option value="1">Xuất bản</option>
            <option value="0">Chưa xuất bản</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
       Cập nhật
        </button>
      </form>
      <div className="mt-6 text-center">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" 
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
        </div>
    </div>
  );
};

export default EditBanner;
