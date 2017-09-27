import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { Link } from 'react-router';
import { authRegister } from '../../actions';
import { reduxForm } from 'redux-form';

class Register extends Component {

  handleFormSubmit(props) {
    _.delay(()=>{
      this.props.authRegister(props);
    },1000);
  }

  render() {
    const {handleSubmit} = this.props;
    const {username, password, confirmPassword, fullname, taxno, company} = this.props.fields;

    return (
      <div className="container">
        <div className="card card-register mx-auto mt-5">
          <div className="card-header">
            Register an Account
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                    <label>TaxNo.</label>
                    <input 
                      {...taxno}
                      type="text" 
                      className={ taxno.touched && taxno.error? "error form-control form-control-sm" : "form-control form-control-sm"} />
                    <div className="error">
                      {taxno.touched && taxno.error ? taxno.error:""}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label>Company</label>
                    <input 
                      {...company}
                      type="text" 
                      className="form-control form-control-sm" />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Fullname</label>
                <input 
                  {...fullname}
                  type="text" 
                  className="form-control form-control-sm"/>
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input 
                  {...username}
                  type="email" 
                  className={username.touched && username.error? "error form-control form-control-sm":"form-control form-control-sm"} />
                <div className="error">
                  {username.touched && username.error ? username.error :""}
                </div>
              </div>
              <div className="form-group">
              <div className="form-row">
                <div className="col-md-6">
                  <label>Password</label>
                  <input 
                    {...password}
                    type="password" 
                    className={password.touched && password.error ? "error form-control form-control-sm":"form-control form-control-sm"} placeholder="Password" />
                  <div className="error">
                  {password.touched && password.error ? password.error : ""}
                  </div>
                </div>
                <div className="col-md-6">
                  <label>Confirm password</label>
                  <input 
                    {...confirmPassword}
                    type="password" 
                    className={confirmPassword.touched && confirmPassword.error ?"error form-control form-control-sm":"form-control form-control-sm"} placeholder="Confirm password" />
                  <div className="error">
                  {confirmPassword.touched && confirmPassword.error ? confirmPassword.error : ""}
                  </div>
                </div>
              </div>
            </div>
            <button action="submit" className="btn btn-primary btn-block">Register</button>
            </form>
            <div className="text-center">
              <Link to="/login" className="d-block small mt-3">Login Page</Link>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({authRegister},dispatch);
}

function validate(values) {
  const errors = {}

  if(!values.taxno){
    errors.taxno = "Please enter Taxnumber.";
  }

  if (!values.username) {
    errors.username = "Please enter email.";
  }

  if (!values.password) {
    errors.password = "Please enter password.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please enter confirm password.";
  }

  if (values.password) {
    if (values.password.length < 6){
      errors.password = "Password must be at least 6 characters.";
    }
  }

  if (values.confirmPassword){
    if (values.password !== values.confirmPassword) {
      errors.password = 'Password must match';
      errors.confirmPassword = 'Password must match';
    }
  }
  
  return errors;
}

export default reduxForm({
  form: 'register',
  fields: ['username', 'password', 'confirmPassword', 'fullname', 'taxno', 'company'],
  validate
}, null, mapDispatchToProps)(Register);