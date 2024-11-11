import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UsersService from '../../../services/UserService';



const Showusers = () => {
  const { id } = useParams();
  const [users, setusers] = useState(null);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchusers = async () => {
        try {
            const response = await UsersService.show(id);
            console.log(response); 
            if (response) { 
                setusers(response);
            } else {
                setError('users không tồn tại.');
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setError('Không thể tải users. Vui lòng thử lại sau.');
        }
    };
    fetchusers();
}, [id]);


  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!users) return <p className="text-center">Đang tải dữ liệu...</p>;

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Chi tiết</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-4 text-left">Thông Tin</th>
              <th className="border border-gray-300 p-4 text-left">Giá Trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-4"><strong>tên</strong></td>
              <td className="border border-gray-300 p-4">{users.name}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>ID</strong></td>
              <td className="border border-gray-300 p-4">{users.id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Password</strong></td>
              <td className="border border-gray-300 p-4">{users.password}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Remember token</strong></td>
              <td className="border border-gray-300 p-4">{users.remember_token}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Email</strong></td>
              <td className="border border-gray-300 p-4">{users.email}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Email verified at</strong></td>
              <td className="border border-gray-300 p-4">{users.email_verified_at}</td>
            </tr> 
           <tr>
              <td className="border border-gray-300 p-4"><strong>Ngày tạo</strong></td>
              <td className="border border-gray-300 p-4">{users.created_at}</td>
            </tr>
      
          </tbody>
        </table>
        <div className="mt-6 text-center">
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

export default Showusers;
