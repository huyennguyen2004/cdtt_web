import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BrandService from '../../../services/BrandService';


const EditBrand = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [brandData, setBrandData] = useState({
    name: '',
    slug: '',
    description: '',
    status: 1,
  });

  useEffect(() => {
    const fetchbrand = async () => {
      try {
        const response = await BrandService.show(id);
        setBrandData(response);
      } catch (error) {
        console.error('Failed to fetch brand:', error);
      }
    };

    fetchbrand();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const response = await BrandService.update(brandData, id); 
        if (response.success) {
            alert('brand updated successfully!');
            navigate('/admin/brand');
        } else {
            console.error('Failed to update brand:', response.message);
        }
    } catch (error) {
        console.error('Error updating brand:', error);
    }
};


  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Edit brand</h2>
      <form onSubmit={handleUpdate}>

        <div className="mb-4">
          <label className="block mb-1">Tên brand</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={brandData.name}
            onChange={(e) => setBrandData({ ...brandData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Slug</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={brandData.slug}
            onChange={(e) => setBrandData({ ...brandData, slug: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mô Tả</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={brandData.description}
            onChange={(e) => setBrandData({ ...brandData, description: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Trạng Thái</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={brandData.status}
            onChange={(e) => setBrandData({ ...brandData, status: e.target.value })}
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

export default EditBrand;
