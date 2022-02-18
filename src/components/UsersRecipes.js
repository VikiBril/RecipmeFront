import React, { Component } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Fab } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Link } from "react-router-dom";
import "../Styles/userRecipes.css";

class UsersRecipes extends Component {
  constructor(props) {
    super(props);
    //const week = weekNumber(new Date());
    this.serverUrl = "http://localhost:3001";
    this.state = {
      users: [],
    };
    this.getUsers = this.getUsers.bind(this);
  }
  getUsers() {
    axios
      .get(`${this.serverUrl}/user/users?userId=michal@gmail.com`)
      .then((users) => {
        console.log({ users });
        this.setState({ users: users.data });
      });
  }
  componentDidMount() {
    this.getUsers();
  }
  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="tableRow">
              <TableCell>User name</TableCell>
              <TableCell align="right">User last name</TableCell>
              <TableCell align="right">Show weekly schedule</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.users.map((row) => (
              <TableRow
                key={row.firstName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" key={row.firstName}>
                  {row.firstName}
                </TableCell>
                <TableCell align="right" key={row.lastName}>
                  {row.lastName}
                </TableCell>
                <TableCell align="right" key={row.userId}>
                  <Link to={"/Weekly?userId=" + row.userId}>
                    <Fab className="styleFab" variant="extended">
                      <EventAvailableIcon></EventAvailableIcon>
                      Show {row.firstName} schedule
                    </Fab>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default UsersRecipes;
