import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import UsersService from '../../../services/UserService';

const CreateUser = () => {
  const navigate = useNavigate();

  // Declare state for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [email_verified_at, setEmail_verified_at] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    console.log("Dữ liệu gửi lên:", userData);

    try {
      setLoading(true);
      const response = await UsersService.store(userData);

      if (response && response.success) {
        alert(response.message);
        navigate('/admin/users'); 
      } else {
        console.error('Cấu trúc phản hồi sai:', response);
        alert('Có lỗi xảy ra! Vui lòng thử lại.');
      }
    } catch (error) {
      console.error("Lỗi khi thêm :", error);
      if (error.response && error.response.data) {
        console.error("Lỗi xác thực:", error.response.data.errors);
        alert('Đã có lỗi xảy ra.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Thêm thành viên</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"  
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mật khẩu</label>
            <input
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded py-2 px-4 mr-2"
            disabled={loading}
          >
            {loading ? 'Đang thêm ...' : 'Thêm thành viên mới'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/users')}
            className="bg-gray-300 text-black rounded py-2 px-4"
          >
            Quay lại
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
