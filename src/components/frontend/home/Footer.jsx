import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; 
import MenuService from '../../../services/MenuService';

const Footer = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const position = "footermenu"; // Đảm bảo vị trí là 'footermenu'
        const response = await MenuService.index(position);
        console.log('Fetched menu:', response);
        if (response) {
          const footerMenuItems = response.filter(item => item.position === 'footermenu');
          setMenu(footerMenuItems); 
        }
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };
    fetchMenu();
  }, []);

  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div>
            <h5 className="border-2 border-yellow-400 bg-yellow-400 text-black p-2 inline-block rounded mb-4">
              Thông tin liên hệ
            </h5>
            <p>Email: support@example.com</p>
            <p>Điện thoại: 123-456-7890</p>
          </div>

          <div>
            <h5 className="border-2 border-yellow-400 bg-yellow-400 text-black p-2 inline-block rounded mb-4">
              Liên kết
            </h5>
            <ul>
            <li><a href="/about" className="text-white hover:text-yellow-300">Giới thiệu</a></li>
              {menu.map(item => (
                <li key={item.id}>
                  <a href={item.link} className="text-white hover:text-yellow-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="border-2 border-yellow-400 bg-yellow-400 text-black p-2 inline-block rounded mb-4">
              Mạng xã hội
            </h5>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaFacebook size={30} className="hover:text-yellow-300" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaTwitter size={30} className="hover:text-yellow-300" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaInstagram size={30} className="hover:text-yellow-300" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h5 className="border-2 border-yellow-400 bg-yellow-400 text-black p-2 inline-block rounded mb-4">
              Tham gia nhận tin tức
            </h5>
            <form className="w-full max-w-sm">
              <input 
                type="email" 
                placeholder="Nhập email của bạn" 
                className="w-full p-2 mb-2 rounded text-black" 
              />
              <button className="w-full bg-yellow-400 text-black p-2 rounded hover:bg-yellow-300">
                Tham gia
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8">
          <hr className="border-t-2 border-white-500 w-100 mx-auto" />
        </div>

        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} Công ty TNHH XYZ. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
