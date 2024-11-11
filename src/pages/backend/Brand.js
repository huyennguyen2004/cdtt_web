import React, { useState, useEffect } from 'react';
import { FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; 
import BrandService from './../../services/BrandService';

const BrandPage = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [brandData, setBrandData] = useState({
    name: '',
    slug: '',
    description: '',
    status: 1,
  });
  
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await BrandService.index(); 
        setBrands(response); 
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };
    fetchBrands();
  }, []);

  const toggleStatus = (id) => {
    setBrands((prevBrands) =>
      prevBrands.map((brand) =>
        brand.id === id
          ? { ...brand, status: brand.status === "Xuất bản" ? "Chưa xuất bản" : "Xuất bản" }
          : brand
      )
    );
  };

  const handleTrashClick = () => {
    navigate('/admin/brand/trash'); 
  };

  const deleteBrand = (id) => {
    setBrands((prevBrands) => prevBrands.filter((brand) => brand.id !== id));
  };

  const handleShowBrand = (id) => {
    navigate(`/admin/brand/show/${id}`);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await BrandService.store(brandData);
      if (response && response.message) {
        alert(response.message);
        const brandsResponse = await BrandService.index(); 
        setBrands(brandsResponse); 
        setBrandData({ name: '', slug: '', description: '', status: 1 }); 
      } else {
        console.error('Response structure error:', response);
      }
    } catch (error) {
      console.error("Error adding brand:", error);
    }
  };

  const handleEditBrand = (id) => {
    navigate(`/admin/brand/edit/${id}`);
  };

  return (
    <div className="flex p-6 bg-gray-100">
      <div className="w-1/3 bg-white p-4 rounded-lg shadow-md mr-4">
        <h2 className="text-xl font-bold mb-4">Thêm Brand Mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Tên Thương Hiệu</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded" 
              placeholder="Nhập tên thương hiệu"
              value={brandData.name}
              onChange={(e) => setBrandData({ ...brandData, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Slug</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 rounded" 
              placeholder="Nhập slug" 
              value={brandData.slug}
              onChange={(e) => setBrandData({ ...brandData, slug: e.target.value })}
            />
          </div>
          {/* <div className="mb-4">
                        <label className="block mb-2">Hình ảnh</label>
                        <input
                            type="file"
                            onChange={(e) => setThumbnail(e.target.files)}
                            accept="image/*"
                       className="border rounded w-full p-2"
                            multiple
                            id='thumbnail'
                        />
                    </div> */}
          <div className="mb-4">
            <label className="block mb-1">Mô Tả</label>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded" 
              placeholder="Nhập mô tả" 
              rows="3"
              value={brandData.description}
              onChange={(e) => setBrandData({ ...brandData, description: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Trạng Thái</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={brandData.status}
              onChange={(e) => setBrandData({ ...brandData, status: e.target.value })}
            >
              <option value="1">Xuất bản</option>
              <option value="0">Chưa xuất bản</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Thêm mới</button>
        </form>
      </div>

      <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Danh Sách Brand</h2>
          <span className="text-red-500 cursor-pointer" onClick={handleTrashClick}>Thùng rác</span>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border"></th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Tên</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Hình</th>
              <th className="p-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
  {brands.map((brand) => (
    <tr key={`${brand.id}-${brand.slug}`} className="hover:bg-gray-100">
      <td className="p-2 border">
        <input type="checkbox" />
      </td>
      <td className="p-2 border">{brand.id}</td>
      <td className="p-2 border">{brand.name}</td>
      <td className="p-2 border">{brand.slug}</td>
      <td className="p-2 border">
      <img src={`http://localhost:8000/${brand.thumbnail}`} alt={brand.name} width="100"/>

</td>

      <td className="p-8 border flex space-x-2">
        <button className="text-blue-500 hover:underline" onClick={() => handleShowBrand(brand.id)}>
          <FaEye />
        </button>
        <button className="text-yellow-500 hover:underline"onClick={() => handleEditBrand(brand.id)}>
          <FaEdit />
        </button>
        <button className="text-red-500 hover:underline" onClick={() => deleteBrand(brand.id)}>
          <FaTrash />
        </button>
        <button 
          className={`flex items-center ${brand.status === "Xuất bản" ? 'text-green-500' : 'text-red-500'}`}
          onClick={() => toggleStatus(brand.id)}
        >
          {brand.status === "Xuất bản" ? <FaToggleOn /> : <FaToggleOff />}
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

export default BrandPage;
