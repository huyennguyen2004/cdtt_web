// components/frontend/common/Category.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryService from "../../../services/CategoryService";

function Category() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await CategoryService.getProductsByCategoryId(id);
        setProducts(response.data.products);
        setCategoryName(response.data.categoryName); 
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [id]);

  return (
    <div className="container mx-auto text-center py-10">
      <div className="section-title mb-10">
        <h2 className="text-3xl font-bold mb-2">{categoryName}</h2>
        <p>Danh sách sản phẩm thuộc danh mục {categoryName}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img src={product.image} alt={product.name} className="mb-4" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-red-500 font-bold">{product.price} VNĐ</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
