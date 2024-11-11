import React, { useState,useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import MenuService from '../../services/MenuService';
import { useNavigate } from 'react-router-dom'; 

const MenuPage = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await MenuService.index();
        console.log('Fetched menu:', response); 
        setMenus(response);
      } catch (error) {
        console.error('Failed to fetch menus:', error);
      }
    };

    fetchMenus();
  }, []);

  const handleDelete = (id) => {
    setMenus((prevMenus) => prevMenus.filter((menu) => menu.id !== id));
  };

 
  const toggleStatus = (id) => {
    setMenus((prevMenus) =>
      prevMenus.map((menu) =>
        menu.id === id
          ? { ...menu, status: menu.status === "active" ? "inactive" : "active" }
          : menu
      )
    );
  };

  const handleShowMenu = (id) => {
    navigate(`/admin/menu/show/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100">
     <span className="text-red-500 cursor-pointer flex justify-end">Thùng rác</span>

<div className="bg-white p-4 rounded-lg shadow-md">
<div className="flex justify-end">
  <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500">
    Thêm Menu
  </button>
</div>
<h2 className="text-xl font-bold mb-2">Danh Sách Menu</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
            <th className="p-2 border"></th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Liên Kết</th>
              <th className="p-2 border">Loại</th>
              <th className="p-2 border">Vị Trí</th>
              <th className="p-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className="hover:bg-gray-100">
                <td className="p-2 border">
                  <input type="checkbox" />
                </td>
                <td className="p-2 border">{menu.id}</td>
                <td className="p-2 border">{menu.name}</td>
                <td className="p-2 border">{menu.link}</td>
                <td className="p-2 border">{menu.type}</td>
                <td className="p-2 border">{menu.position}</td>
                <td className="p-5 border flex space-x-2">
                  <button className="text-blue-500 hover:underline" onClick={() => handleShowMenu(menu.id)}>
                    <FaEye />
                  </button>
                  <button className="text-yellow-500 hover:underline">
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(menu.id)}
                  >
                    <FaTrash />
                  </button>
                  <button 
                    className={`flex items-center ${menu.status === "active" ? 'text-green-500' : 'text-red-500'}`}
                    onClick={() => toggleStatus(menu.id)}
                  >
                    {menu.status === "active" ? <FaToggleOn /> : <FaToggleOff />}
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

export default MenuPage;
