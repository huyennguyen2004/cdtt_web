import React, { useState, useEffect } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import OrderListService from '../../../services/OrderListService';

const ShowOrder = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await OrderListService.show(id);
        setOrderDetails(response.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setOrderDetails([]);
      }
    };
    fetchOrderDetails();
  }, [id]);

  return (
    <div className="flex p-6 bg-gray-100">
      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên sản phẩm</th>
              <th className="p-2 border">Số lượng</th>
              <th className="p-2 border">Giá tiền</th>
              <th className="p-2 border">Giảm giá</th>
              <th className="p-2 border">Người đặt hàng</th>
              <th className="p-2 border">Số điện thoại</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Địa chỉ</th>
              <th className="p-2 border">Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((order, index) => (
              <tr key={index}>
                <td className="p-2 border">{order.order_id}</td>
                <td className="p-2 border">{order.product_name}</td>
                <td className="p-2 border">{order.qty}</td>
                <td className="p-2 border">{order.price}</td>
                <td className="p-2 border">{order.discount}</td>
                <td className="p-2 border">{order.name}</td>
                <td className="p-2 border">{order.phone}</td>
                <td className="p-2 border">{order.email}</td>
                <td className="p-2 border">{order.address}</td>
                <td className="p-2 border">{order.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pt-4 flex items-center justify-center ">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300" 
            onClick={() => navigate(-1)}
          >
            Quay lại
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ShowOrder;
