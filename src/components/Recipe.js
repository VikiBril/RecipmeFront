import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import { weekNumber } from 'weeknumber';
import PersonalRecipeData from './PersonalRecipeData';

const styleFab = {
  width: "35.76px",
  height: "35.76px",
  border: "2.10345px solid #FFFFFF",
  boxShadow: "0px 4.2069px 4.2069px rgba(255, 102, 71, 0.25)",
  backgroundColor: "#FF6647",
  color: "white"
};

const styleBoxIcon = {
  marginLeft: "200px",
  marginTop: "-19px",
};

class Recipe extends Component {

  constructor(props) {
    console.log(props);
    super(props);
    this.state = {day:1, hour:1,open:false};
    this.repeat = 1;
    this.render = this.render.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOpen = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen(){
    this.setState({ open: true });
  };

  handleClose(){
    this.setState({ open:false });
  };

  handleClick () {
    const url = "http://localhost:3001";
    var week = weekNumber(new Date());
    const postBody = {"day":this.state.day,
    "url": "https://www.foodnetwork.com/recipes/ina-garten/brown-rice-tomatoes-and-basil-recipe-1945224",
    "imgUrl":this.state.imgurl,
    "recipeName":this.props.name,
    "user":"michal@gmail.com",
    "week": week,
    "repeat": this.repeat,
    "hour": this.state.hour,
    "recipeType": 0,
    "ingredients": this.props.ingredients,
    "description":"put rise in hot water, wait for 15 minutes"}
    axios.post(`${url}/recipe`,postBody)
    .then((recipes) =>{
      this.setState({ recipes: recipes.data ,open: true});
    }).catch((err)=>console.log(err));
 };

  render() {
    const showingData = this.props.recipeType == 1;
    return (
      <Card className="Card" sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image = {this.props.imgurl}
          alt="image of recipe"
          title="image of recipe"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {this.props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {this.props.description}
          </Typography>
           {showingData? <PersonalRecipeData {...this.props}> </PersonalRecipeData>:null}
           <InputLabel id="demo-simple-select-label">Day</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.day}
            label="Days"
            onChange={event =>this.setState({ day: event.target.value }) }
            >

            <MenuItem value={1}>Sunday</MenuItem>
            <MenuItem value={2}>Monday</MenuItem>
            <MenuItem value={3}>Tuesday</MenuItem>
            <MenuItem value={4}>Wednesday</MenuItem>
            <MenuItem value={5}>Thursday</MenuItem>
            <MenuItem value={6}>Friday</MenuItem>
            <MenuItem value={7}>Saturday</MenuItem>
          </Select>   
          <InputLabel id="hour-label">Hour</InputLabel>

          <Select
            labelId="hour-label"
            id="hour"
            value={this.state.hour}
            label="Set Hour"
            onChange={event =>this.setState({ hour: event.target.value }) }
            >
            <MenuItem value={1}>Breakfast</MenuItem>
            <MenuItem value={2}>Lunch</MenuItem>
            <MenuItem value={3}>Dinner</MenuItem>

          </Select>           
          <TextField id="outlined-basic" label="repeat" variant="standard"  
          onChange={event =>this.repeat= event.target.value } ></TextField> 
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this.handleClick}>Add to sced</Button>
          
          {/* <Button size="small">Learn More</Button> */}
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
      </Card>
    );
  }
}
export default Recipe;
