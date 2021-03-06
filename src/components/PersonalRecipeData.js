import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import RecipeDataDialog from "./RecipeDataDialog";
import { Fab } from "@mui/material";
const styleFab = {
  width: "35.76px",
  height: "35.76px",
  border: "2.10345px solid #FFFFFF",
  boxShadow: "0px 4.2069px 4.2069px rgba(236, 236, 236, 1)",
  backgroundColor: "#8fcbd9",
  color: "white",
};
const styleBoxIcon = {
  position: 'relative',
  marginLeft: "53%",
};
class PersonalRecipeData extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.updateCard = this.updateCard.bind(this);
    this.closeRecipeData = this.closeRecipeData.bind(this);
  }

  closeRecipeData() {
    this.setState({ open: false });
  }

  openRecipeData() {
    this.setState({ open: true });
  }

  updateCard() {
    const properies = {
      name: this.props.name,
      url: this.props.url,
      description: this.props.description,
      imgurl: this.props.imgurl,
      day: this.props.day,
      hour: this.props.hour,
      week: this.props.week,
      status: this.props.status,
      _id: this.props._id,
    };
    this.props.updateForm(properies, this.disableSelctedBorder);
  }

  render() {
    return (
      <>
        <RecipeDataDialog
          dataOpen={this.state.open}
          imgUrl={this.props.imgurl}
          recipeName={this.props.name}
          ingredients={this.props.ingredients}
          description={this.props.description}
          closeRecipeData={() => this.closeRecipeData()}
        ></RecipeDataDialog>
        <Box style={styleBoxIcon}>
          <Fab size="medium" style={styleFab} aria-label="edit">
            <EditIcon
              onClick={() => {
                this.updateCard();
              }}
            />
          </Fab>
          <Fab size="medium" style={styleFab} aria-label="delete">
            <DeleteIcon
              onClick={() => {
                this.props.deleteRecipe(this.props._id);
              }}
            />
          </Fab>
          <Fab size="medium" style={styleFab} aria-label="delete">
            <DescriptionOutlinedIcon
              onClick={() => {
                this.openRecipeData();
              }}
            />
          </Fab>
        </Box>
      </>
    );
  }
}
export default PersonalRecipeData;
