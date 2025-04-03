import React, { useEffect } from "react";
import Button from "../common/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUsers,
  createUser,
  deleteUser,
  editUsers,
} from "../api/apiService";
import { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [formdata, setformData] = useState({
    name: "",
    username: "",
  });

  const [state, setstate] = useState(false);

  //states for updated data

  const [newdata, setnewdata] = useState({
    newname: formdata.name,
    newuname: formdata.username,
  });

  const [editid, setid] = useState();
  //  const [newname,setnewname]=useState(formdata.name);
  //  const [newuname,setnewuname]=useState(formdata.username);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: (formdata) => {
      console.log(formdata);
      createUser(formdata.name, formdata.username);
    },
    onSuccess: () => {
      console.log("User added");
      queryClient.invalidateQueries({ queryKey: ["users"], });
      
      //queryClient.setQueriesData(['users']);
    },
    onError: () => {
      console.log("Error in creating user");
    },

    
  });

  const { mutate: deletethisuser } = useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
     
    },
  });

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
    },
    onError: () => {
      console.log("Error updating user");
    },
  });

  const showForm = (userId) => {
    return (
      <div className="edit-form-container">
        <form className="edit-form">
          <input
            type="text"
            value={newdata.newname}
            name="newname"
            onChange={(e) =>
              setnewdata((prev) => ({
                ...prev,
                newname: e.target.value,
              }))
            }
          />
          <input
            type="text"
            value={newdata.newuname}
            name="newuname"
            onChange={(e) =>
              setnewdata((prev) => ({
                ...prev,
                newuname: e.target.value,
              }))
            }
          />
          <Button
            text="Save"
            className="edit-form-button"
            type="button"
            onClick={() => {
              editmutation.mutate({
                id: editid,
                name: newdata.newname,
                username: newdata.newuname,
              });
            }}
          />
        </form>
      </div>
    );
  };

  const handleChange = (e) => {
    setformData({ ...formdata, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="user-form">
        <h4>Add Users</h4>
        <input
          placeholder="Add name"
          value={formdata.name}
          type="text"
          name="name"
          onChange={handleChange}
        />
        <input
          placeholder="Add username"
          value={formdata.username}
          type="text"
          name="username"
          onChange={handleChange}
        />
       
        <Button
          text="Add"
          onClick={() => mutation.mutate(formdata)}
          className="add-btn"
        />
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>
                <Button
                  text="Delete"
                  className="delete-btn"
                  onClick={() => deletethisuser(user.id)}
                />
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setid(user.id);
                    setnewdata({ newname: user.name, newuname: user.username });
                    setstate(true);
                  }}
                >
                  Edit
                </button>
              </td>
              {state && user.id === editid && (
                <tr className="edit-row">
                  <td colSpan="4">
                    <input
                      type="text"
                      value={newdata.newname}
                      name="newname"
                      onChange={(e) =>
                        setnewdata({ ...newdata, newname: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      value={newdata.newuname}
                      name="newuname"
                      onChange={(e) =>
                        setnewdata({ ...newdata, newuname: e.target.value })
                      }
                    />
                    <Button
                     text="Save"
                      onClick={() =>
                        editmutation.mutate({
                          id: editid,
                          name: newdata.newname,
                          username: newdata.newuname,
                        })
                      }
                    />
                    
                  </td>
                </tr>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;