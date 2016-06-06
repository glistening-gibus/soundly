// get username
// get user email
// get user password
// store in user variable, and pass to db

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import App from './App.jsx';


export default class SignupView extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSignup(e) {
    e.preventDefault();
    this.sendFormData(this.handleSuccess);
  }

  handleSuccess(result) {
    const roomID = result.user.roomid;
    browserHistory.push('main/' + roomID);
    // programmatically add the room param to the root
    window.sessionStorage.accessToken = result.token;
  }

  sendFormData(callback) {
    const formData = {
      username: this.refs.username.value,
      password: this.refs.password.value,
    };
    // send data
    $.ajax({
      url: '/api/users/signup',
      contentType: 'application/x-www-form-urlencoded',
      type: 'POST',
      data: formData,
      success: function(result) {
        callback(result);
      },
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      },
    });
  }

  render() {
    return (
      <div>
        <h1 id="heading">Signup!</h1>
        <form onSubmit={this.handleSignup.bind(this)}>
          <div className="form-group">
            <label htmlFor="username">Select a username</label>
            <input className="form-control" name="username" ref="username" required type="text"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Select a password</label>
            <input className="form-control" name="password" ref="password" required type="text"/>
          </div>
          <div className="form-group">
          <button>submit</button>
          </div>
        </form>
      </div>
    );
  }
}
