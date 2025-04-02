
import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser, deleteUser, editUsers } from '../api/apiService';
import { useState } from 'react';

const Dashboard = () => {

  const queryClient = useQueryClient();
  const [formdata, setformData] = useState({
    name: '',
    username: ''
  })


  const [state, setstate] = useState(false);


  //states for updated data

  const [newdata, setnewdata] = useState({
    newname: formdata.name,
    newuname: formdata.username,

  });

  const [editid, setid] = useState();
  //  const [newname,setnewname]=useState(formdata.name);
  //  const [newuname,setnewuname]=useState(formdata.username);


  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  })


  const mutation = useMutation({
    mutationFn: (formdata) =>{
      console.log(formdata)
      createUser(formdata.name, formdata.username)},
    onSuccess: () => {
      console.log("User added");
      queryClient.invalidateQueries({ queryKey: ['users'] })
      //queryClient.setQueriesData(['users']);
    },
    onError: () => {
      console.log("Error in creating user");
    }
  })

  const { mutate: deletethisuser } = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => { queryClient.invalidateQueries(['users']); }

  })

  // const editmutation = useMutation({
  //   mutationFn: (updatedData) => {
  //     //console.log(updatedData.id,updatedData);
  //     editUsers({userId :updatedData.id, ...updatedData})},
    
  //   onSuccess: () => {
  //     // setformData
  //     setformData(...formdata,
  //       updatedData
  //     )

  //   }
  // })

  const editmutation = useMutation({
    mutationFn: (updatedData) => {
      return editUsers(updatedData); 
     
    },
    onSuccess: () => {
      console.log("User edited successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setstate(false);  
      setid(null);  
      setnewdata({ newname: "", newuname: "" }); 
    }
    ,
    onError: () => {
      console.log("Error updating user");
    }
  });
  


  const showForm = (userId) => {
    
    
    return (

      
      <div>
        <form>
          <input type="text" value={newdata.newname} name='newname' onChange={(e) =>
            setnewdata((prev) => ({
              ...prev,
              newname: e.target.value
            }))} />
          <input type='text' value={newdata.newuname} name='newuname' onChange={(e) => setnewdata((prev) => ({
            ...prev,
            newuname: e.target.value
          }))} />
          {/* <button type="button" onClick={() =>{
            
            console.log(userId,newdata,90)
            editmutation.mutate({ id: userId, name: newdata.newname, username: newdata.newuname });}}>Save</button> */}
          <button type="button" onClick={() => {
            console.log(editid, newdata, 90);
            editmutation.mutate({ id: editid, name: newdata.newname, username: newdata.newuname });
          }}>
            Save
          </button>


        </form>
      </div>
    )
  }





  const handleChange = (e) => {
    setformData({ ...formdata, [e.target.name]: e.target.value });
  }


  if (isLoading) { return <p>Loading....</p> }

  if (isError) {
    return <p>Error</p>
  }


  return (
    <div>
      <div>
        <h4>Add users : </h4>
        <input placeholder='Add name' value={formdata.name} type='text' name='name' onChange={handleChange} />
        <input placeholder='Add username' value={formdata.username} type='text' name='username' onChange={handleChange} />
        <button onClick={() => mutation.mutate(formdata)} >Add</button>
      </div>

      <table>
        <thead>
          {/* <td>ID</td> */}
          <td>Name</td>
          <td>Username</td>
          <td>Delete-user</td>
          <td>Edit user</td>
        </thead>
        <tbody>
          {
            data?.map((user) => (
              <tr key={user.id}>

                <td>{user.name}</td>
                <td>{user.username}</td>
                <button onClick={() => deletethisuser(user.id)}>Delete</button>


                <button onClick={() => {
                  setid(user.id);
                  setnewdata({ newname: user.name, newuname: user.username }); // ✅ Set the form with existing user data
                  setstate(true);
                }} type='button'>Edit</button>


            
                {state && (user.id === editid) ? showForm(editid) : null}

              </tr>
            ))
          }


        </tbody>

      </table>
    </div>
  )
}

export default Dashboard;