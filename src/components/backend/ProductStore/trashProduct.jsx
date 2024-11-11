import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook useNavigate
import { FaTrash, FaUndo } from 'react-icons/fa'; // Import các icon

const Trashproduct_store = () => {
  const navigate = useNavigate(); // Khai báo useNavigate

  // Giả lập dữ liệu
  const [trashedproduct_stores, setTrashedproduct_stores] = useState([
    { id: 1, name: 'Sản phẩm A', image: 'https://via.placeholder.com/100', category: 'Danh mục 1', brand: 'Thương hiệu 1' },
    { id: 2, name: 'Sản phẩm B', image: 'https://via.placeholder.com/100', category: 'Danh mục 2', brand: 'Thương hiệu 2' },
    // Thêm các sản phẩm khác nếu cần...
  ]);

  // Hàm xử lý khôi phục sản phẩm
  const handleRestore = (id) => {
    console.log(`Khôi phục sản phẩm với id: ${id}`);
    // Logic khôi phục có thể cần thêm vào đây
  };

  // Hàm xử lý xóa hoàn toàn sản phẩm
  const handleDestroy = (id) => {
    console.log(`Xóa hoàn toàn sản phẩm với id: ${id}`);
    // Logic xóa hoàn toàn có thể cần thêm vào đây
  };

  // Hàm quay lại
  const handleGoBack = () => {
    navigate('/admin/product_store'); // Quay lại trang sản phẩm
  };

  return (
    <div className="container mx-auto">
      <div className="my-4">
        <button onClick={handleGoBack} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded">
          Quay lại
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200">ID</th>
            <th className="px-6 py-3 border-b border-gray-200">Tên</th>
            <th className="px-6 py-3 border-b border-gray-200">Giá gốc</th>
            <th className="px-6 py-3 border-b border-gray-200">Số lượng</th>
            <th className="px-6 py-3 border-b border-gray-200">Ngày nhập</th>
            <th className="px-6 py-3 border-b border-gray-200">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {trashedproduct_stores.map((product_store) => (
            <tr key={product_store.id}>
              <td className="px-6 py-4 border-b border-gray-200">{product_store.id}</td>
              <td className="px-6 py-4 border-b border-gray-200">{product_store.name}</td>
              <td className="px-6 py-4 border-b border-gray-200">{product_store.priceroot}</td>
              <td className="px-6 py-4 border-b border-gray-200">{product_store.qyt}</td>
              <td className="px-6 py-4 border-b border-gray-200">{product_store.dateimport}</td>
              <td className="px-6 py-4 border-b border-gray-200 flex space-x-2">
                <button onClick={() => handleRestore(product_store.id)} className="text-green-600 hover:underline flex items-center">
                  <FaUndo className="mr-1" /> 
                </button>
                <button onClick={() => handleDestroy(product_store.id)} className="text-red-600 hover:underline flex items-center">
                  <FaTrash className="mr-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trashproduct_store;
