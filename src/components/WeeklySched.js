import React, { Component } from "react";
import axios from "axios";
import { weekNumber } from "weeknumber";
import ScheduleTable from "./ScheduleTable";
import RecipeDialog from "./RecipeDialog";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "../Styles/weeklySched.css";

class WeeklySched extends Component {
    constructor(props) {
        super(props);
        const week = weekNumber(new Date());
        this.state = {week: week,recipes: null, dialogOpen:false};
        this.url = "https://recipmeapp.herokuapp.com";
        this.recipeUrl = ""
        this.recipeName = ""
        this.recipeId = ""
        this.imgUrl = ""
        const windowUrl = window.location.search;
        const params = new URLSearchParams(windowUrl);
        console.log(params.get("userId"));
        this.userId = params.get("userId") != null ? params.get("userId") :localStorage.getItem("userId");
        this.userNameTable =  params.get("userName") != null ? params.get("userName") :localStorage.getItem("userName");
        this.isOwner = this.userId == localStorage.getItem("userId");
        this.getRecipies = this.getRecipies.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.render = this.render.bind(this);
        
        }

  closeDialog() {
    this.setState({ dialogOpen: false });
  }

  valuetext(value) {
    return `week: ${value}`;
  }

  openDialog(
    recipeUrl,
    recipeName,
    recipeId,
    description,
    ingredients,
    imgUrl
  ) {
    this.recipeUrl = recipeUrl;
    this.recipeName = recipeName;
    this.recipeId = recipeId;
    this.ingredients = ingredients;
    this.description = description;
    this.imgUrl = imgUrl;

    this.setState({ dialogOpen: true });
  }

  componentDidMount() {
    this.getRecipies();
  }

    getRecipies() {

        axios.get(`${this.url}/recipe?user=${this.userId}&week=${this.state.week}`,{headers:{ 'x-access-token': "Bearer "+localStorage.getItem("token") }})
        .then((recipes) =>{
            const recipesDict = {}
            for (var i=1; i <= 7; i++) {
                recipesDict[i] = {};
                for (var j=1; j <= 3; j++) {
                    recipesDict[i][j] = [];
                } 
            } 

        recipes.data.forEach((recipe) => {
          const day = parseInt(recipe["day"], 10);
          const hour = recipe["hour"];
          recipesDict[day][hour].push({
            name: recipe["recipeName"],
            url: recipe["url"],
            _id: recipe["_id"],
            description: recipe["description"],
            ingredients: recipe["ingredients"],
            imgUrl: recipe["image"],
          });
        });
        this.setState({ recipes: recipesDict });
        }).catch((err)=>{
            if (err.response.status == 403) {
                window.location.href = "/";
              }
        });
    }

  createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  render() {
    return (
      <>
        <h2>Choose a week</h2>
        <Slider
  aria-label="Temperature"
  defaultValue={this.state.week}
  getAriaValueText={this.valuetext}
  valueLabelDisplay="auto"
  step={1}
  marks
  min={0}
  max={52}
  onChangeCommitted={(event,value) => {this.setState({ week:value });this.getRecipies()}}
/>
        <RecipeDialog open={this.state.dialogOpen}
                     closeDialog = {this.closeDialog}
                     recipeName={this.recipeName}
                     recipeId={this.recipeId}
                     recipeUrl={this.recipeUrl}
                     description={this.description}
                     ingredients={this.ingredients}
                     imgUrl={this.imgUrl} isOwner={this.isOwner}
                     ></RecipeDialog>

        <ScheduleTable
          key={1}
          userId = {this.userNameTable}
          recipes={this.state.recipes}
          openDialog={this.openDialog}
        ></ScheduleTable>
      </>
    );
  }
}
export default WeeklySched;
