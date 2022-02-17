import React, { Component } from "react";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

class AdminApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {recipes: [],dialogOpen:false,recipeStatus:""};
    this.searchRecipe = this.searchRecipe.bind(this);
    this.url = "http://localhost:3001";
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this)
    this.searchRecipe = this.searchRecipe.bind(this);

  }

  handleClickOpen (status) {
    this.setState({ dialogOpen: true,recipeStatus:status });
  };

  handleClose () {
    this.setState({ dialogOpen: false });
  };

  searchRecipe() {
    axios.get(`${this.url}/recipe/approval`,{headers:{ 'x-access-token': "Bearer "+localStorage.getItem("token") }})
      .then((recipes) =>{
        this.setState({ recipes: recipes.data });
      }).catch((err)=>console.log(err));
  }

  componentDidMount(){
    this.searchRecipe();
  }
  
  recipeStatus(status, recipeId) {
    axios.post(`${this.url}/recipe/approval`,{approved:status,id:recipeId},{headers:{ 'x-access-token': "Bearer "+localStorage.getItem("token") }})
    .then(() =>{
      this.handleClickOpen(status);
    }).catch((err) =>  {
      if (err.response.status == 403) {
        window.location.href = "/";
      }
    });
  }

  render() {

      return(     
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>name</StyledTableCell>
            <StyledTableCell align="canter">ingredientLines</StyledTableCell>
            <StyledTableCell align="canter">description</StyledTableCell>
            <StyledTableCell align="canter">image url</StyledTableCell>
            <StyledTableCell align="canter">url</StyledTableCell>
            <StyledTableCell align="canter"></StyledTableCell>
            <StyledTableCell align="canter"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.recipes.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.recipeName}
              </StyledTableCell>
              <StyledTableCell align="canter">{row.ingredients}</StyledTableCell>
              <StyledTableCell align="canter">{row.description}</StyledTableCell>
              <StyledTableCell align="canter">{row.image}</StyledTableCell>
              <StyledTableCell align="canter">{row.url}</StyledTableCell>
              <StyledTableCell align="canter">
                <Button onClick={()=>this.recipeStatus("approved",row['_id'])}>Approve</Button></StyledTableCell>
              <StyledTableCell align="canter">
                <Button onClick={()=>this.recipeStatus("rejected",row['_id'])}>Reject</Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={this.state.dialogOpen}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`recipe successfully ${this.state.recipeStatus}`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={this.handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>);
    }
}

export default AdminApproval;
