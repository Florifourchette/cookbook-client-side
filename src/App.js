import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
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
  const { createEntry } = manageContentful();
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState(null);
  const [checked, setchecked] = useState(false);
  const [resetAll, setResetAll] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteButtonPressed, setDeleteButtonPressed] = useState(false);

  useEffect(() => {
    const gettingRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8001/recipes/");
        return response;
      } catch (error) {
        console.log(error);
      }
    };

    const gettingCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8001/categories/");
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    const newData = async () => {
      const recipesData = await gettingRecipes();
      const categoriesData = await gettingCategories();
      setCategories(categoriesData.data);
      setRecipes(recipesData.data);
    };
    newData()
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, [resetAll]);
  // [categoryID, searchInput, uploading]

  useEffect(() => {
    axios
      .get(`http://localhost:8001/categories/${categoryID?.id}`)
      .then((response) => {
        setRecipes(response.data);
        console.log("is running");
      })
      .catch((error) => {
        console.log(error);
      });

    const gettingCategoryRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/categories/${categoryID?.id}`
        );
        return response;
      } catch (error) {
        console.log(error);
      }
    };
    const myNewData = async () => {
      const recipesData = await gettingCategoryRecipes();
      setRecipes(recipesData.data);
    };
    myNewData()
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, [categoryID]);

  const handleSearchInput = (input) => {
    setSearchInput(input);
  };

  const displayAllresults = (e) => {
    e.preventDefault();
    setResetAll(!resetAll);
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

  useEffect(() => {
    axios.get("http://localhost:8001/recipes").then((response) => {
      setRecipes(response.data);
      console.log(response.data);
    });
  }, [deleteButtonPressed]);

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
