import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductListService from '../../../services/ProductListService';
import CategoryService from '../../../services/CategoryService';
import BrandService from '../../../services/BrandService';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [name, setName] = useState('');
    const [category_id, setCategoryId] = useState('');
    const [brand_id, setBrandId] = useState('');
    const [detail, setDetail] = useState('');
    const [description, setDescription] = useState('');
    const [pricebuy, setPricebuy] = useState('');
    const [status, setStatus] = useState('1');  
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryService.index();
                setCategories(response.categories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await BrandService.index();
                setBrands(response);
            } catch (error) {
                console.error('Failed to fetch brands:', error);
                setBrands([]);
            }
        };
        fetchBrands();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const productData = {
            name,
            category_id,
            brand_id,
            detail,
            description,
            pricebuy,
            status,
        };
    
        console.log("Dữ liệu gửi lên:", productData);
    
        try {
            setLoading(true);
            const response = await ProductListService.store(productData);
            if (response && response.status) {
                alert(response.message);
                navigate('/admin/product');
            } else {
                console.error('Cấu trúc phản hồi sai:', response);
                alert('Có lỗi xảy ra! Vui lòng thử lại.');
            }
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
            alert('Đã có lỗi xảy ra khi tạo sản phẩm.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="p-6 bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Thêm Sản Phẩm Mới</h2>
                <form onSubmit={handleSubmit}>
                    {/* Tên sản phẩm */}
                    <div className="mb-4">
                        <label className="block mb-2">Tên sản phẩm</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="border rounded w-full p-2"
                        />
                    </div>
                    {/* Danh mục */}
                    <div className="mb-4">
                        <label className="block mb-2">Danh mục</label>
                        <select
                            value={category_id}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            className="border rounded w-full p-2"
                        >
                            <option value="">Chọn danh mục</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Thương hiệu */}
                    <div className="mb-4">
                        <label className="block mb-2">Thương hiệu</label>
                        <select
                            value={brand_id}
                            onChange={(e) => setBrandId(e.target.value)}
                            required
                            className="border rounded w-full p-2"
                        >
                            <option value="">Chọn thương hiệu</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Chi tiết */}
                    <div className="mb-4">
                        <label className="block mb-2">Chi tiết</label>
                        <textarea
                            value={detail}
                            onChange={(e) => setDetail(e.target.value)}
                            required
                            className="border rounded w-full p-2"
                        />
                    </div>

                    {/* Mô tả */}
                    <div className="mb-4">
                        <label className="block mb-2">Mô tả</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="border rounded w-full p-2"
                        />
                    </div>

                    {/* Giá bán */}
                    <div className="mb-4">
                        <label className="block mb-2">Giá bán</label>
                        <input
                            type="number"
                            value={pricebuy}
                            onChange={(e) => setPricebuy(e.target.value)}
                            required
                            min="0"
                            className="border rounded w-full p-2"
                        />
                    </div>

                    {/* Trạng thái */}
                    <div className="mb-4">
                        <label className="block mb-2">Trạng thái</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded w-full p-2"
                        >
                            <option value="">Chọn trạng thái</option>
                            <option value="1">Xuất bản</option>
                            <option value="0">Chưa xuất bản</option>
                        </select>
                    </div>

                    {/* Nút gửi */}
                    <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4 mr-2" disabled={loading}>
                        {loading ? 'Đang tạo sản phẩm...' : 'Tạo sản phẩm'}
                    </button>

                    {/* Nút quay lại */}
                    <button type="button" onClick={() => navigate('/admin/product')} className="bg-gray-300 text-black rounded py-2 px-4">
                        Quay lại
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
