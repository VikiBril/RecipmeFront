import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab, FormGroup } from '@mui/material';
const styleFab = {
  width: "35.76px",
  height: "35.76px",
  border: "2.10345px solid #FFFFFF",
  boxShadow: "0px 4.2069px 4.2069px rgba(236, 236, 236, 1)",
  backgroundColor: "#8fcbd9",
  color: "white"
};
const styleBoxIcon = {
  marginLeft: "200px",
  marginTop: "-19px",
};
class PersonalRecipeData extends Component {

  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);

  }
    
  updateCard() {
    const properies = {'name':this.props.name,
                      'url':this.props.url,
                      'description':this.props.description,
                      'imgurl':this.props.imgurl,
                      'day': this.props.day,
                      'hour': this.props.hour,
                      'week': this.props.week,
                      '_id':this.props._id}
    this.props.updateForm(properies, this.disableSelctedBorder);
  }

  render() {
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
      <Box style={styleBoxIcon}>
        <Fab size="medium" style={styleFab} aria-label="edit" >
          <EditIcon onClick={() => {this.updateCard()}} />
        </Fab>
        <Fab size="medium" style={styleFab} aria-label="delete" >
              <DeleteIcon onClick={() => {
              this.props.deleteRecipe(this.props.index)}} />
        </Fab>
        </Box> 
      </>
    );
  }
}
export default PersonalRecipeData;
