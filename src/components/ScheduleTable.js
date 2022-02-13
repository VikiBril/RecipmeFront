import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";

const styleCell = {
    width: "50px"
};

const styleRow = {
    width: "50px"
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:'#8fcbd9',
    color: theme.palette.common.white,
    fontWeight: 'bold',
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

const meals = ["Breakfest","Lunch","Dinner"];

class ScheduleTable extends Component {
    render() {
        if(this.props.recipes!=null){
        console.log(this.props.recipes);
        }
  return (
    this.props.recipes != null ?  
    <TableContainer component={Paper}>
      <Typography align="center" variant="h3" component="div" gutterBottom>
      Weekly meal schedule of {this.props.name}
      </Typography>
      <Table sx={{ width: "900px", margin: "100px" }} aria-label="customized table">
        <TableHead sx={{ width: "900px" }}>
          <TableRow sx={{ width: "900px" }}>
            
          <StyledTableCell style={styleCell} align="center"></StyledTableCell>
            <StyledTableCell style={styleCell} align="center">Sunday</StyledTableCell>
            <StyledTableCell style={styleCell} align="center">Monday</StyledTableCell>
            <StyledTableCell style={styleCell} align="center">Tuesday</StyledTableCell>
            <StyledTableCell style={styleCell} align="center">Wednesday</StyledTableCell>
            <StyledTableCell style={styleCell} align="center">Thursday</StyledTableCell>
            <StyledTableCell style={styleCell} align="center">Friday</StyledTableCell>
            <StyledTableCell style={styleCell} align="center">Saturday        </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {[1,2,3].map((i) => (
            <StyledTableRow >
              <StyledTableCell style={styleCell} align="center">{meals[i-1]}</StyledTableCell>
              <StyledTableCell style={styleCell} align="center">{this.props.recipes[1][i].map((recipe)=>(
                  <a id={recipe.url} href={recipe.url}>{recipe.name}</a>
              ))}</StyledTableCell>
              <StyledTableCell style={styleCell} align="center">{this.props.recipes[2][i].map((recipe)=>(
                  <a id={recipe.url} href={recipe.url}>{recipe.name}</a>
              ))}</StyledTableCell>
              <StyledTableCell style={styleCell} align="center">{this.props.recipes[3][i].map((recipe)=>(
                  <a id={recipe.url} href={recipe.url}>{recipe.name}</a>
              ))}</StyledTableCell>
                <StyledTableCell style={styleCell} align="center">{this.props.recipes[4][i].map((recipe)=>(
                  <a id={recipe.url} href={recipe.url}>{recipe.name}</a>
              ))}</StyledTableCell>
              <StyledTableCell style={styleCell} align="center">{this.props.recipes[5][i].map((recipe)=>(
                  <a id={recipe.url} href={recipe.url}>{recipe.name}</a>
              ))}</StyledTableCell>
              <StyledTableCell style={styleCell} align="center">{this.props.recipes[6][i].map((recipe)=>(
                  <a id={recipe.url} href={recipe.url}>{recipe.name}</a>
              ))}</StyledTableCell>
                            <StyledTableCell style={styleCell} align="center">{this.props.recipes[7][i].map((recipe)=>(
                  <a id={recipe.url} href={recipe.url}>{recipe.name}</a>
              ))}</StyledTableCell>
            </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>:<div>ehh</div>
   
  );
}
}
export default ScheduleTable;
