import React from "react";
import { Router, Route } from "react-router-dom";
import Login from "./LoginPage";
import Weekly from "./WeeklySched";
import Recipe from "./Recipe";
//import Search from "./Search";
import RecipesList from "./RecipesList";

export default function AppRouter() {
  return (
    <Router>
      {/* <Route path="/Search">
        <Search />
      </Route> */}
      <Route path="/recipes/:recipeId">
        <Recipe />
      </Route>
      <Route path="/recipes">
        <RecipesList />
      </Route>
      <Route path="/weeklysched">
        <Weekly />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Router>
  );
}

// function Search() {
//   return <h2>searching for recipe..</h2>;
// }

// function Recipe() {
//   return <h2>Recipe</h2>;
// }
// function Recipes() {
//   return RecipesList;
// }
