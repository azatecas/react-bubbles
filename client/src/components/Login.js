import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin ] = useState({
    username:'',
    password:''
  });

  const history = useHistory();


  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/login`, login)
      .then(res => {
        console.log(res);
        window.localStorage.setItem('token', res.data.payload);
        history.push('/bubblepage')
      })
      .catch(err => {
        console.log('error login in', err);
      })

  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          label="username"
          value={login.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          label="password"
          value={login.password}
          onChange={handleChange}
          required
        />
        <button type="submit" >Login</button>
      </form>
    </>
  );
};

export default Login;
