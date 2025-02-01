import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const navigate = useNavigate();

  const [popup, setPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
  });
  const [variants, setVariants] = useState([
    { size: 'S', stockQuantity: 0 },
    { size: 'M', stockQuantity: 0 },
    { size: 'L', stockQuantity: 0 },
  ]);

 
  useEffect(() => {
    axios.get('http://localhost:8080/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  
  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...variants];
    updatedVariants[index][name] = value;
    setVariants(updatedVariants);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

    const productData = {
        name: product.name,
        description: product.description,
        price: product.price,
        category: { categoryId: product.category }, 
        imageUrl: product.imageUrl,
      };
  
      const productResponse = await axios.post('http://localhost:8080/products', productData);
      const createdProduct = productResponse.data;
  
     
      for (let variant of variants) {
        const variantData = {
          product: { productId: createdProduct.productId },
          size: variant.size,
          stockQuantity: variant.stockQuantity,
        };
        await axios.post('http://localhost:8080/variants', variantData);
      }
     
      setPopup(true);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleClosePopup = () => {
    setPopup(false);
    setProduct({
        name: '',
        description: '',
        price: 0,
        category: '',
        imageUrl: '',
      });
  
      setVariants([
        { size: 'S', stockQuantity: 0 },
        { size: 'M', stockQuantity: 0 },
        { size: 'L', stockQuantity: 0 },
      ]);
    };

  return (
    <div className="container">
      <h1 className="containerHeader">Add New Product</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleProductChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleProductChange}
            required
          />
        </div>

        <div>
          <label>Price (Rs.)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleProductChange}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleProductChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleProductChange}
            required
          />
        </div>

        <h3>Product Variants</h3>
        {variants.map((variant, index) => (
          <div key={index} className="variant-form">
            <div>
              <label>Size</label>
              <select
                name="size"
                value={variant.size}
                onChange={(e) => handleVariantChange(index, e)}
                required
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>

            <div>
              <label>Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={variant.stockQuantity}
                onChange={(e) => handleVariantChange(index, e)}
                required
              />
            </div>
          </div>
        ))}

        <button type="submit">Save Product</button>
      </form>


      {popup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Success!</h3>
            <p>Product successfully added.</p>
            <button onClick={handleClosePopup}>OK</button>
          </div>
        </div>
      )}


    </div>
  );
};

export default AddProductPage;








// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddProductPage = () => {
//   const navigate = useNavigate();

//   const [popup, setPopup] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: 0,
//     category: '',
//     imageUrl: '',
//   });
//   const [variants, setVariants] = useState([
//     { size: 'S', stockQuantity: 0 },
//     { size: 'M', stockQuantity: 0 },
//     { size: 'L', stockQuantity: 0 },
//   ]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/categories')
//       .then((response) => setCategories(response.data))
//       .catch((error) => console.error('Error fetching categories:', error));
//   }, []);

//   const handleProductChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleVariantChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedVariants = [...variants];
//     updatedVariants[index][name] = value;
//     setVariants(updatedVariants);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const productData = {
//         name: product.name,
//         description: product.description,
//         price: product.price,
//         category: { categoryId: product.category },
//         imageUrl: product.imageUrl,
//       };

//       const productResponse = await axios.post('http://localhost:8080/products', productData);
//       const createdProduct = productResponse.data;

//       for (let variant of variants) {
//         const variantData = {
//           product: { productId: createdProduct.productId },
//           size: variant.size,
//           stockQuantity: variant.stockQuantity,
//         };
//         await axios.post('http://localhost:8080/variants', variantData);
//       }

//       setPopup(true);
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   const handleClosePopup = () => {
//     setPopup(false);
//     setProduct({
//       name: '',
//       description: '',
//       price: 0,
//       category: '',
//       imageUrl: '',
//     });

//     setVariants([
//       { size: 'S', stockQuantity: 0 },
//       { size: 'M', stockQuantity: 0 },
//       { size: 'L', stockQuantity: 0 },
//     ]);
//   };

//   return (
//     <div className="add-product-container">
//       <h1 className="add-product-header">Add New Product</h1>

//       <form onSubmit={handleSubmit} className="add-product-form">
//         <div>
//           <label>Product Name</label>
//           <input type="text" name="name" value={product.name} onChange={handleProductChange} required />
//         </div>

//         <div>
//           <label>Description</label>
//           <textarea name="description" value={product.description} onChange={handleProductChange} required />
//         </div>

//         <div>
//           <label>Price (Rs.)</label>
//           <input type="number" name="price" value={product.price} onChange={handleProductChange} required />
//         </div>

//         <div>
//           <label>Category</label>
//           <select name="category" value={product.category} onChange={handleProductChange} required>
//             <option value="">Select Category</option>
//             {categories.map((category) => (
//               <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Image URL</label>
//           <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleProductChange} required />
//         </div>

//         <h3>Product Variants</h3>
//         {variants.map((variant, index) => (
//           <div key={index} className="variant-section">
//             <div>
//               <label>Size</label>
//               <select name="size" value={variant.size} onChange={(e) => handleVariantChange(index, e)} required>
//                 <option value="S">S</option>
//                 <option value="M">M</option>
//                 <option value="L">L</option>
//               </select>
//             </div>

//             <div>
//               <label>Stock Quantity</label>
//               <input type="number" name="stockQuantity" value={variant.stockQuantity} onChange={(e) => handleVariantChange(index, e)} required />
//             </div>
//           </div>
//         ))}

//         <button type="submit">Save Product</button>
//       </form>

//       {popup && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h3>Success!</h3>
//             <p>Product successfully added.</p>
//             <button onClick={handleClosePopup}>OK</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddProductPage;
