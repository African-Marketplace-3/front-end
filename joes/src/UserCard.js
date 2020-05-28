import React from "react";

function Card({details}){
    if (!details) {
        return <h3>Searching for your information...</h3>
    }


    return(
        <div>

            <h2>{details.name}</h2>
            <p>{details.email}</p>
            <p>{details.username}</p>
            <p>{details.password}</p>
            
           
        </div>
    )
}

export default Card;