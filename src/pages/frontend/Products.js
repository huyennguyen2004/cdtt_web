import React, { useEffect, useState, useRef } from 'react';
import ProductListService from '../../services/ProductListService';
import CategoryService from '../../services/CategoryService'; 
import BrandService from '../../services/BrandService'; 
import { FaTh, FaListUl, FaSort, FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); 
    const [brands, setBrands] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
    const [viewMode, setViewMode] = useState('grid');
    const [sortOption, setSortOption] = useState('newest');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showBrandDropdown, setShowBrandDropdown] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(999999);
    const headerRef = useRef(null);

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

        const fetchCategories = async () => {
            try {
                const response = await CategoryService.index(); 
                console.log('Fetched categories:', response);
                setCategories(response.categories);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        const fetchBrands = async () => {
            try {
                const response = await BrandService.index(); 
                console.log('Fetched brands:', response);
                setBrands(response);
            } catch (error) {
                console.error('Failed to fetch brands:', error);
            }
        };

        fetchProducts();
        fetchCategories();
        fetchBrands();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const sortedProducts = () => {
        let sorted = [...products];
        if (sortOption === 'priceLowToHigh') {
            sorted.sort((a, b) => a.pricebuy - b.pricebuy);
        } else if (sortOption === 'priceHighToLow') {
            sorted.sort((a, b) => b.pricebuy - a.pricebuy);
        } else {
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return sorted.filter(product => product.pricebuy >= minPrice && product.pricebuy <= maxPrice);
    };

    const currentProducts = sortedProducts().slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (headerRef.current) {
            headerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleViewMode = (mode) => setViewMode(mode);

    const handleSortChange = (option) => {
        setSortOption(option);
        setShowSortDropdown(false);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto px-4 flex flex-col">
            <h1 ref={headerRef} className="text-2xl font-bold mb-6">Danh sách sản phẩm</h1>

            <div className="flex justify-between mb-4 mt-4"> 
                <div className="flex space-x-4">
                    <div className="relative">
                        <button 
                            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} 
                            className="p-2 rounded bg-gray-200"
                        >
                            Danh mục
                        </button>
                        {showCategoryDropdown && (
                            <div className="absolute bg-white shadow-md rounded mt-2 w-full z-10">
                                {categories.map((category, index) => (
                                    <button key={index} className="block w-full text-left p-1 hover:bg-gray-200">
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button 
                            onClick={() => setShowBrandDropdown(!showBrandDropdown)} 
                            className="p-2 rounded bg-gray-200"
                        >
                            Thương hiệu
                        </button>
                        {showBrandDropdown && (
                            <div className="absolute bg-white shadow-md rounded mt-2 w-full z-10">
                                {brands.map((brand, index) => (
                                    <button key={index} className="block w-full text-left p-1 hover:bg-gray-200">
                                        {brand.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button onClick={() => toggleViewMode('grid')} className={`mr-2 p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        <FaTh />
                    </button>
                    <button onClick={() => toggleViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        <FaListUl />
                    </button>
                    <button onClick={() => setShowSortDropdown(!showSortDropdown)} className="p-2 rounded bg-gray-200">
                        <FaSort />
                    </button>
                    {showSortDropdown && (
                        <div className="absolute bg-white shadow-md rounded mt-2 z-10">
                            <button onClick={() => handleSortChange('newest')} className="block w-full text-left p-1 hover:bg-gray-200">Mới nhất</button>
                            <button onClick={() => handleSortChange('priceLowToHigh')} className="block w-full text-left p-1 hover:bg-gray-200">Giá thấp đến cao</button>
                            <button onClick={() => handleSortChange('priceHighToLow')} className="block w-full text-left p-1 hover:bg-gray-200">Giá cao đến thấp</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <label className="block mb-2">Giá: {maxPrice.toLocaleString()} VNĐ</label>
                <input 
                    type="range" 
                    min="0" 
                    max="2000000" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(Number(e.target.value))} 
                    className="w-1/3"
                />
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={product.images[0]?.thumbnail || 'default-image.jpg'} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-600">Giá: {product.pricebuy.toLocaleString()} VNĐ</p>
                                <p className="mt-2 text-gray-700">{product.description}</p>
                                <div className="flex space-x-2 mt-3">
                                    <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                                        <FaHeart />
                                    </button>
                                    <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                                        <FaShoppingCart />
                                    </button>
                                    <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                                        <FaEye />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4 mt-4">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="bg-white shadow-md rounded-lg p-4 flex items-center">
                            <img src={product.images[0]?.thumbnail || 'default-image.jpg'} alt={product.name} className="w-32 h-32 object-cover mr-4" />
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-gray-600">Giá: {product.pricebuy.toLocaleString()} VNĐ</p>
                                <p className="mt-2 text-gray-700">{product.description}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                                    <FaHeart />
                                </button>
                                <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                                    <FaShoppingCart />
                                </button>
                                <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                                    <FaEye />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

<div className="flex justify-center mt-4">
    {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
        <button 
            key={index} 
            onClick={() => handlePageChange(index + 1)} 
            className={`mx-1 w-8 h-8 rounded-full flex items-center justify-center ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
            {index + 1}
        </button>
    ))}
</div>

        </div>
    );
};

export default Products;
