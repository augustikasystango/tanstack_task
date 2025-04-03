import { useMutation } from '@tanstack/react-query'
import React from 'react';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { validateUser } from '../api/apiService';
import Button from '../common/Button';

const Login = () => {

  const navigate = useNavigate();

    const [formdata,setformdata]=useState({
        username:'',
        password:''
    })
    //localStorage.removeItem('token');
    const useLoginMutation = () => {
      return useMutation({
          mutationFn: validateUser,
          onSuccess: (data) => {
              //console.log(data?.accessToken);
              const n_token = localStorage.setItem('token',data?.accessToken);
              console.log(n_token);
               
              console.log("loging data",);

              if(data?.firstName)
              {
                console.log("----navigated")
                navigate('/dashboard');
  
              }
              else{
                alert("Invalid  data")
               // navigate('./login')
              }
              //  localStorage.setItem("token",data?.accessToken);
            
              //console.log('Login successful:', data);
          },
          onError: (error) => {
              // Handle error (e.g., display error message)
              console.error('Login error:', error);
          },
      });
  };
    

    const handleChange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value});
      

    }

    const { mutate, isLoading, isError, error } = useLoginMutation(); 
    {isLoading && <p>Logging in...</p>}
    {isError && <p>Error: {error.message}</p>}
    const handleClick = async (e) => {
        e.preventDefault();
        console.log(formdata);
        mutate(formdata ); 
    };

    

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        className="login-input"
        placeholder='Enter your username'
        type='text'
        name='username'
        value={formdata.username}
        onChange={handleChange}
      />
      <input
        className="login-input"
        placeholder='Enter password'
        type='password'
        name='password'
        value={formdata.password}
        onChange={handleChange}
      />
      <Button text="Login" className="login-button" type='submit' onClick={handleClick}/>
       
      {isLoading && <p className="login-message">Logging in...</p>}
      {isError && <p className="login-message error">Error: {error.message}</p>}
    </div>
  );
}

export default Login