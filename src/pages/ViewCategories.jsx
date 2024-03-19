// ViewCategories.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import apiClient from '../helpers/apiClient';
import '../styles/viewCategories.styles.scss';
import Button from '../components/Button';

const ViewCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/api/v1/category/get-all');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await apiClient.post(`/api/v1/category/delete/${categoryId}`);
      // Remove the deleted category from the state
      setCategories(categories.filter(category => category.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category: ', error);
    }
  };

  const handleUpdateCategory = (category) => {
    // Create a URL with query params containing the category data
    const url = `/add-category?name=${category.name}&description=${category.description}`;
    // Navigate to the URL
    window.location.href = url;
  };

  return (
    <div className="view-categories">
      <div className="header">
        <h2>View Categories</h2>
        <Link to="/add-category">
          <Button>Create New Category</Button>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <Button onClick={() => handleDeleteCategory(category.id)}>
                  Delete
                </Button>
                <Button onClick={() => handleUpdateCategory(category)}>
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCategories;
