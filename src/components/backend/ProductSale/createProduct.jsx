import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductListService from '../../../services/ProductListService';
import ProductSaleService from '../../../services/ProductSaleService';

const CreateProductSale = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [product_id, setProductId] = useState(''); 
  const [pricesale, setPriceSale] = useState(0);
  const [datebegin, setDateBegin] = useState('');
  const [dateend, setDateEnd] = useState('');

 
  useEffect(() => {
    const fetchData = async () => {
      const result = await ProductListService.index();
      if (result.products) {
        setProducts(result.products);
      } else {
        setProducts([]);
      }
    };
    fetchData();
  }, []);


  const formatDateTime = (strdate) => {
    if (strdate !== null) {
      const arr = strdate.split('T');
      return arr.join(' ') + ':00';
    }
    return strdate;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const productSale = {
      product_id,
      pricesale,
      datebegin: formatDateTime(datebegin),
      dateend: formatDateTime(dateend),
    };
  
    console.log("Sending data:", productSale);
  
    try {
      const result = await ProductSaleService.store(productSale);
      console.log(result);
      navigate('/admin/product_sale');
    } catch (error) {
      console.error('Error submitting product sale:', error);
      alert("Có lỗi xảy ra khi thêm sản phẩm khuyến mãi.");
    }
  };
  

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Thêm Sản Phẩm Khuyến Mãi</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* Nhập sản phẩm */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Sản Phẩm</label>
              <input
                list="product_list"
                value={product_id}
                onChange={(e) => setProductId(e.target.value)} 
                className="border rounded w-full p-2"
                required
              />
              <datalist id="product_list">
                {products.length > 0 ? (
                  products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))
                ) : (
                  <option>Không có sản phẩm</option>
                )}
              </datalist>
            </div>

            {/* Nhập giá khuyến mãi */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Giá Khuyến Mãi</label>
              <input
                type="number"
                value={pricesale} 
                onChange={(e) => setPriceSale(e.target.value)} 
                min="1"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập giá khuyến mãi"
                required
              />
            </div>

            {/* Ngày bắt đầu */}
            <div className="mb-4 col-span-2 md:col-span-1">
              <label className="block mb-1 font-medium">Ngày Bắt Đầu</label>
              <input
                type="datetime-local"
                value={datebegin}
                onChange={(e) => setDateBegin(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Ngày kết thúc */}
            <div className="mb-4 col-span-2 md:col-span-1">
              <label className="block mb-1 font-medium">Ngày Kết Thúc</label>
              <input
                type="datetime-local"
                value={dateend}    
                onChange={(e) => setDateEnd(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => navigate('/admin/product_sale')}
              className="bg-gray-300 text-black rounded py-2 px-4"
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Thêm Sản Phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductSale;
