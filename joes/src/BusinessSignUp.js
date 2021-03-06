import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as yup from 'yup';


const initialFormValues = {
    name:'',
    email: '',
    username:'',
    password: '',
    termsOfService: false
  }
  
  const initialFormErrors = {
    name:'',
    email:'',
    username:'',
    password:'',
    termsOfService:''
  }
  
  const initialFormDisabled = true;


function BusinessSignUp(props){
  
    const {
      values,
      onInputChange,
      onSubmit,
      disabled,
      errors,
      onCheckBoxChange
    } = props


    const [user, setUser] = useState([])
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [formDisabled, setFormDisabled] = useState(initialFormDisabled)

    const resetAll = () => {
        setFormValues(initialFormValues)
    }
   
    return(
        <div>
             <div>
                    <h2>Sign Up Your Business!</h2>
                </div>
            <form className='container'>
               

                <div>
                    {errors.name}
                    {errors.email}
                    {errors.username}
                    {errors.password} 
                </div>

                <div>
                    <label htmlFor='name'>Business Name:&nbsp;
                        <input
                            id='name'
                            value = {values.name}
                            onChange = {onInputChange}
                            name='name'
                            type='text'
                            placeholder='Type your business name'
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
                    <label htmlFor='termsOfService'> Terms Of Service:&nbsp;
                        <input
                            name='termsOfService'
                            type="checkbox"
                            checked={values.termsOfService}
                            onChange={onCheckBoxChange}
                        />
                    </label>
                </div>

                <div>
                    <button className='myBtn' onClick={onSubmit} disabled={disabled}>Submit</button>
                    <button onClick={resetAll}>Reset Form</button>
                </div>
            </form>
        </div>
    )
}
export default BusinessSignUp;