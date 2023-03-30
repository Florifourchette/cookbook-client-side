import React, { useState } from "react";
import Filter from "./Filter";
import RecipeCard from "./RecipeCard";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Form from "react-bootstrap/Form";
import { BiLoader } from "react-icons/bi";
import axios from "axios";

export default ({
  filteredRecipes,
  recipes,
  categories,
  categoryID,
  setCategoryID,
  displayAllresults,
  checked,
  setchecked,
  setDeleteButtonPressed,
  setUploadButtonPressed,
  deleteButtonPressed,
}) => {
  const filterOptions = createFilterOptions({
    matchFrom: "start",
  });

  const [recipetitle, setrecipetitle] = useState("");
  const [shortdescription, setshortdescription] = useState("");
  const [longdescription, setlongdescription] = useState("");
  const [recipepicture, setrecipepicture] = useState("");
  const [steps, setsteps] = useState("");
  const [ingredient, setingredient] = useState("");
  const [vegan, setvegan] = useState(false);
  const handleSubmit = (e) => {
    // setUploading(true)
    e.preventDefault();
    const recipeData = {
      recipetitle,
      shortdescription,
      longdescription,
      recipepicture,
      steps,
      ingredient,
      vegan,
    };
    axios
      .post("http://localhost:8001/recipes", recipeData)
      .then((response) => {
        console.log("Recipe added successfully client", response.data);

        // setUploading(false)
      })
      .catch((error) => {
        console.error("Error adding recipe", error);
        // setUploading(false)
      });
    setUploadButtonPressed((prev) => !prev);
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex flex-column flex-wrap align-items-center">
        <div className="col-sm-12 col-md-12 col-lg-10 col-xl-9 d-flex justify-content-center flex-wrap">
          <div className="homeBox d-flex justify-content-center align-items-center flex-column">
            <h1>Welcome</h1>
            <p>
              We are a trusted resource for home cooks with more than 3,000
              tested recipes, guides, and meal plans, drawing over 15 million
              readers each month from around the world.
            </p>
            <div className="d-flex flex-row">
              <Autocomplete
                id="filter-demo"
                value={categoryID}
                onChange={(e, newValue) => setCategoryID(newValue)}
                options={categories}
                getOptionLabel={(category) => category?.fields?.name}
                filterOptions={filterOptions}
                sx={{ width: 300, padding: 0 }}
                renderInput={(params) => (
                  <TextField {...params} label="Recipe Category" />
                )}
              />
              <button id="resetAll" onClick={displayAllresults}>
                all recipes
              </button>
            </div>
            <Filter
              // callback={(checked) => {
              //   return setchecked(checked);
              // }}
              setchecked={setchecked}
              checked={checked}
            />
          </div>
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        {recipes ? (
          <div className="col-sm-12 col-md-12 col-lg-10 col-xl-10 d-flex justify-content-center flex-wrap">
            {filteredRecipes?.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                setDeleteButtonPressed={setDeleteButtonPressed}
              />
            ))}
          </div>
        ) : (
          <BiLoader />
        )}
        <div className="row d-flex justify-content-center">
          <div className="col-sm-12 col-md-7 col-lg-6 col-xl-6 d-flex align-items-center flex-column">
            <Form.Label
              className="text-left w-100"
              style={{ marginTop: "2em" }}
            >
              Recipe Title
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setrecipetitle(e.target.value)}
            />
            <Form.Label className="text-left w-100">
              Short Description
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setshortdescription(e.target.value)}
            />
            <Form.Label className="text-left w-100">
              Long Description
            </Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setlongdescription(e.target.value)}
              style={{ height: "5em", marginBottom: "1em" }}
            />
            <Form.Label className="text-left w-100">Picture URL</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setrecipepicture(e.target.value)}
              style={{ height: "2em", marginBottom: "1em" }}
            />
            <Form.Label className="text-left w-100">Ingredients</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setingredient(e.target.value)}
              style={{ height: "5em", marginBottom: "1em" }}
            />
            <Form.Label className="text-left w-100">Steps</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setsteps(e.target.value)}
              style={{ height: "5em", marginBottom: "1em" }}
            />
            <Form.Label className="text-left w-100">Is it Vegan?</Form.Label>
            <Form.Group inline>
              <Form.Check
                type="checkbox"
                label="Yes"
                onChange={(e) => setvegan(e.target.checked)}
              />
            </Form.Group>
            <button className="submit-btn text-center" onClick={handleSubmit}>
              Upload Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
