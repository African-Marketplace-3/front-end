import React from "react";
import axios from 'axios';
import * as yup from 'yup';



function SignUp(props){
  
    const {
      values,
      onInputChange,
      onSubmit,
      disabled,
      errors,
      onCheckBoxChange
    } = props
   
    return(
        <div>
             

             <form>
            <div>
                
            <div>
            <h2>Sign Up!</h2>
            </div>

            
            <div>
            {errors.name}
            {errors.email}
            {errors.password}
            </div>

            
            <div>
            <label htmlFor='name'>Name:&nbsp;
            <input
                id='name'
                value = {values.name}
                onChange = {onInputChange}
                name='name'
                type='text'
                placeholder='Type your name'
            /></label>
            </div>

            <div>
            <label htmlFor='email'>Email:&nbsp;
            <input
                id='email'
                value = {values.email}
                onChange = {onInputChange}
                name='email'
                type='text'
                placeholder='Type your email'
            /></label>
            </div>

            <div>
            <label htmlFor='password'>Password:&nbsp;
            <input
                id='password'
                value = {values.password}
                onChange = {onInputChange}
                name='password'
                type='password'
                placeholder='Type your password'
            /></label>
            </div>

            <label>
            <input
                name='termsOfService'
                type="checkbox"
                checked={values.termsOfService}
                onChange={onCheckBoxChange}
            />
            Terms Of Service
        </label>

        </div>
        <div>
        <button onClick={onSubmit} disabled={disabled}>Submit</button>
    </div>
    </form>


    
        
        </div>
        
    )
    }
export default SignUp;