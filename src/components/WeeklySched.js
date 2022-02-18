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
    this.state = { week: week, recipes: null, dialogOpen: false };
    this.url = "http://localhost:3001";
    this.recipeUrl = "";
    this.recipeName = "";
    this.recipeId = "";
    this.imgUrl = "";
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
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    console.log(params.get("userId"));
    const userId =
      params.get("userId") != null ? params.get("userId") : "michal@gmail.com";
    axios
      .get(`${this.url}/recipe?user=${userId}&week=${this.state.week}`)
      .then((recipes) => {
        const recipesDict = {};
        for (var i = 1; i <= 7; i++) {
          recipesDict[i] = {};
          for (var j = 1; j <= 3; j++) {
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
      })
      .catch((err) => console.log(err));
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
          onChangeCommitted={(event, value) => {
            this.setState({ week: value });
            this.getRecipies();
          }}
        />
        <RecipeDialog
          open={this.state.dialogOpen}
          closeDialog={this.closeDialog}
          recipeName={this.recipeName}
          recipeId={this.recipeId}
          recipeUrl={this.recipeUrl}
          description={this.description}
          ingredients={this.ingredients}
          imgUrl={this.imgUrl}
        ></RecipeDialog>

        <ScheduleTable
          key={1}
          recipes={this.state.recipes}
          openDialog={this.openDialog}
        ></ScheduleTable>
      </>
    );
  }
}
export default WeeklySched;
