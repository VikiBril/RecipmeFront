import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import LinesEllipsis from 'react-lines-ellipsis'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Fab, Grid } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import { weekNumber } from 'weeknumber';
import PersonalRecipeData from './PersonalRecipeData';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
const styleFab = {
  height: "40px",
  flex: 1,
  fontSize: "10px",
  fontWeight: "bold",
  bottom:0,
  border: "2.10345px solid #FFFFFF",
  boxShadow: "0px 4.2069px 4.2069px (236, 236, 236, 1)",
  backgroundColor: "#5a9e6c",
  color: "white",
};
const styleCard = {
  width: "150px" ,
  alignItems: 'center',
  fontFamily: "Arial",
  left: "50px",
  top: "114px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 100px 80px rgba(153, 165, 236, 0.05), 0px 64.8148px 46.8519px rgba(153, 165, 236, 0.037963), 0px 38.5185px 25.4815px rgba(153, 165, 236, 0.0303704), 0px 20px 13px rgba(153, 165, 236, 0.025), 0px 8.14815px 6.51852px rgba(153, 165, 236, 0.0196296), 0px 1.85185px 3.14815px rgba(153, 165, 236, 0.012037)",
};


class Recipe extends Component {

  constructor(props) {
    super(props);
    this.state = { day: 1, hour: 1, open: false };
    this.repeat = 1;
    this.render = this.render.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOpen = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handelUrl=this.handelUrl.bind(this);
  }
  handelUrl(){
    const url=this.props.url;
  }
  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };


  handleClick() {
    const url = "http://localhost:3001";
    var week = weekNumber(new Date());
    const postBody = {
      "day": this.state.day,
      "url": "https://www.foodnetwork.com/recipes/ina-garten/brown-rice-tomatoes-and-basil-recipe-1945224",
      "imgUrl": this.state.imgurl,
      "recipeName": this.props.name,
      "user": "michal@gmail.com",
      "week": week,
      "repeat": this.repeat,
      "hour": this.state.hour,
      "recipeType": 0,
      "ingredients": this.props.ingredients,
      "description": "put rise in hot water, wait for 15 minutes"
    }
    axios.post(`${url}/recipe`, postBody)
      .then((recipes) => {
        this.setState({ recipes: recipes.data, open: true });
      }).catch((err) => console.log(err));
  };

  render() {
    const showingData = this.props.recipeType === 1;
    return (
      <Grid contuner item >
      <Card sytle={styleCard} className="Card" sx={{height: "500px",maxWidth: "270px",borderRadius: "30px"}}>
        <CardMedia sx={{ maxHeight: "150px" }}
          component="img"
          height="130"
          onClick={this.handelUrl}
          image={this.props.imgurl}
          alt="image of recipe"
          title="image of recipe"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
            {this.props.name}
          </Typography>
          
          <Typography display="block" variant="body2" color="text.secondary">
          <LinesEllipsis
              text={this.props.description}
              maxLine='3'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </Typography>
          {showingData ? <PersonalRecipeData {...this.props}> </PersonalRecipeData> : null}
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'bold'}}>
            Set day and time:
          </Typography>
          <Grid container columnSpacing={{aglinContent:"center", xs: 12, sm: 4, md: 6 }}>
            <Grid item xs={5}>
              <Select sx={{ width: 100, height: 30, fontSize: "12px" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.day}
                label="Set day and time"
                onChange={event => this.setState({ day: event.target.value })}
              >
                <MenuItem value={1}>Sunday</MenuItem>
                <MenuItem value={2}>Monday</MenuItem>
                <MenuItem value={3}>Tuesday</MenuItem>
                <MenuItem value={4}>Wednesday</MenuItem>
                <MenuItem value={5}>Thursday</MenuItem>
                <MenuItem value={6}>Friday</MenuItem>
                <MenuItem value={7}>Saturday</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={2}>
              <Select sx={{ fontSize: "12px", width: 100, height: 30 }}
                labelId="hour-label"
                id="hour"
                value={this.state.hour}
                label="Set Hour"
                onChange={event => this.setState({ hour: event.target.value })}
              >
                <MenuItem value={1}>Breakfast</MenuItem>
                <MenuItem value={2}>Lunch</MenuItem>
                <MenuItem value={3}>Dinner</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <TextField sx={{ fontSize: "5px" }} id="outlined-basic" label="repeat" variant="standard"
            onChange={event => this.repeat = event.target.value} ></TextField>
        </CardContent>
        <Grid contuiner>
        <CardActions>
          <Fab style={styleFab} size="small" variant="extended">
            <EventAvailableIcon onClick={this.handleClick}></EventAvailableIcon>
            Add to schedule</Fab>
        </CardActions>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Recipe {this.props.name} has been saved
          </DialogTitle>

          <DialogActions>
            <Button onClick={this.handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        </Grid>
      </Card>
      </Grid>
    );
  }
}
export default Recipe;
