import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';


export const RegisterScreen = () => {

  const [formValues, handleInputChange] = useForm({
    username: '',
    password: ''
  });

  const { username, password } = formValues;
  
  const handleRegister = (e) => {
    e.preventDefault();

    Accounts.createUser({
      username: username,
      password: password
    });

    Meteor.loginWithPassword(username, password);
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form 
        onSubmit={ handleRegister }
        className="animate__animated animate__fadeIn animate__faster"
      >
        <input 
          type="text"
          placeholder="Username"
          name="username"
          className="auth__input"
          required
          autoComplete="off"
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
          Register
        </button>

        <Link 
          to="login"
          className="link"
        >
          Already register?
        </Link>
      </form>
    </>
  );
}
