import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const { categoryId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      // Fetch category data for editing
      fetchCategory(categoryId);
    }
  }, [categoryId]);

  const fetchCategory = async (id) => {
    try {
      const response = await apiClient.get(`/api/v1/category/get/${id}`);
      const { name, description } = response.data;
      setCategoryName(name);
      setCategoryDescription(description);
    } catch (error) {
      console.error("Error fetching category: ", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = { name: categoryName, description: categoryDescription };
      if (categoryId) {
        // Update category
        await apiClient.post(`/api/v1/category/update/${categoryId}`, data);
      } else {
        // Add new category
        await apiClient.post("/api/v1/category/add-category", data);
      }
      // Navigate to view categories page
      navigate("/view-categories");
    } catch (error) {
      console.error("Error adding/updating category: ", error);
    }
  };

  return (
    <div className="container">
      <div>
        <label className="label" htmlFor="categoryName">
          Category Name:
        </label>
        <input
          className="input"
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>
      <div>
        <label className="label" htmlFor="categoryDescription">
          Category Description:
        </label>
        <textarea
          className="textarea"
          id="categoryDescription"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit}>
        {categoryId ? "Update Category" : "Add Category"}
      </Button>
      <Link to="/view-categories">Cancel</Link>
    </div>
  );
};

export default UpdateCategory;
