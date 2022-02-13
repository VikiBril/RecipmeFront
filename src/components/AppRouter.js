import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./LoginPage";
import Weekly from "./WeeklySched";
import Recipe from "./Recipe";
//import Search from "./Search";
import RecipesList from "./RecipesList";
import PersonalRecipes from "./PersonalRecipies";
import AdminApproval from "./AdminApproval";
export default function AppRouter() {
  return (
    <>
    <Routes>
      {/* <Route path="/">
        <Login />
      </Route> */}
      {/* <Route path="/Search">
        <Search />
      </Route> */}
      <Route path="/myRecipes" element={<PersonalRecipes/>}/>
      <Route path="/RecipesList" element={<RecipesList/>}/>
      <Route path="/Weekly" element={<Weekly/>}/>
      <Route path="/Approval" element={<AdminApproval/>}/>
      
    </Routes>
    </>
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
