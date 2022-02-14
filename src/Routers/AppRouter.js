import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../Components/LoginPage";
import Weekly from "../Components/WeeklySched";
import UsersRecipes from "../Components/UsersRecipes";
import RecipesList from "../Components/RecipesList";
import PersonalRecipes from "../Components/PersonalRecipies";
import AdminApproval from "../Components/AdminApproval";
export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/myRecipes" element={<PersonalRecipes />} />
        <Route path="/RecipesList" element={<RecipesList />} />
        <Route path="/Weekly" element={<Weekly/>} />
        <Route path="/AdminApproval" element={<AdminApproval />} />
        <Route path="/UsersRecipes" element={<UsersRecipes />} />
      </Routes>
    </>
  );
}


