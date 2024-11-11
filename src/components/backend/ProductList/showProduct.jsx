import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductListService from '../../../services/ProductListService';

const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductListService.show(id);
        console.log(response);
        setProduct(response.product);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
      }
    };
    fetchProduct();
  }, [id]);
  
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!product) return <p className="text-center">Đang tải ...</p>;

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-4 text-left">Thông Tin</th>
              <th className="border border-gray-300 p-4 text-left">Giá Trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Tên sản phẩm</strong></td>
              <td className="border border-gray-300 p-4">{product.name}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Ảnh sản phẩm</strong></td>
              <td className="border border-gray-300 p-4">
                {product.images && product.images.length > 0 ? (
                  <img className="w-32 h-32 object-cover" src={product.images[0].thumbnail} alt={product.name} />
                ) : (
                  <span>No image</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>ID</strong></td>
              <td className="border border-gray-300 p-4">{product.id}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Slug</strong></td>
              <td className="border border-gray-300 p-4">{product.slug}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Danh mục</strong></td>
              <td className="border border-gray-300 p-4">{product.catname}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Thương hiệu</strong></td>
              <td className="border border-gray-300 p-4">{product.brandname}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Mô tả</strong></td>
              <td className="border border-gray-300 p-4">{product.description}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Giá bán</strong></td>
              <td className="border border-gray-300 p-4">{product.price}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-4"><strong>Trạng thái</strong></td>
              <td className="border border-gray-300 p-4">{product.status}</td>
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

export default ShowProduct;
