import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaUndo } from 'react-icons/fa'; 
import CategoryService from '../../../services/CategoryService';

const TrashCategory = () => {
  const navigate = useNavigate(); 
  const [trashedCategories, setTrashedCategories] = useState([]);

  useEffect(() => {
    const fetchTrashedCategories = async () => {
      try {
        const response = await CategoryService.trash();
        setTrashedCategories(response.data.category);
      } catch (error) {
        console.error("Failed to fetch trashed categories:", error);
      }
    };
  
    fetchTrashedCategories();
  }, []);

  const handleDestroy = async (id) => {
    try {
      await CategoryService.destroy(id);
      setTrashedCategories(trashedCategories.filter(category => category.id !== id));
    } catch (error) {
      console.error("Failed to permanently delete category:", error);
    }
  };
  
  const handleRestore = async (id) => {
    try {
      await CategoryService.restore(id);
      setTrashedCategories(trashedCategories.filter(category => category.id !== id)); 
    } catch (error) {
      console.error("Failed to restore category:", error);
    }
  };
  
  return (
    <div className="container mx-auto">
      <div className="my-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" 
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200">ID</th>
            <th className="px-6 py-3 border-b border-gray-200">Tên</th>
            <th className="px-6 py-3 border-b border-gray-200">Slug</th>
            <th className="px-6 py-3 border-b border-gray-200">ParentID</th>
            <th className="px-6 py-3 border-b border-gray-200">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {trashedCategories && trashedCategories.length > 0 ? (
            trashedCategories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 border-b border-gray-200">{category.id}</td>
                <td className="px-6 py-4 border-b border-gray-200">{category.name}</td>
                <td className="px-6 py-4 border-b border-gray-200">{category.slug}</td>
                <td className="px-6 py-4 border-b border-gray-200">{category.parent_id}</td>
                <td className="px-6 py-4 border-b border-gray-200 flex space-x-2">
                  <button onClick={() => handleRestore(category.id)} className="text-green-600 hover:underline flex items-center">
                    <FaUndo className="mr-1" /> 
                  </button>
                  <button onClick={() => handleDestroy(category.id)} className="text-red-600 hover:underline flex items-center">
                    <FaTrash className="mr-1" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">No trashed categories found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrashCategory;
