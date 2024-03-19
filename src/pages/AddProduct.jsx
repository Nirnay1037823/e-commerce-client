// AddProduct.jsx

import React, { useState } from "react";
import apiClient from "../helpers/apiClient";
import "../styles/addProduct.styles.scss";
import Button from "../components/Button";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const handleAddProduct = async () => {
    try {
      const response = await apiClient.post("/api/v1/products/add-product", {
        name: productName,
        price: productPrice,
        description: productDescription,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return (
    <div className="container">
      <div>
        <label className="label" htmlFor="productName">
          Product Name:
        </label>
        <input
          className="input"
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label className="label" htmlFor="productPrice">
          Product Price:
        </label>
        <input
          className="input"
          type="number"
          id="productPrice"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
      <div>
        <label className="label" htmlFor="productDescription">
          Product Description:
        </label>
        <textarea
          className="textarea"
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </div>
      <Button className="button" onClick={handleAddProduct}>
        Add Product
      </Button>
    </div>
  );
};

export default AddProduct;
