
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import UserPage from "./components/UserPage"; // Make sure this file exists
import AddProductPage from "./components/AddProductPage";
import Dress from "./components/Dress";
import Skirt from "./components/Skirt";
// import Denim from "./components/Denim";
import Shirt from "./components/Shirt";
// import Blouse from "./components/Blouse";
// import Pant from "./components/Pant";

function App() {
  return (
    <Router>
      <Header /> {/* Header remains visible on all pages */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/dresses" element={<Dress />} /> 
        <Route path="/skirts" element={<Skirt />} /> 
        {/* <Route path="/denims" element={<Denim/>} />  */}
        <Route path="/shirts" element={<Shirt />} /> 
        {/* <Route path="/blouses" element={<Blouse />} /> 
        <Route path="/pants" element={<Pant />} />  */}
      </Routes>
    </Router>
  );
}

export default App;


