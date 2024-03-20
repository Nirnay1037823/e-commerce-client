import React, { useState, useEffect } from "react";
import apiClient from "../helpers/apiClient";
import "../styles/linkProduct.styles.scss";
import Button from "../components/Button";
import { useParams } from "react-router-dom";

const LinkProduct = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get("/api/v1/products/get-all");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
    console.log(products);
  };

  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Filter selected products and extract required fields
      const selectedProductsData = products
        .filter((product) => selectedProducts.includes(product.id))
        .map(({ name, price, description }) => ({ name, price, description }));
      console.log(selectedProductsData);
      await apiClient.post(
        `/api/v1/category/products-with-category/${params.id}`,
        selectedProductsData
      );
      // Optionally, you can navigate back to the view categories page or display a success message
    } catch (error) {
      console.error("Error linking products with category: ", error);
    }
  };

  return (
    <div className="link-product">
      <h2>Link Products with Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id}>
              <label>
                <input
                  type="checkbox"
                  value={product.id}
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleProductSelection(product.id)}
                />
                {product.name}
              </label>
            </div>
          ))}
        </div>
        <Button type="submit">Link Products</Button>
      </form>
    </div>
  );
};

export default LinkProduct;
