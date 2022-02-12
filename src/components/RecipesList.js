import React, { Component } from "react";
import Recipe from "./Recipe";
import axios from 'axios';
import { weekNumber } from 'weeknumber'
import SearchComponent from "./Search"

class RecipesList extends Component {
  constructor(props) {
    super(props);
    var today = weekNumber(new Date());
    console.log(today);

    this.state = {recipes: []};
    this.searchRecipe = this.searchRecipe.bind(this);
  }

  searchRecipe(ingredients) {
    const url = "http://localhost:3001";
    axios.get(`${url}/recipe/ingredients?ingredients=${ingredients}`)
      .then((recipes) =>{
        this.setState({ recipes: recipes.data });
      }).catch((err)=>console.log(err));
  }
  
  render() {
    console.log(this.state.recipes);
    const recipeList = this.state.recipes.map((recipe) => {
      const props = {
        name: `${recipe['recipe']['label']}`,
        title: ``,
        description: `${recipe['recipe']['ingredientLines']}`,
        imgurl: `${recipe['recipe']['images']['REGULAR']['url']}`,
      };
      return <Recipe key={props.name} {...props} />;
    });
    return <div className="grid-list">
      <SearchComponent searchRecipe={this.searchRecipe}></SearchComponent>
      {recipeList}
      </div>;
  }
}

export default RecipesList;
