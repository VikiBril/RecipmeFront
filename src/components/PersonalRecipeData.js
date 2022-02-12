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
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { weekNumber } from 'weeknumber';

class PersonalRecipeData extends Component {

  constructor(props) {
    super(props);
  }
    
  render() {
    const a = this.props.recipeType == 1;
    return (
      <>
            <Typography variant="body2" color="text.secondary">
              {this.props.week}
            </Typography>
          
            <Typography variant="body2" color="text.secondary">
              {this.props.day}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {this.props.hour}
            </Typography>
          </>
    );
  }
}
export default PersonalRecipeData;
