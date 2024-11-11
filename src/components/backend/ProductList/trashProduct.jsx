import React, { useEffect, useState } from 'react';
import { FaUndo, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProductListService from '../../../services/ProductListService';

const TrashProduct = () => {
  const [trashedProducts, setTrashedProducts] = useState([]);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  // Fetch danh sách sản phẩm trong thùng rác
  useEffect(() => {
    const fetchTrashedProducts = async () => {
      try {
        const response = await ProductListService.trash();
        setTrashedProducts(response.products);
      } catch (error) {
        console.error('Failed to fetch trashed products:', error);
      }
    };
    fetchTrashedProducts();
  }, []);

  // Khôi phục sản phẩm
  const handleRestore = async (id) => {
    try {
      await ProductListService.restore(id);
      setTrashedProducts(trashedProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Failed to restore product:', error);
    }
  };

  // Xóa vĩnh viễn sản phẩm
  const handleDestroy = async (id) => {
    try {
      await ProductListService.destroy(id);
      setTrashedProducts(trashedProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  // Hàm quay lại trang sản phẩm
  const handleBackToProducts = () => {
    navigate('/admin/product'); // Điều hướng về trang danh sách sản phẩm
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Thùng Rác Sản Phẩm</h2>

        {/* Nút Quay lại trang sản phẩm */}
        <button
          onClick={handleBackToProducts}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Quay lại
        </button>

        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200">ID</th>
              <th className="px-6 py-3 border-b border-gray-200">Tên</th>
              <th className="px-6 py-3 border-b border-gray-200">Hình</th>
              <th className="px-6 py-3 border-b border-gray-200">Danh mục</th>
              <th className="px-6 py-3 border-b border-gray-200">Thương hiệu</th>
              <th className="px-6 py-3 border-b border-gray-200">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {trashedProducts.length > 0 ? (
              trashedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 border-b border-gray-200">{product.id}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{product.name}</td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200">{product.category}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{product.brand}</td>
                  <td className="px-6 py-4 border-b border-gray-200 flex space-x-2">
                    {/* Nút Khôi phục */}
                    <button onClick={() => handleRestore(product.id)} className="text-green-600 hover:underline flex items-center">
                      <FaUndo className="mr-1" /> Khôi phục
                    </button>
                    {/* Nút Xóa vĩnh viễn */}
                    <button onClick={() => handleDestroy(product.id)} className="text-red-600 hover:underline flex items-center">
                      <FaTrash className="mr-1" /> Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">Không có sản phẩm nào trong thùng rác.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrashProduct;
