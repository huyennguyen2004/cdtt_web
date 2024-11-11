import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProductStoreService from '../../../services/ProductStoreService';

const CreateProductStore = () => {
  const navigate = useNavigate();

  const [product_id, setProductId] = useState('');
  const [priceroot, setPriceRoot] = useState(0);
  const [qty, setQty] = useState(0);
  const [dateimport, setDateImport] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const productStore = {
      product_id,
      priceroot,
      qty,
      dateimport: dateimport ? dateimport.toISOString().split('T')[0] : null,
    };
    console.log("Sending product store data:", productStore); 
    try {
      const result = await ProductStoreService.store(productStore);
      console.log(result);
      navigate('/admin/product_store');
    } catch (error) {
      console.error('Error submitting product store:', error);
      alert("Có lỗi xảy ra khi thêm sản phẩm.");
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Nhập sản phẩm</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block mb-1 font-medium">Tên Sản Phẩm</label>
              <input
                type="text"
                value={product_id}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Giá gốc</label>
              <input
                type="number"
                value={priceroot}
                onChange={(e) => setPriceRoot(e.target.value)}
                min="1"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập giá gốc"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Số lượng</label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                min="1"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Nhập số lượng"
                required
              />
            </div>

            <div className="mb-4 col-span-2 md:col-span-1">
              <label className="block mb-1 font-medium">Ngày nhập</label>
              <DatePicker
                selected={dateimport}
                onChange={(date) => setDateImport(date)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholderText="Chọn ngày nhập"
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => navigate('/admin/product_store')}
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

export default CreateProductStore;
