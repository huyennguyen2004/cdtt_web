import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import BannerService from '../../services/BannerService';

const BannerPage = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [bannerData, setBannerData] = useState({
    name: '',
    link: '',
    sort_order: 1,
    position: 'slideshow',
    status: 1,
  });

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await BannerService.index(); 
        setBanners(response.banners);
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };

    fetchBanners();
  }, []);

  const toggleStatus = (id) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner.id === id
          ? { ...banner, status: banner.status === 'Xuất bản' ? 'Chưa xuất bản' : 'Xuất bản' }
          : banner
      )
    );
  };

  const handleTrashClick = () => {
    navigate('/admin/banner/trash'); 
  };

  const handleShowBanner = (id) => {
    navigate(`/admin/banner/show/${id}`);
  };

  const handleEditBanner = (id) => {
    navigate(`/admin/banner/edit/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await BannerService.store(bannerData);
        if (response && response.message) {
            alert(response.message);
            const updatedBanners = await BannerService.index();
            setBanners(updatedBanners.banners);
            setBannerData({ name: '', link: '', sort_order: 1, position: 'slideshow', status: 1 });
        } else {
            console.error('Response structure error:', response);
        }
    } catch (error) {
        console.error('Error adding banner:', error);
        alert('Error adding banner: ' + error.response?.data?.message || 'An unexpected error occurred.');
    }
};



  return (
    <div className="flex p-6 bg-gray-100">
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-md mr-4">
        <h2 className="text-xl font-bold mb-4">Thêm Banner Mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Tên Banner</label>
            <input
              type="text"
              value={bannerData.name}
              onChange={(e) => setBannerData({ ...bannerData, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập tên banner"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Liên Kết</label>
            <input
              type="text"
              value={bannerData.link}
              onChange={(e) => setBannerData({ ...bannerData, link: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập liên kết"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Sắp Xếp</label>
            <input
              type="number"
              value={bannerData.sort_order}
              onChange={(e) => setBannerData({ ...bannerData, sort_order: Number(e.target.value) })}
              min="1"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Nhập thứ tự"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Vị Trí</label>
            <select
              value={bannerData.position}
              onChange={(e) => setBannerData({ ...bannerData, position: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="slideshow">Slideshow</option>
              <option value="ads">Ads</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">Trạng Thái</label>
            <select
              value={bannerData.status}
              onChange={(e) => setBannerData({ ...bannerData, status: Number(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value={1}>Xuất bản</option>
              <option value={0}>Chưa xuất bản</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Thêm mới
          </button>
        </form>
      </div>

      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Danh Sách Banner</h2>
          <span className="text-red-500 cursor-pointer" onClick={handleTrashClick}>
            Thùng rác
          </span>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border"></th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Hình Ảnh</th>
              <th className="p-2 border">Vị Trí</th>
              <th className="p-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {banners.length > 0 ? (
              banners.map((banner) => (
                <tr key={banner.id || banner.name} className="hover:bg-gray-100">
                  <td className="p-2 border">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2 border">{banner.id}</td>
                  <td className="p-2 border">{banner.name}</td>
                  <td className="p-2 border">
                    <img
                      src={banner.image}
                      alt={banner.name}
                      className="w-24 h-16 object-cover"
                    />
                  </td>
                  <td className="p-2 border">{banner.position}</td>
                  <td className="p-8 border flex space-x-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleShowBanner(banner.id)}
                    >
                      <FaEye />
                    </button>
                    <button className="text-yellow-500 hover:underline" onClick={() => handleEditBanner(banner.id)}>
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:underline">
                      <FaTrash />
                    </button>
                    <button
                      className={`flex items-center ${
                        banner.status === 'Xuất bản' ? 'text-green-500' : 'text-red-500'
                      }`}
                      onClick={() => toggleStatus(banner.id)}
                    >
                      {banner.status === 'Xuất bản' ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  Không có banner nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerPage;
