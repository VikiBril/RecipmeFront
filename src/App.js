import React, { Component } from "react";
import PersonalRecipes from "./components/PersonalRecipies";
import RecipeList from "./components/RecipesList"
import WeeklySched from "./components/WeeklySched"
export default class App extends Component {
  render() {
    return (
      <>
        <WeeklySched />
      </>
    );
  }
}
