

import React, { useEffect, useState } from "react";
import "./Skirt.css";

const Skirt = () => {
  const [dresses, setSkirts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/products/category/2") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Skirts");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Skirts:", data); 
        setSkirts(data);
      })
      .catch((error) => {
        console.error("Error fetching Skirts:", error);
        setError("Failed to load Skirts. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dress-page">
      <h1>Skirt Collection</h1>

      {loading && <p>Loading skirts...</p>}
      {error && <p className="error-message">{error}</p>}
      
      <div className="dress-grid">
        {dresses.length > 0 ? (
          dresses.map((product) => (
            <div key={product.id} className="dress-card">
              <img src={product.imageUrl} alt={product.name} className="dress-image" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="price">Price: Rs.{product.price}</p>
            </div>
          ))
        ) : (
          !loading && <p>No Skirts available.</p>
        )}
      </div>
    </div>
  );
};

export default Skirt;
