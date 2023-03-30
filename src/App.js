import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import useContentful from "./useContentful";
import manageContentful from "./manageContentful";
import Recipe from "./Recipe";
import Home from "./Home";
import NavigationBar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Contact from "./Contact";
import About from "./About";
import Footer from "./Footer";
import Signup from "./Signup";
import Login from "./Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const { getRecipes } = useContentful();
  const { getCategories } = useContentful();
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState(null);
  const [checked, setchecked] = useState(false);
  
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8001/recipes")
      .then((response) => {
        setRecipes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // [categoryID, searchInput, uploading]

  useEffect(() => {
    axios
      .get("http://localhost:8001/categories")
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchInput = (input) => {
    setSearchInput(input);
  };

  const displayAllresults = (e) => {
    e.preventDefault();
    setCategoryID(null);
    setchecked(null);
    setSearchInput("");
  };

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.recipetitle.toLowerCase().includes(searchInput.toLowerCase()) &&
      (checked ? recipe.vegan === true : recipe)
    );
  });

  return (
    <div className="root">
      <NavigationBar callback={handleSearchInput} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Home
                filteredRecipes={filteredRecipes}
                categories={categories}
                categoryID={categoryID}
                setCategoryID={setCategoryID}
                displayAllresults={displayAllresults}
                recipes={recipes}
                setRecipes={setRecipes}
                setchecked={setchecked}
                checked={checked}
                // titleRef={titleRef}
                // shortTextRef={shortTextRef}
                // longTextRef={longTextRef}
                // handleSubmit={handleSubmit}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route
          path="/About"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <ProtectedRoute>
              <Recipe filteredRecipes={filteredRecipes} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
