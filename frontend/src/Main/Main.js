import React from 'react'

export default function Main() {

    // const logoutHandler = () => {
    //     localStorage.setItem("token", null);
    //     localStorage.setItem("username", null);
    //     window.location="/"
    // }

    // let isLoggedOut = false;
    // if(localStorage.getItem("username") === null)
    // {
    //     isLoggedOut = true;
    // }

    return (
        <div>
            <h1>Landing Page</h1>
            <br/>
            <br/>
            <div>
                <br/>
                <br/>
                <a href="/login">Login</a>
                <br/>
                <br/>
                <a href="/signup">Sign Up</a>
                <br/>
                <br/>
            </div>
            <a href="/createInstance">Create Secret</a>
            <br/>
            <br/>
            <a href="/AllInstances">All Secrets</a>
            <br/>
            <br/>
            <a href="https://truptipatil04.github.io/passwordgenerator/">Password Generator</a>
            <br/>
            <br/>
            <a href="https://mrunalk05.github.io/PasswordAnalyzer/">Password Analyzer</a>
                        
        </div>
    )
}
