import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductListService from '../../../services/ProductListService';

const EditProduct = ({ categories = [], brands = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    category_id: '',
    brand_id: '',
    description: '',
    image: '',
    pricebuy: '',
    status: '',
  });

  const fetchProduct = async () => {
    try {
      const response = await ProductListService.edit(id);
      setProductData(response.product);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setProductData({ ...productData, image: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    try {
      await ProductListService.update(formData, id);
      fetchProduct(); 
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Chỉnh Sửa Sản Phẩm</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block mb-2">Tên sản phẩm</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>
      
          <div className="mb-4">
            <label className="block mb-2">Danh mục</label>
            <select
              name="category_id"
              value={productData.category_id}
              onChange={handleChange}
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Thương hiệu</label>
            <select
              name="brand_id"
              value={productData.brand_id}
              onChange={handleChange}
            >
              <option value="">Chọn thương hiệu</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Mô tả</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Hình ảnh hiện tại</label>
            {productData.image && (
              <img
                src={URL.createObjectURL(productData.image)} 
                alt="Product"
                className="w-32 h-32 object-cover mb-2"
              />
            )}
            <label className="block mb-2">Chọn hình ảnh mới</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="border rounded w-full p-2"
            />
            {productData.image && !productData.image.name && ( 
              <img
                src={productData.image} 
                alt="Product"
                className="w-32 h-32 object-cover mb-2"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Giá bán</label>
            <input
              type="number"
              name="pricebuy"
              value={productData.pricebuy}
              onChange={handleChange}
              required
              className="border rounded w-full p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Trạng thái</label>
            <select
              name="status"
              value={productData.status}
              onChange={handleChange}
              className="border rounded w-full p-2"
            >
              <option value="Xuất bản">Xuất bản</option>
              <option value="Chưa xuất bản">Chưa xuất bản</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4">Cập nhật</button>
          <button 
            onClick={() => navigate('/admin/product')}
            className="mt-4 ml-4 bg-gray-500 text-white rounded py-2 px-4"
          >
            Quay lại
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
