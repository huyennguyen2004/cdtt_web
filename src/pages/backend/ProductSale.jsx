import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import ProductSaleService from '../../services/ProductSaleService'; 

const ProductSalePage = () => {
  const [product_sale, setProductSale] = useState([]); 
  const [trashedproduct_sale, setTrashedproduct_sale] = useState([]);
  const navigate = useNavigate(); 


  useEffect(() => {
    const fetchProductSale = async () => {
      try {
        const response = await ProductSaleService.index();
        console.log('Fetched product_sale:', response);
        setProductSale(response.productsale);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProductSale();
  }, []);

  
  const toggleStatus = (id) => {
    setProductSale((prevProductSales) =>
      prevProductSales.map((product_sale) =>
        product_sale.id === id
          ? { ...product_sale, status: product_sale.status === "Xuất bản" ? "Chưa xuất bản" : "Xuất bản" }
          : product_sale
      )
    );
  };

  const handleAddproduct_sale = () => {
    navigate('/admin/product_sale/create'); 
  };

  const handleTrashClick = () => {
    navigate('/admin/product_sale/trash');
  };

  const handleShowproduct_sale = (id) => {
    navigate(`/admin/product_sale/show/${id}`); 
  };

  const handleEditproduct_sale = (id) => {
    navigate(`/admin/product_sale/edit/${id}`);
  };

  const handleDeleteproduct_sale = (id) => {
    const product_saleToTrash = product_sale.find((product_sale) => product_sale.id === id); 
    if (product_saleToTrash) {
      setTrashedproduct_sale((prevTrashed) => [...prevTrashed, product_saleToTrash]); 
      setProductSale((prevProductSales) => prevProductSales.filter((product_sale) => product_sale.id !== id)); 
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
            onClick={handleAddproduct_sale}
          >
            Thêm Sản Phẩm
          </button>
        </div>
        <h2 className="text-xl font-bold mb-2">Sản Phẩm Khuyến Mãi</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-amber-500">
              <th className="p-2 border"></th>
              <th className="p-2 border">ID</th>
    
              <th className="p-2 border">Sản Phẩm</th>
              <th className="p-2 border">Giá khuyến mãi</th>
              <th className="p-2 border">Ngày bắt đầu</th>
              <th className="p-2 border">Ngày kết thúc</th>
              <th className="p-2 border">Chức Năng</th>
            </tr>
          </thead>
          <tbody>
            {product_sale.length > 0 ? (
              product_sale.map((product_sale) => (
                <tr key={product_sale.id} className="hover:bg-gray-100">
                  <td className="p-2 border">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2 border">{product_sale.id}</td>
                         <td className="p-2 border">{product_sale.name}</td>
                  <td className="p-2 border">{product_sale.pricesale}</td>
                  <td className="p-2 border">{product_sale.datebegin}</td>
                  <td className="p-2 border">{product_sale.dateend}</td>
                  <td className="p-9 border flex space-x-2 justify-center items-center">
                    <button className="text-blue-500 hover:underline" onClick={() => handleShowproduct_sale(product_sale.id)}>
                      <FaEye />
                    </button>
                    <button className="text-yellow-500 hover:underline" onClick={() => handleEditproduct_sale(product_sale.id)}>
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:underline" onClick={() => handleDeleteproduct_sale(product_sale.id)}>
                      <FaTrash />
                    </button>
                    <button onClick={() => toggleStatus(product_sale.id)}>
                      {product_sale.status === "Xuất bản" ? <FaToggleOn className="text-green-500" /> : <FaToggleOff className="text-gray-500" />}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4">Không có sản phẩm khuyến mãi nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSalePage;
