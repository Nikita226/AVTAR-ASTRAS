import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AllInstances = () => {

    const [allPasses, setAllPasses] = useState([])

    
    useEffect(
        () => {
          axios({
            method: "GET",
            url:
              "https://passwordmanagerfinal.herokuapp.com/api/secrets/"+localStorage.getItem("username"),
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token"),
            },
          })
            .then((response) => {
                setAllPasses(response.data)
            })
            .catch((err) => {
              alert("Somthing went wrong!");
            });
        }, []
      )

    let listOfInstances = []
    for(let i=0; i<allPasses.length; i++)
    {
      
      listOfInstances.push(<div className="col-lg-4 col-md-4 col-sm-12" style={{borderStyle: "dotted", color: "red"}}>
          <h3>{allPasses[i].username}</h3>
            <h3>{allPasses[i].website}</h3>
            <h3>{allPasses[i].password}</h3>
            <br/>
            <button className="btn btn-primary btn-sm" onClick={() => window.location="/Instance/"+allPasses[i].id}>Explore</button>
      </div>)
    }
  

    return(
        <>
            <h2>All Your Instances:</h2>

            <br/><br/>
            
            <div>
            {listOfInstances.map((item, index) => (
                    item
                     ))}
            </div>
            
        </>
    )
}




/*

https://github.com/sanjayausare/BeyondStatic/blob/main/src/Dashboard/MyProjects.jsx
*/

export default AllInstances;