import React, { Component } from "react";
import Recipe from "./Recipe";
import axios from "axios";
import { weekNumber } from "weeknumber";
import { Grid } from "@mui/material";
import RecipeForms from "./RecipeForms";

class PersonalRecipes extends Component {
  constructor(props) {
    super(props);
    const week = weekNumber(new Date());
    this.serverUrl = "http://localhost:3001";
    this.state = {
      recipes: [],
      week: week,
      showAddForm: true,
      recipeData: {},
      recipeUpdateIndex: 0,
    };
    this.loadRecipies = this.loadRecipies.bind(this);

    this.borderCallback = null;
    this.render = this.render.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.displayAddForm = this.displayAddForm.bind(this);
    this.showUpdateForm = this.showUpdateForm.bind(this);
  }

  add(name, description, imgurl, day, week, hour, ingredients, repeat, url) {
    const postBody = {
      day: this.state.day,
      url: url,
      imgUrl: imgurl,
      recipeName: name,
      user: localStorage.getItem("userId"),
      week: week,
      repeat: repeat,
      hour: hour,
      day: day,
      recipeType: 1,
      ingredients: ingredients,
      description: description,
    };
    console.log(postBody);
    axios
      .post(`${this.serverUrl}/recipe`, postBody, {
        headers: {
          "x-access-token": "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((recipes) => {
        console.log("recipe added=]");
      })
      .catch((err) => {
        if (err.response.status == 403) {
          window.location.href = "/";
        }
      });
  }
  delete(id) {
    console.log(id);
    axios
      .delete(`${this.serverUrl}/recipe`, {
        data: {
          id: id,
        },
        headers: {
          "x-access-token": "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  }

  update(recipeData, id) {
    const postBody = {
      id: recipeData["id"],
      url: recipeData["url"],
      imgurl: recipeData["imgurl"],
      user: localStorage.getItem("userId"),
      recipeType: 1,
      ingredients: recipeData["ingredients"],
      name: recipeData["name"],
      description: recipeData["description"],
    };
    console.log(postBody);
    axios
      .put(`${this.serverUrl}/recipe`, postBody, {
        headers: {
          "x-access-token": "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((recipe) => {
        window.location.reload();
        console.log("recipe updated=]");
        this.setState({ showAddForm: true });
      })
      .catch((err) => {
        if (err.response.status == 403) {
          window.location.href = "/";
        }
      });
  }

  displayAddForm() {
    this.setState({ showAddForm: true });
  }

  showUpdateForm(recipeData, borderCallback) {
    this.setState({ showAddForm: false, recipeData: recipeData });
    this.forceUpdate();
    this.borderCallback = borderCallback;
  }

  loadRecipies() {
    console.log(this.state.week);
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const recipeId = params.get("recipeId");
    axios
      .get(`${this.serverUrl}/recipe?user=${localStorage.getItem("userId")}`, {
        headers: {
          "x-access-token": "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((recipes) => {
        const recipesList = recipes.data;
        if (recipeId != null) {
          const index = recipesList.findIndex((item) => item._id == recipeId);
          const tmp = recipesList[index];
          recipesList[index] = recipesList[0];
          recipesList[0] = tmp;
        }
        this.setState({ recipes: recipesList });
      })
      .catch((err) => {
        if (err.response.status == 403) {
          window.location.href = "/";
        }
      });
  }

  componentDidMount() {
    this.loadRecipies();
  }

  render() {
    console.log(this.state.recipes);
    const recipeList = this.state.recipes.map((recipe) => {
      const props = {
        _id: `${recipe["_id"]}`,
        name: `${recipe["recipeName"]}`,
        description: `${recipe["description"]}`,
        imgurl: `${recipe["image"]}`,
        day: `${recipe["day"]}`,
        week: `${recipe["week"]}`,
        hour: `${recipe["hour"]}`,
        ingredients: `${recipe["ingredients"]}`,
        status: `${recipe["approved"]}`,
        url: `${recipe["url"]}`,
        recipeType: `${recipe["recipeType"]}`,
      };
      return (
        <Grid item xs={12} md={6} sm={12}>
          <Recipe
            key={props.name}
            {...props}
            updateForm={this.showUpdateForm}
            deleteRecipe={this.delete}
          />
        </Grid>
      );
    });
    return (
      <Grid container>
        <Grid container xs={12} sm={6} md={6}>
          {recipeList}
        </Grid>
        <Grid item alignItems="center" xs={6} md={6} sm={4}>
          <RecipeForms
            key={this.state.recipeData["url"]}
            name={this.state.recipeData["name"]}
            description={this.state.recipeData["description"]}
            imgurl={this.state.recipeData["imgurl"]}
            day={this.state.recipeData["day"]}
            week={this.state.recipeData["week"]}
            hour={this.state.recipeData["hour"]}
            url={this.state.recipeData["url"]}
            recipeId={this.state.recipeData["_id"]}
            updateRecipe={this.update}
            disableForm={this.displayAddForm}
            addRecipe={this.add}
            showAddForm={this.state.showAddForm}
          />
        </Grid>
      </Grid>
    );
  }
}
export default PersonalRecipes;
