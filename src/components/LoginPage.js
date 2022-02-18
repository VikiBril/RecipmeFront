import React, { Component } from "react";
import Logo from "../assets.media/Logo.jpg";
import axios from 'axios';
import { Grid, Paper, TextField, Button } from '@material-ui/core'

const paperStyle = {
  padding: 20,
  height: '78vh',
  width: 300,
  margin: "20px auto"
};
const btnstyle = {
  margin: '8px 0',
  marginTop: '40px'
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
      password: ""
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange = (event) => {
    this.setState({ [event.target.userId]: event.target.value });
  };


  handleSubmit = (event) => {
    const url = "http://localhost:3001";
    const userData = {
      userId: this.state.userId,
      password: this.state.password
    };
    axios.get(`${url}/user/login/?userId=${this.state.userId}&password=${this.state.password}`)
      .then((res) => {
        this.setState({ userId: this.props.userId, password: this.props.password });
        localStorage.setItem("userId", res.data.user.userId);
        localStorage.setItem("userName",res.data.user.userName);
        localStorage.setItem("userType", res.data.user.userType);
        localStorage.setItem("token", res.data.accessToken);
        window.location.href = "/RecipesList";
      }).catch((err) => console.log(err));
  };
  render() {
    return (
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'></Grid>
          <img src={Logo} alt="Logo" style={styleImg} />
          <h2>Sign In</h2>
          <TextField label='Username' placeholder='Enter Email' fullWidth required onChange={event => this.state.userId = event.target.value}/>
          <TextField label='Password' placeholder='Enter password' type='password' fullWidth required onChange={event => this.state.password = event.target.value} />
          <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={()=>this.handleSubmit()}>Sign in</Button>
        </Paper >
      </Grid >
    );
  }
}
export default Login;
