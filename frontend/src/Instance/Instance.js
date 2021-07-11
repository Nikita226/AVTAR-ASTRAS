import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Instance = ({
    match: {
      params: { id },
    },
  }) => {

    



    const [pass, setPass] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [website, setWebsite] = useState("")

    useEffect(
        () => {
        axios({
            method: "GET",
            url:
            "https://passwordmanagerfinal.herokuapp.com/api/thesecret/"+id,
            headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
            },
        })
            .then((response) => {
                console.log(response.data);
                setUsername(response.data.username)
                setWebsite(response.data.website)
                setPassword(response.data.password)
                return
            })
            .catch((err) => {
            alert("Somthing went wrong!");
            });
        }, []
    )
    
    
    const usernameHandler = (e) => {
        setUsername(e.target.value);
      };
    
    const websiteHandler = (e) => {
        setWebsite(e.target.value);
    };
      
    const passwordHandler = (e) => {
    setPassword(e.target.value);
    };
    
    const submitHandler = (e) => {
    e.preventDefault();

    const body = {
        username: username,
        website: website,
        password: password,
      };

    axios
      .put("https://passwordmanagerfinal.herokuapp.com/api/thesecret/" + id, body, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if(response.data.status === "200 OK")
          {
              alert("Successfully updated")
              window.location = "/AllInstances"
          }
          else
          {
            alert("Some Error Occurred")
            window.location = "/Instance/"+id
          }
        }
      })
      .catch(
        () => {
            alert("Some Error Occurred")
            window.location = "/Instance/"+id
          }
      );


    }

    const deleteHandler = (e) => {
    e.preventDefault();

    axios
    .delete("https://passwordmanagerfinal.herokuapp.com/api/thesecret/" + id, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (response.status === 200) {
        if(response.data.status === "204")
        {
            alert("Deleted Successfully")
          window.location = "/AllInstances"
        }
        else
        {
          alert('Some Error Occurred. We got this.')
          window.location = "/Instance/"+id
        }
      }
    })
    .catch(
      () => {
        alert('Some Error Occurred. We got this.')
        window.location = "/Instance/"+id
      });

        }


    

    return(
        <div style={{backgroundColor: "blue", width: "100%", height: "100%"}}>
            <form onSubmit={submitHandler} >
                <label htmlFor="username">Username</label><br />
                <input type="text" name="username" value={username} onChange={usernameHandler} placeholder={username} required /><br /><br />
                <label htmlFor="website">Website</label><br />
                <input type="text" name="website" value={website} onChange={websiteHandler} placeholder={website} required /><br /><br />
                <label htmlFor="password">Password</label><br />
                <input type="password" name="password" value={password} onChange={passwordHandler} placeholder={password} required /><br /><br />
                < button type="submit" className="btn btn-success">Update</button>
            </form>
            <br/>
            < button onClick={deleteHandler} className="btn btn-danger">Delete</button>
        </div>
    )
}



export default Instance;