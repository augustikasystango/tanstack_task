// import api from "./axiosInstance";
import axios from "axios";

const fetchUsers =async()=>{
    console.log("ghfbjgth");
    try{
        const resp = await axios.get(`https://67eb8191aa794fb3222a78fb.mockapi.io/users/users`);
        console.log(resp.data);
        console.log("ghfbjgth--------");
        return resp.data;
        
    }
    catch(error){
        console.log(`Error fetching data`);
        console.error(error);
        throw error;
    }
}

const createUser=async(name,username)=>{
    console.log(name);
   console.log(username);

    try{
        const resp = await axios.post(`https://67eb8191aa794fb3222a78fb.mockapi.io/users/users`,{name,username});
        
        console.log(resp.data);
        return resp.data;

    }catch(error){
  console.log(`Cannit add data `,error);
    }
}


const deleteUser=async(userId)=>{
    try{
        const response= await axios.delete(`https://67eb8191aa794fb3222a78fb.mockapi.io/users/users/${userId}`);
        return response.data;
       // console.log(`Deleted post with ID ${userId}`);
    }catch(error){
    console.log("Cannot be deleted",error);
    }

}

const editUsers=async({ id, name, username })=>{
    
    //console.log(id,newdata,49);
    
    try{
        const response = await axios.put(`https://67eb8191aa794fb3222a78fb.mockapi.io/users/users/${id}`,   { name, username });
        console.log(response);
        return response.data;
    }catch(err){
        console.log("Cannot update",err);
    }
}

const validateUser = async({username, password}) => {
    try{
        const resp = await axios.post(' https://dummyjson.com/auth/login', {
            username,
            password
        });
        console.log(resp);
        return resp.data
        const token = resp.data.accessToken;
        localStorage.setItem('token',token);
        // console.log(token);
        // console.log(resp);

    }
    catch(error){
console.log(error)
    }
}






export {fetchUsers,validateUser,createUser,deleteUser,editUsers};