import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorMessage: null
    }
  }

  render() {
    return (
      <div className="log-in-form">
        { this.state.errorMessage != null &&
          <p className="error-message">Uh oh! {this.state.errorMessage}</p>
        }
        <form>
          <label>Username:</label>
          <input type="text" name="username" autoComplete="username" onChange={this.handleUsernameChange} />
          <label>Password:</label>
          <input type="password" name="password" autoComplete="current-password" onChange={this.handlePasswordChange}/>
          <div className="action-buttons centered">
            <button className="teal" onClick={this.handleLogin}> Login </button>
            <br/><br/>
            Need an account?
            <button className="purple" onClick={this.props.toggle}> Register </button>
          </div>
        </form>
      </div>

    )
  }

  handleLogin = (event) => {
    event.preventDefault();
    Meteor.loginWithPassword(this.state.username, this.state.password, (err) => {
      if (err) {
        if (err.error == 400) {
          this.setState({errorMessage: "Please submit a username and password to log in."})
        } else {
          this.setState({errorMessage: err.reason});
        }
      } else {
        this.setState({errorMessage: null});
      }

      if (Meteor.user() != null) {
        //On user success, we redirect them to the index page.
        this.props.getNotifs();
        this.props.history.push({
          pathname: '/'
        });
        this.props.dismiss();
      }
    })
  }

  handleUsernameChange = (event) => {
    this.setState({username: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }
}



export default withRouter(LoginForm);
