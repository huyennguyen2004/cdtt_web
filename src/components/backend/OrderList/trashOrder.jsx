import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaUndo } from 'react-icons/fa';
import OrderListService from '../../../services/OrderListService';

const TrashOrder = () => {
  const navigate = useNavigate();
  const [trashedOrders, setTrashedOrders] = useState([]);

  useEffect(() => {
    const fetchTrashedOrders = async () => {
      try {
        const response = await OrderListService.trash();
        setTrashedOrders(response.orders); 
      } catch (error) {
        console.error('Error fetching trashed orders:', error);
      }
    };
    fetchTrashedOrders();
  }, []);

  const handleRestore = async (id) => {
    try {
      await OrderListService.restore(id);
      setTrashedOrders(trashedOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error('Error restoring order:', error);
    }
  };

  const handleDestroy = async (id) => {
    try {
      await OrderListService.destroy(id);
      setTrashedOrders(trashedOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error('Error permanently deleting order:', error);
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
            <th className="px-6 py-3 border-b border-gray-200">Tên khách hàng</th>
            <th className="px-6 py-3 border-b border-gray-200">Số điện thoại</th>
            <th className="px-6 py-3 border-b border-gray-200">Email</th>
            <th className="px-6 py-3 border-b border-gray-200">Địa chỉ</th>
            <th className="px-6 py-3 border-b border-gray-200">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {trashedOrders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 border-b border-gray-200">{order.id}</td>
              <td className="px-6 py-4 border-b border-gray-200">{order.name}</td>
              <td className="px-6 py-4 border-b border-gray-200">{order.phone}</td>
              <td className="px-6 py-4 border-b border-gray-200">{order.email}</td>
              <td className="px-6 py-4 border-b border-gray-200">{order.address}</td>
              <td className="px-6 py-4 border-b border-gray-200 flex space-x-2">
                <button onClick={() => handleRestore(order.id)} className="text-green-600 hover:underline flex items-center">
                  <FaUndo className="mr-1" /> Khôi phục
                </button>
                <button onClick={() => handleDestroy(order.id)} className="text-red-600 hover:underline flex items-center">
                  <FaTrash className="mr-1" /> Xóa vĩnh viễn
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrashOrder;
