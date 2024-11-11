import React, { useEffect, useState } from 'react';
import Slider from './../../components/frontend/home/Slider';
import ProductCard from './../../components/frontend/home/ProductCard';
import { Link } from 'react-router-dom';
import BrandSlider from './../../components/frontend/common/BrandSlider';
import ProductSaleService from '../../services/ProductSaleService';
import ProductListService from '../../services/ProductListService';
import PostService from '../../services/PostService';


const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [saleProducts, setProductSale] = useState([]);
  const [bestsellerProducts,setProductBestSeller] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
     const fetchProducts = async () => {
      try {
        const response = await ProductListService.index();
        console.log('Fetched products:', response);
        setNewProducts(response.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

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
  
  useEffect(() => {
    const fetchProductBestSeller = async () => {
      try {
        const response = await ProductListService.bestseller(5); 
        console.log('Fetched bestsellers:', response);
        setProductBestSeller(response.data.products);
      } catch (error) {
        console.error('Failed to fetch bestsellers:', error);
      }
    };
    fetchProductBestSeller();
  }, []);
  

  useEffect(() => {
    fetchPosts();
}, []);
const fetchPosts = async () => {
    try {
      const response = await PostService.index();
      console.log('Fetched posts:', response);
        setPosts(response.slice(0, 3));
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

  return (
    <div>
      <header className="bg-blue-900">
      
      </header>
      <main>
        <div>
          <Slider />
          
          <Section title="Sản phẩm mới nhất" products={newProducts} type="new" />
          <Section title="Sản phẩm khuyến mãi" products={saleProducts} type="sale" />
 <Section title="Sản phẩm bán chạy nhất" products={newProducts}/>

 <div className="bg-gray-100 text-center p-8">
  <h2 className="text-2xl text-white font-bold mb-4 text-center inline-block bg-blue-900">
    Bài viết gần đây
  </h2>
  <div className="flex justify-center gap-4 flex-wrap">
    {Array.isArray(posts) && posts.length > 0 ? (
      posts.map((post) => (
        <div key={post.id} className="p-4 bg-white rounded shadow-md w-full max-w-xs h-100%"> 
          {post.thumbnail && (
            <img src={`/post/${post.thumbnail}`} alt={post.title} className="w-full h-48 object-cover mb-4" />
          )}
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm">{post.description}</p>
          <Link to={`/post/${post.id}`} className="text-blue-500 hover:underline">
            Xem chi tiết
          </Link>
        </div>
      ))
    ) : (
      <p>Không có bài viết nào</p>
    )}
  </div>
</div>


          <div className="bg-white text-center py-8">
            <h2 className="text-2xl font-bold mb-4 bg-blue-900 text-white inline-block">Thương hiệu</h2>
            <BrandSlider />
          </div>
        </div>
      </main>
    </div>
  );
};

const Section = ({ title, products, type }) => (
  <>
    <div className="bg-blue-900 text-white text-center p-2 rounded-lg mb-4 inline-block">
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
    <div className="ml-10 mr-10 flex flex-wrap justify-between">
      {products.slice(0, 5).map((product) => (
        <ProductCard key={product.id} product={product} type={type} />
      ))}
    </div>
    <div className="flex justify-center mt-8 mb-5">
      <Link to="/products" className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-blue-800">
        Xem thêm
      </Link>
    </div>
  </>
);


export default Home;
