

import React, { useEffect, useState } from "react";
import "./Shirt.css";

const Shirt = () => {
  const [dresses, setShirts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/products/category/3") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch shirts");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Shirts:", data); 
        setShirts(data);
      })
      .catch((error) => {
        console.error("Error fetching shirts:", error);
        setError("Failed to load shirts. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dress-page">
      <h1>Dress Collection</h1>

      {loading && <p>Loading dresses...</p>}
      {error && <p className="error-message">{error}</p>}
      
      <div className="dress-grid">
        {dresses.length > 0 ? (
          dresses.map((product) => (
            <div key={product.id} className="dress-card">
              {/* <img src={product.imageUrl} alt={product.name} className="dress-image" /> */}
              <img 
  src={product.imageUrl.startsWith("http") ? product.imageUrl : `http://localhost:8080${product.imageUrl}`} 
  alt={product.name} 
  className="dress-image" 
/>


              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="price">Price: Rs.{product.price}</p>
            </div>
          ))
        ) : (
          !loading && <p>No Shirts available.</p>
        )}
      </div>
    </div>
  );
};

export default Shirt;
