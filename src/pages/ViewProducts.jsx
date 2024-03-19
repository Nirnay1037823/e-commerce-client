// ViewProducts.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import apiClient from "../helpers/apiClient";
import "../styles/viewProducts.styles.scss";
import Button from "../components/Button";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

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
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await apiClient.post(`/api/v1/products/delete/${productId}`);
      // Remove the deleted product from the state
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  return (
    <div className="view-products">
      <div className="header">
        <h2>View Products</h2>
        <Link to="/add-product">
          <Button>Create New Product</Button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <Button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
