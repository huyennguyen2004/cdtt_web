import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryService from '../../../services/CategoryService';

const EditCategory = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    name: '',
    slug: '',
    parent_id: '',
    sort_order: 1,
    description: '',
    status: 1,
  });
useEffect(() => {
  const fetchCategory = async () => {
    try {
      const response = await CategoryService.show(id);
      setCategoryData(response);
    } catch (error) {
      console.error('Failed to fetch category:', error);
    }
  };

  if (id) {
    fetchCategory(); 
  }
}, [id]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await CategoryService.update(categoryData, id); 
      if (response.success) {
        alert('Category updated successfully!');
        navigate('/admin/category');
      } else {
        console.error('Failed to update category:', response.message);
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block mb-1">Tên Catgeory</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={categoryData.name}
            onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Slug</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={categoryData.slug}
            onChange={(e) => setCategoryData({ ...categoryData, slug: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Sắp Xếp</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={categoryData.sort_order}
            onChange={(e) => setCategoryData({ ...categoryData, sort_order: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Parent ID</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={categoryData.parent_id}
            onChange={(e) => setCategoryData({ ...categoryData, parent_id: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mô Tả</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={categoryData.description}
            onChange={(e) => setCategoryData({ ...categoryData, description: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Trạng Thái</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={categoryData.status}
            onChange={(e) => setCategoryData({ ...categoryData, status: e.target.value })}
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

export default EditCategory;
