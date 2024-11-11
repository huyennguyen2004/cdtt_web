import React, { useState, useEffect } from 'react'; 
import { FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import CategoryService from './../../services/CategoryService';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]); 
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
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.index(); 
        setCategories(response.categories); 
      } catch (error) {
        console.error('Failed to fetch category:', error);
      }
    };
    fetchCategories();
  }, []);
  
  const toggleStatus = (id) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === id
          ? { ...category, status: category.status === 1 ? 0 : 1 }
          : category
      )
    );
  };

  const handleTrashClick = () => {
    navigate('/admin/category/trash'); 
  };

  const handleShowCategory = (id) => {
    navigate(`/admin/category/show/${id}`);
  };
  const handleEditCategory = (id) => {
    navigate(`/admin/category/edit/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CategoryService.store(categoryData);
      if (response && response.message) {
        alert(response.message);
        setCategories((prevCategories) => [...prevCategories, response.category]);
        setCategoryData({
          name: '',
          slug: '',
          sort_order: 1,
          description: '',
          status: 1,
          parent_id: '',
        });
      } else {
        console.error('Response structure error:', response);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  
  const handleDeleteCategory = async (id) => {
    try {
      await CategoryService.delete(id); 
      setCategories((prevcategorys) => prevcategorys.filter((category) => category.id !== id)); 
      alert("Category đã được chuyển vào thùng rác");
      const response = await CategoryService.index(); 
      setCategories(response.categories); 
    } catch (error) {
      console.error("Error moving category to trash:", error);
    }
  };

  
  return (
    <div className="flex p-6 bg-gray-100">
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-md mr-4">
        <h2 className="text-xl font-bold mb-4">Thêm Category Mới</h2>
        <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <label className="block mb-1">Tên Category</label>
    <input
      type="text"
      className="w-full p-2 border border-gray-300 rounded"
      placeholder="Nhập tên category"
      value={categoryData.name}
      onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
    />
  </div>
  <div className="mb-4">
    <label className="block mb-1">Slug</label>
    <input
      type="text"
      className="w-full p-2 border border-gray-300 rounded"
      placeholder="Nhập slug"
      value={categoryData.slug}
      onChange={(e) => setCategoryData({ ...categoryData, slug: e.target.value })}
    />
  </div>
  <div className="mb-4">
    <label className="block mb-1">Parent ID</label>
    <input
      type="text"
      className="w-full p-2 border border-gray-300 rounded"
      placeholder="Nhập parent ID"
      value={categoryData.parent_id}
      onChange={(e) => setCategoryData({ ...categoryData, parent_id: e.target.value })}
    />
  </div>
  <div className="mb-4">
    <label className="block mb-1">Sắp Xếp</label>
    <input
      type="number"
      min="1"
      className="w-full p-2 border border-gray-300 rounded"
      placeholder="Nhập thứ tự"
      value={categoryData.sort_order}
      onChange={(e) => setCategoryData({ ...categoryData, sort_order: e.target.value })}
    />
  </div>
  <div className="mb-4">
    <label className="block mb-1">Mô Tả</label>
    <textarea
      className="w-full p-2 border border-gray-300 rounded"
      placeholder="Nhập mô tả"
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
  <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
    Thêm mới
  </button>
</form>

      </div>

      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Danh Sách Category</h2>
          <span className="text-red-500 cursor-pointer" onClick={handleTrashClick}>Thùng rác</span>
        </div>

        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border"></th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Parent ID</th>
              <th className="p-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-100">
                  <td className="p-2 border">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2 border">{category.id}</td>
                  <td className="p-2 border">{category.name}</td>
                  <td className="p-2 border">{category.slug}</td>
                  <td className="p-2 border">{category.parent_id === 0 ? 'Không' : category.parent_id}</td>
                  <td className="p-8 border flex space-x-2">
                    <button className="text-blue-500 hover:underline" onClick={() => handleShowCategory(category.id)}>
                      <FaEye />
                    </button>
                    <button className="text-yellow-500 hover:underline" onClick={()=>handleEditCategory(category.id)}>
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:underline" onClick={()=>handleDeleteCategory(category.id)}>
                      <FaTrash />
                    </button>
                    <button 
                      className={`flex items-center ${category.status === 1 ? 'text-green-500' : 'text-red-500'}`}
                      onClick={() => toggleStatus(category.id)}
                    >
                      {category.status === 1 ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">Không có category nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPage;
