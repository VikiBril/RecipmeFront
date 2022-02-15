import React, { Component } from "react";
import Logo from "../assets.media/Logo.jpg";
import axios from "axios";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { withRouter } from "react-router";

const paperStyle = {
  padding: 20,
  height: "78vh",
  width: 300,
  margin: "20px auto",
};
const btnstyle = {
  margin: "8px 0",
  marginTop: "40px",
};

const styleImg = {
  marginLeft: "24%",
  width: "150px",
  height: "120px",
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({ [event.target.userId]: event.target.value });
  };

  handleSubmit = (event) => {
    const url = "http://localhost:8080";
    const userData = {
      userId: this.state.userId,
      password: this.state.password,
    };
    axios.get(
      `${url}/user/login/?userId=${this.state.userId}&password=${this.state.password}`
    );
    /*
      .then((user) => {
        //look for a function that saves in local storage
        this.props.history(`/myRecipes`);
      })
      .catch((err) => console.log(err));
      */
  };

  render() {
    return (
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center"></Grid>
          <img src={Logo} alt="Logo" style={styleImg} />
          <h2>Sign In</h2>
          <TextField
            label="Username"
            placeholder="Enter Email"
            fullWidth
            required
            onChange={(event) => (this.state.userId = event.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            onChange={(event) => (this.state.password = event.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={() => this.handleSubmit()}
          >
            Sign in
          </Button>
        </Paper>
      </Grid>
    );
  }
}
export default Login;
