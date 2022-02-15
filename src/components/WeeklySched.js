import React, { Component } from "react";
import axios from "axios";
import { weekNumber } from "weeknumber";
import ScheduleTable from "./ScheduleTable";
import { useSearchParams } from "react-router-dom";

class WeeklySched extends Component {
  constructor(props) {
    super(props);
    this.week = weekNumber(new Date());
    this.state = { recipes: null };
    this.url = "http://localhost:8080";
    this.rows = [
      this.createData(
        "Breakfast",
        "Frozen yoghurt,Frozen yoghurt,Frozen yoghurt,Frozen yoghurt,Frozen yoghurt,Frozen yoghurt",
        "Frozen yoghurt",
        24,
        4.0
      ),
      this.createData("Lunch", "Ice cream sandwich", 237, 9.0, 37, 4.3),
      this.createData("Dinner", "Eclair", 262, 16.0, 24, 6.0),
    ];
    this.getRecipies = this.getRecipies.bind(this);
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
      .get(`${this.url}/recipe?user=${userId}&week=${this.week}`)
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
    return <ScheduleTable key={1} recipes={this.state.recipes}></ScheduleTable>;
  }
}
export default WeeklySched;
