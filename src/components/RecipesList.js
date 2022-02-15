import React, { Component } from "react";
import Recipe from "./Recipe";
import axios from 'axios';
import { weekNumber } from 'weeknumber';
import SearchComponent from "./Search";
import { Grid ,Container } from '@mui/material';

class RecipesList extends Component {
  constructor(props) {
    super(props);
    var today = weekNumber(new Date());
    console.log(today);

    this.state = { recipes: [] };
    this.searchRecipe = this.searchRecipe.bind(this);
  }

  searchRecipe(ingredients) {
    const url = "http://localhost:8080";
    axios.get(`${url}/recipe/ingredients?ingredients=${ingredients}`)
      .then((recipes) => {
        this.setState({ recipes: recipes.data });
      }).catch((err) => console.log(err));
  }

  render() {

    const recipeList = this.state.recipes.map((recipe) => {
      const props = {
        name: `${recipe['recipe']['label']}`,
        description: `${recipe['recipe']['ingredientLines']}`,
        imgurl: `${recipe['recipe']['images']['REGULAR']['url']}`,
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
