import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import ProductStoreService from '../../services/ProductStoreService';

const ProductStorePage = () => {
  const [product_stores, setProductStores] = useState([]);
  const [trashedproduct_stores, setTrashedProductStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductStores = async () => {
      try {
        const data = await ProductStoreService.index(); // Gọi dịch vụ để lấy dữ liệu
        console.log('Fetched product stores:', data);

        // Kiểm tra cấu trúc phản hồi
        if (data && data.status === true && Array.isArray(data.productstores)) {
          setProductStores(data.productstores); // Cập nhật state với dữ liệu nhận được
        } else {
          console.error('Invalid response structure:', data);
        }
      } catch (error) {
        console.error('Failed to fetch product stores:', error);
      }
    };

    fetchProductStores(); 
  }, []);

  const toggleStatus = (id) => {
    setProductStores((prevProductStores) =>
      prevProductStores.map((product_store) =>
        product_store.id === id
          ? { ...product_store, status: product_store.status === "Xuất bản" ? "Chưa xuất bản" : "Xuất bản" }
          : product_store
      )
    );
  };

  const handleAddProductStore = () => {
    navigate('/admin/product_store/create'); 
  };

  const handleTrashClick = () => {
    navigate('/admin/product_store/trash');
  };

  const handleShowProductStore = (id) => {
    navigate(`/admin/product_store/show/${id}`); 
  };

  const handleEditProductStore = (id) => {
    navigate(`/admin/product_store/edit/${id}`);
  };

  const handleDeleteProductStore = (id) => {
    const product_storeToTrash = product_stores.find((product_store) => product_store.id === id); 
    if (product_storeToTrash) {
      setTrashedProductStores((prevTrashed) => [...prevTrashed, product_storeToTrash]); 
      setProductStores((prevProductStores) => prevProductStores.filter((product_store) => product_store.id !== id)); 
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <span
        className="text-red-500 cursor-pointer flex justify-end"
        onClick={handleTrashClick}
      >
        Thùng rác
      </span>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-end">
          <button 
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500"
            onClick={handleAddProductStore}
          >
            Nhập sản phẩm
          </button>
        </div>
        <h2 className="text-xl font-bold mb-2">Kho sản phẩm</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border"></th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên Sản Phẩm</th>
              <th className="p-2 border">Giá gốc</th>
              <th className="p-2 border">Số lượng</th>
              <th className="p-2 border">Ngày nhập</th>
              <th className="p-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {product_stores.map((product_store) => (
              <tr key={product_store.id} className="hover:bg-gray-100">
                <td className="p-2 border">
                  <input type="checkbox" />
                </td>
                <td className="p-2 border">{product_store.id}</td>
                <td className="p-2 border">{product_store.name}</td>
                <td className="p-2 border">{product_store.priceroot}</td>
                <td className="p-2 border">{product_store.qty}</td>
                <td className="p-2 border">{product_store.dateimport}</td>
                <td className="p-9 border flex space-x-2 justify-center items-center">
                  <button className="text-blue-500 hover:underline" onClick={() => handleShowProductStore(product_store.id)}>
                    <FaEye />
                  </button>
                  <button className="text-yellow-500 hover:underline" onClick={() => handleEditProductStore(product_store.id)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDeleteProductStore(product_store.id)}>
                    <FaTrash />
                  </button>
                  <button
                    className={`flex items-center ${product_store.status === "Xuất bản" ? 'text-green-500' : 'text-red-500'}`}
                    onClick={() => toggleStatus(product_store.id)}
                  >
                    {product_store.status === "Xuất bản" ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductStorePage;
