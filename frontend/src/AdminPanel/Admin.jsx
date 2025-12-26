// AdminPanel/Admin.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
 
export default function Admin() {
  const [Products, setProducts] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://mini-e-commerce-website-backend.onrender.com/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete Product
  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Are you sure you want to delete ${product.name}?`)) return;

    try {
      await axios.delete(`https://mini-e-commerce-website-backend.onrender.com/api/products/${product._id}`);
      fetchProducts();
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="admin-nav">
          <li><Link to="/admin" className="nav">Dashboard</Link></li>
          <li><Link to="/addproduct" className="nav">Add Product</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <section className="admin-main">
        <h1>Product Management</h1>

        {Products.length === 0 ? (
          <p className="no-products">No products found</p>
        ) : (
          <div className="product-table">
            <div className="table-header">
              <span>S.No</span>
              <span>Name</span>
              <span>Description</span>
              <span>Price</span>
              <span>Category</span>
              <span>Stock</span>
              <span>Image</span>
              <span>Actions</span>
            </div>

            {Products.map((product, index) => (
              <div className="table-row" key={product._id}>
                <span>{index + 1}</span>
                <span>{product.name}</span>
                <span className="desc">{product.description}</span>
                <span>${product.price}</span>
                <span>{product.category}</span>
                <span>{product.stock}</span>
                <span>
                  <img src={product.image} alt={product.name} />
                </span>
                <span className="actions">
                  <Link to={`/update/${product._id}`}><button className="update-btn">Update</button></Link>
                  <button className="delete-btn" onClick={() => handleDeleteProduct(product)}>Delete</button>
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
