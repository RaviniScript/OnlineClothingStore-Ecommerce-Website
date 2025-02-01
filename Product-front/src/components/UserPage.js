

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./UserPage.css";

const UserPage = () => {

    const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [variants, setVariants] = useState({});

  const [editingProductId, setEditingProductId] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});

  const [editingVariantId, setEditingVariantId] = useState(null);
  const [updatedVariant, setUpdatedVariant] = useState({});

  
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchVariants = async (productId) => {
    try {
      const res = await axios.get("http://localhost:8080/variants");
      const productVariants = res.data.filter((v) => v.product.productId === productId);
      setVariants((prev) => ({ ...prev, [productId]: productVariants }));
    } catch (error) {
      console.error("Error fetching variants:", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product.productId);
    setUpdatedProduct({ ...product });
  };

  const handleSaveProduct = async (productId) => {
    try {
      await axios.put(`http://localhost:8080/products/${productId}`, updatedProduct);
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditVariant = (variant) => {
    setEditingVariantId(variant.variantId);
    setUpdatedVariant({ ...variant });
  };

  const handleSaveVariant = async (variantId) => {
    try {
      await axios.put(`http://localhost:8080/variants/${variantId}`, updatedVariant);
      setEditingVariantId(null);
      fetchVariants(updatedVariant.product.productId);
    } catch (error) {
      console.error("Error updating variant:", error);
    }
  };

  const handleExpandVariants = (productId) => {
    if (expandedProduct === productId) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(productId);
      fetchVariants(productId);
    }
  };

  
  const groupedByCategory = products.reduce((acc, product) => {
    const category = product.category.categoryName;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="container">
      <h1 className="containerHeader">Admin Panel - Manage Products</h1>


      <button onClick={() => navigate('/add-product')} className="add-product-btn">
        + Add New Product
      </button>

      {Object.keys(groupedByCategory).map((categoryName) => (
        <div key={categoryName}>
          <h2 className="ProductsHeader">{categoryName}</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price (Rs.)</th>
                <th>Category</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedByCategory[categoryName].map((product) => (
                <React.Fragment key={product.productId}>
                  <tr>
                    <td>
                      {editingProductId === product.productId ? (
                        <input
                          type="text"
                          value={updatedProduct.name}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />
                      ) : (
                        product.name
                      )}
                    </td>

                    <td>
                      {editingProductId === product.productId ? (
                        <input
                          type="text"
                          value={updatedProduct.description}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                        />
                      ) : (
                        product.description
                      )}
                    </td>

                    <td>
                      {editingProductId === product.productId ? (
                        <input
                          type="number"
                          value={updatedProduct.price}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                        />
                      ) : (
                        `Rs.${product.price}`
                      )}
                    </td>

                    <td>{product.category.categoryName}</td>

                    <td>
                      {editingProductId === product.productId ? (
                        <input
                          type="text"
                          value={updatedProduct.imageUrl}
                          onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })}
                        />
                      ) : (
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                      )}
                    </td>

                    <td>
                      <button className="showVariantsbtn" onClick={() => handleExpandVariants(product.productId)}>
                        {expandedProduct === product.productId ? "Hide Variants" : "Show Variants"}
                      </button>
                      {editingProductId === product.productId ? (
                        <button className="save-btn" onClick={() => handleSaveProduct(product.productId)}>💾 Save</button>
                      ) : (
                        <button className="edit-btn" onClick={() => handleEditProduct(product)}>✏️ Edit</button>
                      )}
                      <button className="delete-btn" onClick={() => handleDeleteProduct(product.productId)}>❌ Delete</button>
                    </td>
                  </tr>

                  {expandedProduct === product.productId && (
                    <tr>
                      <td colSpan="6">
                        <h3>Variants</h3>
                        <table className="variant-table">
                          <thead>
                            <tr>
                              <th>Size</th>
                              <th>Stock Quantity</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {variants[product.productId]?.map((variant) => (
                              <tr key={variant.variantId}>
                                <td>
                                  {editingVariantId === variant.variantId ? (
                                    <input
                                      type="text"
                                      value={updatedVariant.size}
                                      onChange={(e) => setUpdatedVariant({ ...updatedVariant, size: e.target.value })}
                                    />
                                  ) : (
                                    variant.size
                                  )}
                                </td>
                                <td>
                                  {editingVariantId === variant.variantId ? (
                                    <input
                                      type="number"
                                      value={updatedVariant.stockQuantity}
                                      onChange={(e) => setUpdatedVariant({ ...updatedVariant, stockQuantity: e.target.value })}
                                    />
                                  ) : (
                                    variant.stockQuantity
                                  )}
                                </td>
                                <td>
                                  {editingVariantId === variant.variantId ? (
                                    <button className="save-btn" onClick={() => handleSaveVariant(variant.variantId)}>💾 Save</button>
                                  ) : (
                                    <button className="edit-btn" onClick={() => handleEditVariant(variant)}>✏️ Edit</button>
                                  )}
                                  <button className="delete-btn">❌ Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
