import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as yup from 'yup';
import formSchemaLogin from './FormSchemaLogin';


const url= 'https://african-market-place.herokuapp.com/api/users'



const initialLoginFormValues = {
    name:'',
    email: '',
    username:'',
    password: ''
   
  }
  
  const initialLoginFormErrors = {
    name:'',
    email:'',
    username:'',
    password:''
   
  }

  const initialLoginFormDisabled = true;

function Login(props){
    // const {
    //     values,
    //     onSubmit,
    //     disabled,
    //     errors,
        
    //   } = props

      const [loginUser, setLoginUser] = useState([])
      const [loginFormValues, setLoginFormValues] = useState(initialLoginFormValues)
      const [loginFormErrors, setLoginFormErrors] = useState(initialLoginFormErrors)
      const [loginFormDisabled, setLoginFormDisabled] = useState(initialLoginFormDisabled)



      const getLoginUser = () => {
        axios.get(url)
        .then(function(res) {
          console.log(res);
          setLoginUser([...loginUser, res.data])
        })
        .catch(function(err) {
          console.log(err)
        })
      }
    
      useEffect(() =>{
        getLoginUser()
        }, [])
    


      const postLoginUser = aUser => {
        axios.post(url, aUser)
          .then(res => {
            setLoginUser([res.data, ...loginUser])
              console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setLoginFormValues(initialLoginFormValues)
        })
      } 
    
      useEffect(() =>{
      postLoginUser()
      }, [])



      
      const onInputChange = evt => {
        const name = evt.target.name
        const value = evt.target.value
    
        yup
          .reach(formSchemaLogin, name)
          .validate(value)
          .then(valid => {
            setLoginFormErrors({
            ...loginFormErrors,
            [name]: '',
            })
          })
          .catch(err => {
            setLoginFormErrors({
            ...loginFormErrors,
            [name]: err.errors[0],
            })
          })
          setLoginFormValues({
            ...loginFormValues,
            [name]:value
          })
        }

        useEffect(() => {
            formSchemaLogin.isValid(loginFormValues)
              .then(valid => { 
                setLoginFormDisabled(!valid)
              })
          }, [loginFormValues])


          const onSubmit = evt => {
            evt.preventDefault()
        
          const newLoginUser = {
            name: loginFormValues.name.trim(),
            email: loginFormValues.email.trim(),
            username: loginFormValues.username,
            password: loginFormValues.password,
            
          }
        
          postLoginUser(newLoginUser)
          setLoginFormValues(initialLoginFormValues)
          setLoginUser([...loginUser, newLoginUser])
        
          const userObjToString = JSON.stringify(newLoginUser)
          console.log(userObjToString)
        
          const toJSONuser= JSON.parse(userObjToString);
          }
    return(
        <div>
            <form>

                <div>
                    <h2>Log In</h2>
                </div>

                <div>
                    {loginFormErrors.name}
                    {loginFormErrors.email}
                    {loginFormErrors.username}
                    {loginFormErrors.password}
                </div>

            
                <div>
                    <label htmlFor='name'>Name:&nbsp;
                        <input
                            id='name'
                            loginFormValues = {loginFormValues.name}
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
                            loginFormValues = {loginFormValues.email}
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
                            loginFormValues = {loginFormValues.username}
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
                            loginFormValues = {loginFormValues.password}
                            onChange = {onInputChange}
                            name='password'
                            type='password'
                            placeholder='Type your password'
                        />
                    </label>
                </div>
   
                <div>
                    <button className='submit' onClick={onSubmit} disabled={loginFormDisabled}>Submit</button>
                </div>
            </form>
        </div>
        
    )
}

export default Login;