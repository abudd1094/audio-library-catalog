import React, {Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ // hook syntax
    email: '',
    password: ''
  });
  
  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value }) // will set specific field in state copying all the rest of the pre-existing formData; allows us to type 

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password)
  }  

  // Redirect if logged in
  if(isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="auth-form">
      <h4 className="auth-form__header">Sign In</h4>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input 
            className="auth-form__input"
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="auth-form__input"
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn-basic" value="Login" />
      </form>
      <p className="auth-form__comment">
        Don't have an account? <Link to="/register" className="auth-form__comment--link">Sign Up</Link>
      </p>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);