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
        { "Bearer "+localStorage.getItem("token")?<>
        <Route path="/myRecipes" element={<PersonalRecipes />} />
        <Route path="/RecipesList" element={<RecipesList />} />
        <Route path="/Weekly" element={<Weekly/>} />

        <Route path="/UsersRecipes" element={<UsersRecipes />} />
        </>:null}
        {localStorage.getItem("userType") == 0 && "Bearer "+localStorage.getItem("token")? <>
        <Route path="/AdminApproval" element={<AdminApproval />} />
        </>:null}
      </Routes>
    </>
  );
}


