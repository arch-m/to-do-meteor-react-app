import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
  const [formValues, handleInputChange ] = useForm({
    username: 'meteorite',
    password: 'password'
  });

  const { username, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password);
  }

  return (
    <>
      <h3 className="auth__title">Login</h3>

      <form 
        onSubmit={ handleLogin }
        className="animate__animated animate__fadeIn animate__faster"
      >
        <input 
          type="text"
          placeholder="Username"
          name="username"
          className="auth__input"
          autoComplete="off"
          required
          value={ username }
          onChange={ handleInputChange }
        />

        <input 
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          required
          value={ password }
          onChange={ handleInputChange }
        />

        <button
          type="submit"
          className="btn"
        >
          Login
        </button>
        
        <Link 
            to="register"
            className="link"
          >
            Create new account 
        </Link>
      </form>
    </>
  );
};