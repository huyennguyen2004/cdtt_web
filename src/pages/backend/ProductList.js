import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import ProductListService from '../../services/ProductListService';
const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductListService.index();
        console.log('Fetched products:', response);
        setProducts(response.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const toggleStatus = async (id) => {
    const productToToggle = products.find((product) => product.id === id);
    if (productToToggle) {
      const newStatus = productToToggle.status === "Xuất bản" ? "Chưa xuất bản" : "Xuất bản";
      try {
        await ProductListService.updateStatus(id, newStatus);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? { ...product, status: newStatus } : product
          )
        );
      } catch (error) {
        console.error('Failed to update product status:', error);
      }
    }
  };

  const handleAddProduct = () => {
    navigate('/admin/product/create');
  };

  const handleTrashClick = () => {
    navigate('/admin/product/trash');
  };

  const handleShowProduct = (id) => {
    navigate(`/admin/product/show/${id}`);
  };

  const handleEditProduct = (id) => {
    navigate(`/admin/product/edit/${id}`);
  };

  const handleDeleteProduct = (id) => {
    const productToTrash = products.find((product) => product.id === id);
    if (productToTrash) {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <span
        className="text-red-500 cursor-pointer flex justify-end"
        onClick={handleTrashClick}
      >
        Thùng rác
      </span>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-end">
          <button
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-500"
            onClick={handleAddProduct}
          >
            Thêm Sản Phẩm
          </button>
        </div>
        <h2 className="text-xl font-bold mb-2">Danh Sách Sản Phẩm</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border"></th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Hình Ảnh</th>
              <th className="p-2 border">Tên Sản Phẩm</th>
              <th className="p-2 border">Slug</th>
              <th className="p-2 border">Danh mục</th>
              <th className="p-2 border">Thương hiệu</th>
              <th className="p-2 border">Mô Tả</th>
              <th className="p-9 border flex space-x-2 justify-center items-center">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="p-2 border">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2 border">{product.id}</td>

                  <td className="p-2 border">
  {product.images && product.images.length > 0 ? (
    <img className="w-full" src={product.images[0].thumbnail} alt="" />
  ) : (
    <span>No image</span>
  )}
</td>

                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.slug}</td>
                  <td className="p-2 border">{product.catname || "Chưa có danh mục"}</td>
                  <td className="p-2 border">{product.brandname || "Chưa có thương hiệu"}</td>
                  <td className="p-2 border">{product.description}</td>
                  <td className="p-9 border flex space-x-2 justify-center items-center">
                    <button className="text-blue-500 hover:underline" onClick={() => handleShowProduct(product.id)}>
                      <FaEye />
                    </button>
                    <button className="text-yellow-500 hover:underline" onClick={() => handleEditProduct(product.id)}>
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:underline" onClick={() => handleDeleteProduct(product.id)}>
                      <FaTrash />
                    </button>
                    <button
                      className={`flex items-center ${product.status === "Xuất bản" ? 'text-green-500' : 'text-red-500'}`}
                      onClick={() => toggleStatus(product.id)}
                    >
                      {product.status === "Xuất bản" ? <FaToggleOn /> : <FaToggleOff />}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-2 text-center">Không có sản phẩm nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListPage;
