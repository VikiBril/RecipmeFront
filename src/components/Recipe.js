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
import BugReportIcon from '@mui/icons-material/BugReport';
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
  width: "160px" ,
  alignItems: 'center',
  fontFamily: "Arial",
  left: "10px",
  top: "114px",
  backgroundColor: "#FFFFFF",
  boxShadow: "0px 100px 80px rgba(153, 165, 236, 0.05), 0px 64.8148px 46.8519px rgba(153, 165, 236, 0.037963), 0px 38.5185px 25.4815px rgba(153, 165, 236, 0.0303704), 0px 20px 13px rgba(153, 165, 236, 0.025), 0px 8.14815px 6.51852px rgba(153, 165, 236, 0.0196296), 0px 1.85185px 3.14815px rgba(153, 165, 236, 0.012037)",
};



class Recipe extends Component {

  constructor(props) {
    super(props);
    this.state = { day: 1, hour: 1, open: false };
    this.repeat = 1;
    this.dialogMessage = "has been saved";
    this.render = this.render.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOpen = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handelUrl=this.handelUrl.bind(this);
    this.handleReport=this.handleReport.bind(this);
    this.serverUrl = "https://recipmeapp.herokuapp.com"
  }

  handelUrl(){
    window.location=this.props.url;
  }

  handleClickOpen() {
    this.dialogMessage = "has been saved";
    this.setState({ open: true });
  }

  handleReport() {
    const postBody = {url:this.props.url}
    axios.post(`${this.serverUrl}/blacklist`, postBody,{headers:{ 'x-access-token': "Bearer "+localStorage.getItem("token") }})
    .then(() => {
      this.dialogMessage = "has been reported";
      this.setState({ open: true });
    }).catch((err) =>  {
      if (err.response.status == 403) {
        window.location.href = "/";
      }
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleClick() {
    const url = "https://recipmeapp.herokuapp.com";
    var week = weekNumber(new Date());
    const approved = this.props.status;

    const postBody = {
      "day": this.state.day,
      "url": this.props.url,
      "imgUrl": this.props.imgurl,
      "recipeName": this.props.name,
      "user": localStorage.getItem("userId"),
      "week": week,
      "repeat": this.repeat,
      "hour": this.state.hour,
      "recipeType": this.props.recipeType,
      "ingredients": this.props.ingredients,
      "description": this.props.description,
      "approved": approved
    }
    axios.post(`${url}/recipe`, postBody,{headers:{ 'x-access-token': "Bearer "+localStorage.getItem("token") }})
      .then((recipes) => {
        this.setState({ recipes: recipes.data, open: true });
      }).catch((err) =>  {
        if (err.response.status == 403) {
          window.location.href = "/";
        }
      });
  };

  render() {
    const addedByUser = this.props.recipeType == 1;
    return (
      <Grid contuner item >
      <Card sytle={styleCard} className="Card" spasing={2} sx={{maxHeight: "510px",height: "510px",minWidth: "270px",maxWidth: "270px",borderRadius: "30px"}}>
        <CardActions>
        <CardMedia sx={{ maxHeight: "150px" }}
          component="img"
          height="130"
          onClick={this.handelUrl}
          image={this.props.imgurl}
          alt="image of recipe"
          title="image of recipe"
        />
        </CardActions> 
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
          {addedByUser ? <PersonalRecipeData {...this.props}> </PersonalRecipeData> : null}
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
          <Fab style={styleFab} onClick={this.handleClick} size="small" variant="extended">
            <EventAvailableIcon ></EventAvailableIcon>
            Add to schedule</Fab>
        </CardActions>
        {!addedByUser ? <>
          <CardActions>
          <Fab style={styleFab} onClick={this.handleReport} size="small" variant="extended">
            <BugReportIcon ></BugReportIcon>
            Report Recipe</Fab>
        </CardActions>
        </>:null}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Recipe {this.props.name} {this.dialogMessage}
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
