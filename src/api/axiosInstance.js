import axios from "axios";



const api = axios.create({
    baseURL: `https://67eb8191aa794fb3222a78fb.mockapi.io/users`,
    
  });
api.interceptors.request.use((
    (config)=>{
      console.log("Request interceptor added");
      return config;
    },
    (error)=>{
        console.log('error ---');
        return Promise.reject.error;
    }
))

api.interceptors.response.use((
  (response)=>{
    console.log("Response added");
    return response
  },
  (error)=>{
    console.log("Error")
    return Promise.reject.error;

  }
))

export default api;