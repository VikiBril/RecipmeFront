import React, { Component } from "react";
import Recipe from "./Recipe";
import axios from 'axios';
import { weekNumber } from 'weeknumber';
import SearchComponent from "./Search";
import { Grid ,Container } from '@mui/material';
import {withRouter} from 'react-router-dom';

class RecipesList extends Component {
  constructor(props) {
    super(props);
    var today = weekNumber(new Date());
    console.log(today);

    this.state = { recipes: [] };
    this.searchRecipe = this.searchRecipe.bind(this);
  }

  searchRecipe(ingredients) {
    const url = "http://localhost:3001";
    axios.get(`${url}/recipe/ingredients?ingredients=${ingredients}`,{headers:{ 'x-access-token': "Bearer "+localStorage.getItem("token") }})
      .then((recipes) => {
        this.setState({ recipes: recipes.data });
      }).catch((err) =>  {
        if (err.response.status == 403) {
          window.location.href = "/";
        }
      });
  }

  render() {

    const recipeList = this.state.recipes.map((recipe) => {
      const props = {
        name: `${recipe['recipe']['label']}`,
        url: `${recipe['recipe']['url']}`,
        description: `${recipe['recipe']['ingredientLines']}`,
        imgurl: `${recipe['recipe']['images']['REGULAR']['url']}`,
        recipeType:0
      };
      return <Grid item xs={12} md={4} sm={3}><Recipe key={props.name} {...props} /></Grid>;
    });
    return (
      <Container>
        <Grid item aglinContent="center" >
        <SearchComponent searchRecipe={this.searchRecipe}></SearchComponent>
        <Grid container>
        {recipeList}
        </Grid>
        </Grid>

      </Container>);
  }
}

export default RecipesList;
