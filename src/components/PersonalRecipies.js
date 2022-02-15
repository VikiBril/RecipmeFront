import React, { Component } from "react";
import Recipe from "./Recipe";
import axios from 'axios';
import { weekNumber } from 'weeknumber';
import { Grid } from '@mui/material';
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
      recipeUpdateIndex: 0
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

  add(name,
    description,
    imgurl,
    day,
    week,
    hour,
    ingredients,
    repeat,
    url) {
    const postBody = {
      "day": this.state.day,
      "url": url,
      "imgUrl": imgurl,
      "recipeName": name,
      "user": "michal@gmail.com",
      "week": week,
      "repeat": repeat,
      "hour": hour,
      "day": day,
      "recipeType": 1,
      "ingredients": ingredients,
      "description": description
    }
    console.log(postBody);
    axios.post(`${this.serverUrl}/recipe`, postBody)
      .then((recipes) => {
        console.log("recipe added=]");
      }).catch((err) => console.log(err));
  }

  delete(id) {
    this.recipesDataList = this.recipesDataList.filter(recipe => recipe.id !== id)
    this.displayAddForm();
  }

  update(recipeData, id) {
    const postBody = {
      "id": recipeData['id'],
      "url": recipeData['url'],
      "imgurl": recipeData['imgurl'],
      "user": "michal@gmail.com",
      "recipeType": 1,
      "ingredients": recipeData['ingredients'],
      "name": recipeData['name'],
      "description": recipeData['description']
    }
    console.log(postBody);
    axios.put(`${this.serverUrl}/recipe`, postBody)
      .then((recipes) => {
        console.log("recipe updated=]");
        this.setState({ showAddForm: true });
      }).catch((err) => console.log(err));
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
    axios.get(`${this.serverUrl}/recipe?user=michal@gmail.com&week=${this.state.week}`)
      .then((recipes) => {
        this.setState({ recipes: recipes.data });
      }).catch((err) => console.log(err));
  }

  componentDidMount() {
    this.loadRecipies();
  }

  render() {
    console.log(this.state.recipes);
    const recipeList = this.state.recipes.map((recipe) => {
      const props = {
        _id: `${recipe['_id']}`,
        name: `${recipe['recipeName']}`,
        description: `${recipe['description']}`,
        imgurl: `${recipe['image']}`,
        day: `${recipe['day']}`,
        week: `${recipe['week']}`,
        hour: `${recipe['hour']}`,
        ingredients: `${recipe['ingredients']}`,
        status: `${recipe['approved']}`,
        url: `${recipe['url']}`,
        recipeType: `${recipe['recipeType']}`,
      };
      return <Grid item xs={12} md={4} sm={3}>
      <Recipe key={props.name} {...props} 
      updateForm={this.showUpdateForm} deleteRecipe={this.delete} />
      </Grid>;
    });
    return (
    <>

      <Grid container>
          {recipeList}
        <Grid item xs={6} md={4} sm={3}>
          <RecipeForms key={this.state.recipeData['url']} name={this.state.recipeData['name']}
            description={this.state.recipeData['description']}
            imgurl={this.state.recipeData['imgurl']}
            day={this.state.recipeData['day']}
            week={this.state.recipeData['week']}
            hour={this.state.recipeData['hour']}
            url={this.state.recipeData['url']}
            recipeId={this.state.recipeData['_id']}
            updateRecipe={this.update} disableForm={this.displayAddForm}
            addRecipe={this.add}
            showAddForm={this.state.showAddForm} />

        </Grid>
      </Grid>
    </>);
  }
}
export default PersonalRecipes;
