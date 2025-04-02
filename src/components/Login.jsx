import { useMutation } from '@tanstack/react-query'
import React from 'react';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateUser } from '../api/apiService';


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
    // const { mutateAsync: doLogin } = useMutation(validateUser);

    const handleChange=(e)=>{
        setformdata({...formdata,[e.target.name]:e.target.value});
       // console.log({...formdata,[e.target.name]:e.target.value})
        // formdata.name = ' ';
        // formdata.password = ' ';

    }

    const { mutate, isLoading, isError, error } = useLoginMutation(); 
    {isLoading && <p>Logging in...</p>}
    {isError && <p>Error: {error.message}</p>}
    const handleClick = async (e) => {
        e.preventDefault();
        console.log(formdata);
        mutate(formdata ); 
    };

      //  const handleClick= async (e)=>{
      //       e.preventDefault();
      //      try{ 
            
      //       const response = await doLogin(formdata);
      //       console.log('Login Successful:', response);
           
          
      //       if(response?.data.firstName){
      //           console.log('responseeeee',response?.data.firstName);
      //           console.log("hfg------------")
      //           navigate('/dashboard');
                
      //       }else{
      //         alert(`Please login`);
      //         navigate('/login')
      //       }}
      //       catch(error){
      //         console.log(error);
      //       }
    
  
    
      //   }
    

  return (
    <div>
    <div style={{}}>Login</div>
    <input placeholder='Enter your username' type='text' name='username' value={formdata.username} onChange={handleChange} />

    <input placeholder='Enter password' type='password' name='password' value={formdata.password} onChange={handleChange}/>

    <button type='submit' onClick={handleClick}>Submit</button>
  </div>
  )
}

export default Login