import React, { Component } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from "@mui/material/Button";
import RecipeDataDialog from './RecipeDataDialog'
import axios from 'axios';

class WeeklySched extends Component {
    constructor(props) {
        super(props);
        this.serverUrl = "http://localhost:3001";
        this.openRecipeData = this.openRecipeData.bind(this);
        this.render = this.render.bind(this);
        this.state = {
            dataOpen:false
          };
        this.closeRecipeData = this.closeRecipeData.bind(this);
        this.remove = this.remove.bind(this);

    }

    remove(id) {
        const postBody = {
          "id": id,
        }
        axios.post(`${this.serverUrl}/recipe/remove`, postBody)
          .then(() => {
            window.location.reload(false);
          }).catch((err) => console.log(err));
      }

    openRecipeData(){
        this.setState({dataOpen: true});
    }

    closeRecipeData(){
        this.setState({dataOpen: false});
    }

    render(){
        console.log(this.props.open)
        return (<>
        <RecipeDataDialog closeRecipeData={()=>this.closeRecipeData()} dataOpen={this.state.dataOpen} imgUrl={this.props.imgUrl} recipeName={this.props.recipeName} ingredients={this.props.ingredients} description={this.props.description} ></RecipeDataDialog>
        <Dialog onClose={this.props.closeDialog} open={this.props.open}>
            <DialogTitle>{this.props.recipeName}</DialogTitle>
            <List sx={{ pt: 0 }}>
                <ListItem >
                    <Button onClick={()=>{this.openRecipeData()}}>
                        Open
                    </Button>
                </ListItem>
                <ListItem >
                    <Button href={"/myRecipes?recipeId="+this.props.recipeId}>
                        Edit
                    </Button>
                </ListItem>
                <ListItem  >
                    <Button onClick={()=>{this.remove(this.props.recipeId)}}>
                        Remove
                    </Button>
                </ListItem>
                <ListItem  >
                    <Button onClick={()=>{this.props.closeDialog()}}>
                    Close
                    </Button>
                </ListItem>
            </List>
        </Dialog>
        </>
        );
        }                   
}
export default WeeklySched;
