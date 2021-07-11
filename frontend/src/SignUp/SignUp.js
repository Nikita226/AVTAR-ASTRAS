import React from 'react'
import {useState} from 'react'
import axios from 'axios'

export default function SignUp() {

    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const fNameHandler = (e) => {
        setFName(e.target.value);
    }
    const lNameHandler = (e) => {
        setLName(e.target.value);
    }
    const usernameHandler = (e) => {
        setUsername(e.target.value);
    }
    const emailHandler = (e) => {
        setEmail(e.target.value);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    //where to send, what to send, headers(metad)

    const submitHandler = (e) => {
        e.preventDefault();

        const body = {
            "username": username,
            "fname": fname,
            "lname": lname,
            "email": email,
            "password": password
        }

        const url = "https://passwordmanagerfinal.herokuapp.com/api/SignUp";

        axios.post(
            url,
            body,
            {
              headers: {
                'Content-Type': 'application/json',
              }
            }
          ).then(
            response => {
                if(response.status === 200){

                  const data = response.data;
                  if(data.status === "400 Bad Request")
                  {
                    window.location="/signup"
                    return 0;
                  }
                  if(data.status === "403 User already exists")
                  {
                    window.location="/signup"
                    return 0;
                  }
                  localStorage.setItem('username', data.username);
                  localStorage.setItem('token', data.token);
                  window.location = '/'
                }
            }
          )
          .catch(
            err => {
                console.log(err)
                window.location="/signup"
            }
          );

    }
    


    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="fname">First Name</label><br />
                <input type="text" name="fname" onChange={fNameHandler} required/><br /><br />
                <label htmlFor="lname">Last Name</label><br />
                <input type="text" name="lname" onChange={lNameHandler} required/><br /><br />
                <label htmlFor="email">Email</label><br />
                <input type="email" name="email" onChange={emailHandler} required/><br /><br />
                <label htmlFor="password">password</label><br />
                <input type="password" name="password" onChange={passwordHandler} required/><br /><br />
                <label htmlFor="username">username</label><br />
                <input type="username" name="username" onChange={usernameHandler} required/><br /><br />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}