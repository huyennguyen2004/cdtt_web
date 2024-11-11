import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash, FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.index(); 
        setUsers(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized: Redirecting to login');
          navigate('/login'); 
        } else {
          console.error('Failed to fetch Users:', error);
        }
      }
    };
  
    fetchUsers();
  }, [navigate]);
  
  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((users) => users.id !== id));
  };

  const handleShowUser = (id) => {
    navigate(`/admin/users/show/${id}`);
  };

  const handleAddUser = () => {
    navigate('/admin/users/store'); 
  };

  const toggleStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((users) =>
        users.id === id
          ? { ...users, status: users.status === "Xuất bản" ? "Chưa xuất bản" : "Xuất bản" }
          : users
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh Sách Người dùng</h2>
        <div className="flex justify-end">
  <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500"onClick={() => handleAddUser()}>
    Thêm thành viên
  </button>
  <span className="text-red-500 cursor-pointer">Thùng rác</span>
</div>
        
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border"></th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Mật Khẩu</th>
              <th className="p-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {users.map((users) => (
              <tr key={users.id} className="hover:bg-gray-100">
                <td className="p-2 border">
                  <input type="checkbox" />
                </td>
                <td className="p-2 border">{users.id}</td>
                <td className="p-2 border">{users.name}</td>
                <td className="p-2 border">{users.email}</td>
                <td className="p-2 border">{users.password}</td>
                <td className="p-5 border flex space-x-2">
                  <button className="text-blue-500 hover:underline" onClick={() => handleShowUser(users.id)}>
                    <FaEye />
                  </button>
                  <button className="text-yellow-500 hover:underline">
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(users.id)} >
                    <FaTrash />
                  </button>
                  <button
                    className={`flex items-center ${users.status === "Xuất bản" ? 'text-green-500' : 'text-red-500'}`}
                    onClick={() => toggleStatus(users.id)}
                  >
                    {users.status === "Xuất bản" ? <FaToggleOn /> : <FaToggleOff />}
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

export default UsersPage;
