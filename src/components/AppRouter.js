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
        <Route path="/Login" element={<Login/>} />
        <Route path="/myRecipes" element={<PersonalRecipes />} />
        <Route path="/RecipesList" element={<RecipesList />} />
        <Route path="/Weekly" element={<Weekly/>} />
        <Route path="/AdminApproval" element={<AdminApproval />} />
      </Routes>
    </>
  );
}


