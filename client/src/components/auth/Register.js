import React, {Fragment, useState } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => { // destructure setAlert action from props
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  
  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }) // set state w hook

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2) {
      setAlert('Passwords do not match', 'danger') // action setAlert takes msg and alert type, here we link the alert type to css we are using

    } else {
      register({ name, email, password }); // passing destructured data into the action
    } 
  } 

  // Redirect if logged in
  if(isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-form">
      <h4 className="auth-form__header">Sign Up</h4>
      <form onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input 
            className="auth-form__input"
            type="text" 
            placeholder="Name" 
            name="name" 
            value={name} 
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input 
            className="auth-form__input"
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email}
            onChange={e => onChange(e)}
          />

        </div>
        <div className="form-group">
          <input
            className="auth-form__input"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            className="auth-form__input"
            type="password"
            placeholder="Confirm Password"
            name="password2" 
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn-basic" value="Register" />
      </form>
      <p className="auth-form__comment">
        Already have an account? <Link to="/login" className="auth-form__comment--link">Sign In</Link>
      </p>
    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register); 