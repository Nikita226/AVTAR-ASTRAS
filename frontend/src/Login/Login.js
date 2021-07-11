import React from "react";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    

    const body = {
      username: username,
      password: password,
    };

    const url = "https://passwordmanagerfinal.herokuapp.com/api/login";

    axios
      .post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          if (data.status === "400 Bad Request") {
            //window.location = "/login";
            console.log("yo")
            return 0;
          }
          localStorage.setItem("username", data.username);
          localStorage.setItem("token", data.token);
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Some Error Occurred")
        window.location = "/login";
      });
    }

    return (
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">username</label>
          <br />
          <input
            type="username"
            name="username"
            onChange={usernameHandler}
            required
          /><br/><br/>
          <label htmlFor="password">password</label>
          <br />
          <input
            type="password"
            name="password"
            onChange={passwordHandler}
            required
          /><br/><br/>
          <button type="submit">log In</button>
        </form>
      </div>
    );
};
