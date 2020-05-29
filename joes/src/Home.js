import React, {useState, useEffect, useRef} from "react";
import {Route, Link} from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';
import Form from './Form';
import {TweenMax, Power3} from 'gsap';


function Home(){

    let imgItem = useRef(null);
    
    useEffect(() => {
        console.log(imgItem)
        TweenMax.to(
            imgItem,
            .8,
            {
                opacity: 1,
                y: -20,
                ease: Power3.easeOut
            }
        )
    }, [])
    
    return(
        <div>
        <div>
        
            
        <h2>
        Welcome to the African Marketplace
        </h2>
        </div>

        <div>
            <img 
            src='/images/Sauti.png' 
            alt='women reading information provided by sauti' 
            ref={element => {imgItem = element}}
            />

        </div>
        </div>
    )
}

export default Home;