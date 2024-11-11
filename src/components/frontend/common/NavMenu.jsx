import React, { useState, useEffect } from 'react';
import { FaHeart, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import CategoryService from '../../../services/CategoryService';
import MenuService from '../../../services/MenuService';

const NavMenu = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [menu, setMenu] = useState([]); 
  
  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };


  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const position = "mainmenu"; 
        const response = await MenuService.index(position); 
        console.log('Fetched menu:', response); 
        if (response) {
          const mainMenuItems = response.filter(item => item.position === 'mainmenu' && item.link !== '/category');
          setMenu(mainMenuItems); 
        }
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      if (isDropdownOpen) {
        try {
          const response = await CategoryService.index();
          console.log('Fetched categories:', response.data);
          setCategories(response.categories);
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        }
      }
    };
    fetchCategories();
  }, [isDropdownOpen]);


  return (
    <nav className="bg-blue-900">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <img src="/21.jpeg" alt="logo" className="w-40 h-40" />
        </Link>
        <ul className="flex space-x-4">
          {menu.map(item => (
            <li key={item.id}>
              <Link to={item.link} className="text-white hover:text-yellow-400 text-lg flex items-center">
                {item.link === '/favorite' && <FaHeart className="mr-2" />}
                {item.link === '/login' && <FaUser className="mr-2" />}
                {item.link === '/cart' && <FaShoppingCart className="mr-2" />}
                {item.link === '/favorite' || item.link === '/login' || item.link === '/cart' ? null : item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      
      <div className="flex items-center justify-center p-4">
        <div 
          className="relative border border-yellow-400 border-x-8 bg-yellow-400 p-3 rounded-md mr-4 mb-4"
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <span className="text-black hover:text-blue-500 cursor-pointer">
            Danh mục
          </span>
          {isDropdownOpen && (
            <ul className="absolute mt-2 bg-white shadow-lg rounded-lg z-50">
              {categories.map(category => (
                <li key={category.id} className="p-2 hover:bg-blue-600">
                  <Link to={`/category/${category.id}`} className="block text-black">
                    {category.name}
                  </Link>
                  {category.subcategories && (
                    <ul className="ml-4">
                      {category.subcategories.map(subcategory => (
                        <li key={subcategory.id} className="p-2 hover:bg-blue-400">
                          <Link to={`/category/${subcategory.id}`} className="block text-black">
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        
        <div className="flex items-center w-full max-w-3xl mb-4">
          <input type="text" className="border rounded-l-md p-3 w-full" placeholder="Tìm kiếm..." />
          <button className="bg-yellow-400 text-white p-4 rounded-r-md hover:bg-yellow-200">
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
