import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import OrderListService from '../../services/OrderListService';

const OrderPage = () => {
  const navigate = useNavigate(); 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderListService.index();
        console.log('API Response:', response); 
        setOrders(response); 
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    try {
      await OrderListService.delete(id);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  const handleEyeClick = (orderId) => {
    navigate(`/admin/order/show/${orderId}`); 
  };
  
  const handleTrashClick = () => {
    navigate('/admin/order/trash'); 
  };

  return (
    <div className="flex p-6 bg-gray-100">
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Danh Sách Đơn Hàng</h2>
          <button className="bg-red-500 cursor-pointer" onClick={handleTrashClick}>Thùng rác</button>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border"></th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên Khách Hàng</th>
              <th className="p-2 border">Số Điện Thoại</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Địa Chỉ</th>
              <th className="p-2 border">Ghi Chú</th>
              <th className="p-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="p-2 border">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2 border">{order.id}</td>
                  <td className="p-2 border">{order.name}</td>
                  <td className="p-2 border">{order.phone}</td>
                  <td className="p-2 border">{order.email}</td>
                  <td className="p-2 border">{order.address}</td>
                  <td className="p-2 border">{order.note}</td>
                  <td className="p-5 border flex space-x-2">
                    <button className="text-blue-500 hover:underline"onClick={() => handleEyeClick(order.id)}>
                      <FaEye /> 
                    </button>
                    <button className="text-red-500 hover:underline" onClick={() => deleteOrder(order.id)}>
                      <FaTrash /> 
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center">Không có đơn hàng nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
