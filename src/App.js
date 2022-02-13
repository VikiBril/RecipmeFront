import React, { Component } from "react";
import Login from "./Components/LoginPage";
import PersonalRecipes from "./Components/PersonalRecipies";
import RecipeList from "./Components/RecipesList";
import WeeklySched from "./Components/WeeklySched";
export default class App extends Component {
  render() {
    return (
      <>
        <Login />
        <WeeklySched />
      </>
    );
  }
}
