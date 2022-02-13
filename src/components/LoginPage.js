import React, { Component } from "react";
import { ReactComponent as Logo } from "../assets.media/Logo.jpg";
class Login extends Component {
  state = {
    email: "",
    pwd: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {};
  render() {
    return (
      <div>
        <div>
          <Logo />
        </div>
        <div>
          <form>
            <input
              type="email"
              name="email"
              placeholder="You're email is.."
              required
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="pwd"
              placeholder="Password.."
              required
              onChange={this.handleChange}
            />
            <button onSubmit={this.handleSubmit}>Log in</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
