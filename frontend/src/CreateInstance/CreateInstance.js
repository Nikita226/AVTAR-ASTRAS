import React from 'react'
import {useState} from 'react'
import axios from "axios";

export default function CreateInstance() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [website, setWebsite] = useState("");

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
        usersUsername: localStorage.getItem("username"),
        username: username,
        website: website,
        password: password,
      };
  
      const url = "https://passwordmanagerfinal.herokuapp.com/api/createsecret";
        
        axios.post(
            url,
            body,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
              }
            }
          ).then(
            response => {
                if(response.status === 200){
    
                  const data = response.data;
                  if(data.status === "200 OK")
                  {
                    window.location="/"
                    return 0;
                  }
                  window.location = '/createSecret'
                }
            }
          )
          .catch(
            err => {
                console.log(err)
                window.location="/createSecret"
            }
          );
    
    }
    
    
    return (
        <div>
                <form onSubmit={submitHandler} >
                <label htmlFor="username">username</label><br />
                <input type="text" name="username" onChange={usernameHandler} /><br /><br />
                <label htmlFor="website">website</label><br />
                <input type="text" name="website" onChange={websiteHandler}/><br /><br />
                <label htmlFor="password">password</label><br />
                <input type="password" name="password" onChange={passwordHandler}/><br /><br />
                < button type="submit">SUBMIT</button>
                </form>
        </div>
    )
}
