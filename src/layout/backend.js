import React, { useState } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import RouterBackend from '../route/RouterBackend';
import { 
  FaHome, 
  FaTag, 
  FaThList, 
  FaImage, 
  FaShoppingCart, 
  FaClipboardList, 
  FaComments, 
  FaUser, 
  FaBars, 
  FaChevronDown,
  FaCog, 
  FaSearch, 
  FaBell, 
  FaSignOutAlt, 
  FaFlag
} from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6';

const LayoutBackend = () => {
  const element = useRoutes(RouterBackend);
  const navigate = useNavigate();
  const [isProductOpen, setIsProductOpen] = useState(false); 

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4 flex items-center">
          <img 
            src="/ad.png" 
            alt="Admin Avatar" 
            className="w-16 h-16 rounded-full mr-4 cursor-pointer" 
            onClick={() => navigate('/admin')}
          />
          <h1 className="text-xl font-bold">Administrator</h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="px-4 py-2 hover:bg-yellow-400">
              <button onClick={() => handleNavigate('/admin')} className="flex items-center w-full">
                <FaHome className="mr-2" /> Dashboard
              </button>
            </li>

            <li className="px-4 py-2 hover:bg-yellow-400">
              <button
                className="flex items-center w-full"
                onClick={() => setIsProductOpen(!isProductOpen)}
              >
                <FaShoppingCart className="mr-2" /> Product
                <FaChevronDown className={`ml-auto transition-transform ${isProductOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProductOpen && (
                <ul className="z-index left-0 top-full bg-gray-800 text-white w-full shadow-lg">
                  <li className="px-4 py-2 hover:bg-slate-500">
                    <button onClick={() => handleNavigate('/admin/product')} className="w-full text-left">
                      Product List
                    </button>
                  </li>
                  <li className="px-4 py-2 hover:bg-slate-500">
                    <button onClick={() => handleNavigate('/admin/product_sale')} className="w-full text-left">
                      Product Sale
                    </button>
                  </li>
                  <li className="px-4 py-2 hover:bg-slate-500">
                    <button onClick={() => handleNavigate('/admin/product_store')} className="w-full text-left">
                      Product Store
                    </button>
                  </li>
                </ul>
              )}
            </li>
            <li className="px-4 py-2 hover:bg-yellow-400">
              <button onClick={() => handleNavigate('/admin/order')} className="flex items-center w-full">
                <FaClipboardList className="mr-2" /> Order List
              </button>
            </li>
            <li className="px-4 py-2 hover:bg-yellow-400">
              <button onClick={() => handleNavigate('/admin/category')} className="flex items-center w-full">
                <FaThList className="mr-2" /> Category
              </button>
            </li>
            <li className="px-4 py-2 hover:bg-yellow-400">
              <button onClick={() => handleNavigate('/admin/banner')} className="flex items-center w-full">
                <FaImage className="mr-2" /> Banner
              </button>
            </li>
            <li className="px-4 py-2 hover:bg-yellow-400">
              <button onClick={() => handleNavigate('/admin/brand')} className="flex items-center w-full">
                <FaTag className="mr-2" /> Brand
              </button>
            </li>

            <li className="px-4 py-2 hover:bg-yellow-400">
              <button onClick={() => handleNavigate('/admin/topic')} className="flex items-center w-full">
                <FaFlag className="mr-2" /> Topic
              </button>
            </li>
            <li className="px-4 py-2 hover:bg-yellow-400">
              <button onClick={() => handleNavigate('/admin/post')} className="flex items-center w-full">
                <FaNoteSticky className="mr-2" /> Post
              </button>
            </li>
            <li className="px-4 py-2 hover:bg-yellow-400">
              <button onClick={() => handleNavigate('/admin/contact')} className="flex items-center w-full">
                <FaComments className="mr-2" /> Contact
              </button>
            </li>
            <li className="px-4 py-2 hover:bg-yellow-400">
              <button onClick={() => handleNavigate('/admin/users')} className="flex items-center w-full">
                <FaUser className="mr-2" /> Users
              </button>
            </li>
            <li className="px-4 py-2 hover:bg-yellow-400">
              <button onClick={() => handleNavigate('/admin/menu')} className="flex items-center w-full">
                <FaBars className="mr-2" /> Menu
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center flex-grow mx-4">
            <div className="relative flex-grow max-w-md">
              <FaSearch className="absolute left-3 top-2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded w-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600 hover:text-gray-800 cursor-pointer" /> 
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <FaSignOutAlt className="mr-2" /> Đăng xuất
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-100">
          {element}
        </main>

        <footer className="bg-white text-center p-4 shadow">
          <p className="text-gray-600">&copy; 2024 Admin</p>
        </footer>
      </div>
    </div>
  );
};

export default LayoutBackend;
