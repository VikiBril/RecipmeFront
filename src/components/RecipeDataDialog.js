import React, { Component } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

class RecipeDataDialog extends Component {

    constructor(props) {
      super(props);
    }

    render() {
        return (

            <Dialog
                open={this.props.dataOpen}
                onClose={()=>this.props.closeRecipeData()}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{this.props.recipeName}</DialogTitle>
                <DialogContent dividers={true}>
                <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                >
                    <img src={this.props.imgUrl}></img>
                    <Typography variant="h6" gutterBottom component="div">
                    Ingredients
                    </Typography>
                    {this.props.ingredients}

                    <Typography variant="h6" gutterBottom component="div">
                    Recipe
                    </Typography>
                    {this.props.description}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={()=>this.props.closeRecipeData()}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default RecipeDataDialog;
