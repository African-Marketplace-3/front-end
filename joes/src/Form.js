import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as yup from 'yup';
import formSchema from './FormSchema';



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
                        <h2>Sign Up!</h2>
                    </div>
                                
                    <div>
                        {errors.name}
                        {errors.email}
                        {errors.username}
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
                            />
                        </label>
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
                            />
                        </label>
                    </div>
            
                    <div>
                        <label htmlFor='name'>Username:&nbsp;
                            <input
                                id='username'
                                value = {values.username}
                                onChange = {onInputChange}
                                name='username'
                                type='text'
                                placeholder='Type your username'
                            />
                        </label>
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
                            />
                        </label>
                    </div>
            
                    <div>
                        <label htmlFor='termsOfService'>Terms Of Service:&nbsp;
                            <input
                                id='termsOfService'
                                name='termsOfService'
                                type="checkbox"
                                checked={values.termsOfService}
                                onChange={onCheckBoxChange}
                            />
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