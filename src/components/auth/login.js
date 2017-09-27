import _ from 'lodash';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import Header from '../header';
import $ from 'jquery';

class Login extends Component {

  componentWillMount() {
    if (this.props.authenticated){
      browserHistory.push('/dashboard')
    }

  }
  componentDidMount() {
    
    _.delay(()=>{
      var form = $(".login-form");
      form.css({
          opacity: 1,
          "-webkit-transform": "scale(1)",
          "transform": "scale(1)",
          "-webkit-transition": ".5s",
          "transition": ".5s"
      });
    },500);
  }

  handleFormSubmit({username, password}) {
    _.delay(() => {
      this.props.authLogin({username, password});
    }, 1000);
  }

  render(){
    const { handleSubmit } = this.props;
    const { username, password } = this.props.fields;

    return(
      <div className="login-form padding20 block-shadow">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <h1 className="text-light">Login to Service</h1>
            <hr className="thin" />
            <br />
            <div className="input-control text full-size" data-role="input">
                <label>User email:</label>
                <input {...username} type="text" name="user_login" id="user_login" />
                <button className="button helper-button clear"><span className="mif-cross"></span></button>
            </div>
            <br />
            <br />
            <div className="input-control password full-size" data-role="input">
                <label>User password:</label>
                <input {...password} type="password" name="user_password" id="user_password" />
                <button className="button helper-button reveal"><span className="mif-looks"></span></button>
            </div>
            <br />
            <br />
            <div className="form-actions">
                <button type="submit" className="button primary">Login to...</button>
                <button type="button" className="button link">Cancel</button>
            </div>
            </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  // const emailPattern  = /(.+)@(.+){2,}\.(.+){2,}/;
  
  if (!values.username) {
    errors.username = 'Please enter username';
  }

  // if (values.username) {
  //   if (!emailPattern.test(values.username)) {
  //     errors.username = 'Enter valid your email.';
  //   }
  // }

  if (!values.password) {
      errors.password = 'Please enter a password';
  }
  
  if (values.password && values.password.length < 6){
    errors.password = 'Password must be at least 6 characters.';
  }
  return errors;
}

function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated }
}

export default reduxForm({ 
  form: 'login',
  fields: [ 'username', 'password'],
  validate
}, mapStateToProps, actions)(Login);