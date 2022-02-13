import React, { Component } from "react";
import Recipe from "./Recipe";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Fab } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import  { Navigate  } from 'react-router-dom'
import { Link } from 'react-router-dom';


const styleFab = {
    width: "150px",
    height: "50px",
    fontSize:"10px",
    fontWeight: "bold",
    border: "2.10345px solid #FFFFFF",
    boxShadow: "0px 4.2069px 4.2069px (236, 236, 236, 1)",
    backgroundColor: "#5a9e6c",
    color: "white"
  };

class UsersRecipes extends Component {
    constructor(props) {
        super(props);
        //const week = weekNumber(new Date());
        this.serverUrl = "http://localhost:3001";
        this.state = {
            users: [],
        }
        this.getUsers = this.getUsers.bind(this);

    }
    getUsers() {
        axios.get(`${this.serverUrl}/user/users?userId=michal@gmail.com`).then(
            (users) => {console.log({users}) 
            this.setState({ users: users.data })
            }
        );
    }
    componentDidMount() {
        this.getUsers()
    }
    render() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User name</TableCell>
                            <TableCell align="right">User lastname</TableCell>
                            <TableCell align="right">Show Weekly Schedule</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.users.map((row) => (
                            <TableRow
                                key={row.firstName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" key={row.firstName}>
                                    {row.firstName}
                                </TableCell>
                                <TableCell align="right" key={row.lastName}>{row.lastName}</TableCell>
                                <TableCell align="right" key={row.userId}>
                                <Link to={"/Weekly?userId="+row.userId} > 

                                    <Fab style={styleFab} size="small" variant="extended" >
                                    <EventAvailableIcon ></EventAvailableIcon>
                                    Add to schedule
                                    </Fab>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}
export default UsersRecipes;