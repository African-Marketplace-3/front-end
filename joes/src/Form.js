import React from "react";
import axios from 'axios';
import * as yup from 'yup';



  



function SignUp(props){
  
    const {
      values,
      onInputChange,
      onChange,
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
            /></label>
            </div>

            <div>
            <label htmlFor='password'>Password:&nbsp;
            <input
                id='password'
                value = {values.password}
                onChange = {onInputChange}
                name='password'
                type='text'
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
        <button className='submit' onClick={onSubmit} >Submit</button>
    </div>
    </form>


    
        
        </div>
        
    )
    }
export default SignUp;