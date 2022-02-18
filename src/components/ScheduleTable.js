import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import "../Styles/scheduleTable.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#8fcbd9",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const meals = ["Breakfest", "Lunch", "Dinner"];

class ScheduleTable extends Component {
  render() {
    console.log(this.props.recipes);
    return this.props.recipes != null ? (
      <TableContainer component={Paper}>
        <Typography className="HPage" component="div" gutterBottom>
          Weekly meal schedule of {this.props.name}
        </Typography>
        <Table
          sx={{ width: "900px", margin: "100px" }}
          aria-label="customized table"
        >
          <TableHead className="styleCell" sx={{ width: "900px" }}>
            <TableRow sx={{ width: "900px" }}>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>Sunday</StyledTableCell>
              <StyledTableCell>Monday</StyledTableCell>
              <StyledTableCell>Tuesday</StyledTableCell>
              <StyledTableCell>Wednesday</StyledTableCell>
              <StyledTableCell>Thursday</StyledTableCell>
              <StyledTableCell>Friday</StyledTableCell>
              <StyledTableCell>Saturday </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <StyledTableRow className="styleCell">
                <StyledTableCell>{meals[i - 1]}</StyledTableCell>
                <StyledTableCell>
                  {this.props.recipes[1][i].map((recipe) => (
                    <Button
                      variant="text"
                      onClick={() =>
                        this.props.openDialog(
                          recipe.url,
                          recipe.name,
                          recipe._id,
                          recipe.description,
                          recipe.ingredients,
                          recipe.imgUrl
                        )
                      }
                    >
                      {recipe.name}
                    </Button>
                  ))}
                </StyledTableCell>
                <StyledTableCell className="styleCell">
                  {this.props.recipes[2][i].map((recipe) => (
                    <Button
                      variant="text"
                      onClick={() =>
                        this.props.openDialog(
                          recipe.url,
                          recipe.name,
                          recipe._id,
                          recipe.description,
                          recipe.ingredients,
                          recipe.imgUrl
                        )
                      }
                    >
                      {recipe.name}
                    </Button>
                  ))}
                </StyledTableCell>
                <StyledTableCell className="styleCell">
                  {this.props.recipes[3][i].map((recipe) => (
                    <Button
                      variant="text"
                      onClick={() =>
                        this.props.openDialog(
                          recipe.url,
                          recipe.name,
                          recipe._id,
                          recipe.description,
                          recipe.ingredients,
                          recipe.imgUrl
                        )
                      }
                    >
                      {recipe.name}
                    </Button>
                  ))}
                </StyledTableCell>
                <StyledTableCell className="styleCell">
                  {this.props.recipes[4][i].map((recipe) => (
                    <Button
                      variant="text"
                      onClick={() =>
                        this.props.openDialog(
                          recipe.url,
                          recipe.name,
                          recipe._id,
                          recipe.description,
                          recipe.ingredients,
                          recipe.imgUrl
                        )
                      }
                    >
                      {recipe.name}
                    </Button>
                  ))}
                </StyledTableCell>
                <StyledTableCell className="styleCell">
                  {this.props.recipes[5][i].map((recipe) => (
                    <Button
                      variant="text"
                      onClick={() =>
                        this.props.openDialog(
                          recipe.url,
                          recipe.name,
                          recipe._id,
                          recipe.description,
                          recipe.ingredients,
                          recipe.imgUrl
                        )
                      }
                    >
                      {recipe.name}
                    </Button>
                  ))}
                </StyledTableCell>
                <StyledTableCell className="styleCell">
                  {this.props.recipes[6][i].map((recipe) => (
                    <Button
                      variant="text"
                      onClick={() =>
                        this.props.openDialog(
                          recipe.url,
                          recipe.name,
                          recipe._id,
                          recipe.description,
                          recipe.ingredients,
                          recipe.imgUrl
                        )
                      }
                    >
                      {recipe.name}
                    </Button>
                  ))}
                </StyledTableCell>
                <StyledTableCell className="styleCell">
                  {this.props.recipes[7][i].map((recipe) => (
                    <Button
                      variant="text"
                      onClick={() =>
                        this.props.openDialog(
                          recipe.url,
                          recipe.name,
                          recipe._id,
                          recipe.description,
                          recipe.ingredients,
                          recipe.imgUrl
                        )
                      }
                    >
                      {recipe.name}
                    </Button>
                  ))}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <div>ehh</div>
    );
  }
}
export default ScheduleTable;
