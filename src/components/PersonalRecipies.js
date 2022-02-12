import React, { Component } from "react";
import Recipe from "./Recipe";
import axios from 'axios';
import { weekNumber } from 'weeknumber';
class PersonalRecipes extends Component {

    constructor(props) {
        super(props);
        const week = weekNumber(new Date());
        this.url = "http://localhost:3001";
        this.state = {recipes: [], week:week};
        this.loadRecipies = this.loadRecipies.bind(this);
      }

      loadRecipies() {
        console.log(this.state.week);
        axios.get(`${this.url}/recipe?user=michal@gmail.com&week=${this.state.week}`)
            .then((recipes) =>{
            this.setState({ recipes: recipes.data });
            }).catch((err)=>console.log(err));
      }

      componentDidMount(){
        this.loadRecipies();
      }

      render() {
        console.log(this.state.recipes);
        const recipeList = this.state.recipes.map((recipe) => {
          const props = {
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
          return <Recipe key={props.name} {...props} />;
        });
        return <div className="grid-list">
          {recipeList}
          </div>;
      }
}
export default PersonalRecipes;
