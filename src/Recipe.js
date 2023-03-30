import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { CssBaseline, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { borderRadius } from "@mui/system";

export default ({ filteredRecipes }) => {
  const [thisRecipe, setThisRecipe] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8001/recipes/${id}`)
      .then((response) => {
        console.log({ response });
        setThisRecipe(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <div>{thisRecipe.recipetitle}</div>
      <CssBaseline />
      <nav
        aria-label="breadcrumb"
        style={{ marginTop: "1rem", marginLeft: "0.5rem" }}
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {thisRecipe.recipetitle}
          </li>
        </ol>
      </nav>
      <main>
        <div>
          <Container
            id="recipePageImageBox"
            align="center"
            sx={{ mb: 3 }}
            maxWidth="sm"
            style={{
              backgroundImage: `url(${thisRecipe.recipepicture})`,
              backgroundSize: "cover",
              height: "70vh",
              width: "70vh",
              color: "#f5f5f5",
              borderRadius: "35%",
            }}
          ></Container>
          <Container maxWidth="sm" align="center">
            <Typography
              gutterBottom
              variant="h1"
              component="div"
              color="textPrimary"
              align="center"
            >
              <h1>{thisRecipe.recipetitle}</h1>
            </Typography>
          </Container>
          <Container maxWidth="sm" align="center">
            <Typography
              gutterBottom
              variant="paragraph"
              component="div"
              color="textSecondary"
              align="center"
              sx={{ mb: 4 }}
            >
              <p>{thisRecipe.shortdescription}</p>
              <p>{thisRecipe.longdescription}</p>
            </Typography>
          </Container>
          <Container>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Card sx={{ maxWidth: 400 }} className="recipeCards">
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="paragraph"
                        component="div"
                        color="textSecondary"
                        align="center"
                      >
                        <h2>Ingredients</h2>
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="paragraph"
                        component="div"
                        color="textSecondary"
                        align="justify"
                      >
                        <div>{thisRecipe.ingredient}</div>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item>
                <Card sx={{ maxWidth: 700 }} className="recipeCards">
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="paragraph"
                        component="div"
                        color="textSecondary"
                        align="center"
                      >
                        <h2>Steps</h2>
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="paragraph"
                        component="div"
                        color="textSecondary"
                        align="justify"
                      >
                        <div>{thisRecipe.steps}</div>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </div>
  );
};
