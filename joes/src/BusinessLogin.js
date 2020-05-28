import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as yup from 'yup';
import formSchemaLogin from './FormSchemaLogin';


const url= 'https://african-market-place.herokuapp.com/api/users'



const initialBizLoginFormValues = {
    name:'',
    email: '',
    username:'',
    password: ''
   
  }
  
  const initialBizLoginFormErrors = {
    name:'',
    email:'',
    username:'',
    password:''
   
  }

  const initialBizLoginFormDisabled = true;

function BusinessLogin(props){
    // const {
    //     values,
    //     onSubmit,
    //     disabled,
    //     errors,
        
    //   } = props

      const [bizLoginUser, setBizLoginUser] = useState([])
      const [bizLoginFormValues, setBizLoginFormValues] = useState(initialBizLoginFormValues)
      const [bizLoginFormErrors, setBizLoginFormErrors] = useState(initialBizLoginFormErrors)
      const [bizLoginFormDisabled, setBizLoginFormDisabled] = useState(initialBizLoginFormDisabled)



      const getBizLoginUser = () => {
        axios.get(url)
        .then(function(res) {
          console.log(res);
          setBizLoginUser([...bizLoginUser, res.data])
        })
        .catch(function(err) {
          console.log(err)
        })
      }
    
      useEffect(() =>{
        getBizLoginUser()
        }, [])
    


      const postBizLoginUser = aUser => {
        axios.post(url, aUser)
          .then(res => {
            setBizLoginUser([res.data, ...bizLoginUser])
              console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setBizLoginFormValues(initialBizLoginFormValues)
        })
      } 
    
      useEffect(() =>{
      postBizLoginUser()
      }, [])



      
      const onInputChange = evt => {
        const name = evt.target.name
        const value = evt.target.value
    
        yup
          .reach(formSchemaLogin, name)
          .validate(value)
          .then(valid => {
            setBizLoginFormErrors({
            ...bizLoginFormErrors,
            [name]: '',
            })
          })
          .catch(err => {
            setBizLoginFormErrors({
            ...bizLoginFormErrors,
            [name]: err.errors[0],
            })
          })
          setBizLoginFormValues({
            ...bizLoginFormValues,
            [name]:value
          })
        }

        useEffect(() => {
            formSchemaLogin.isValid(bizLoginFormValues)
              .then(valid => { 
                setBizLoginFormDisabled(!valid)
              })
          }, [bizLoginFormValues])


          const onSubmit = evt => {
            evt.preventDefault()
        
          const newBizLoginUser = {
            name: bizLoginFormValues.name.trim(),
            email: bizLoginFormValues.email.trim(),
            username: bizLoginFormValues.username,
            password: bizLoginFormValues.password,
            
          }
        
          postBizLoginUser(newBizLoginUser)
          setBizLoginFormValues(initialBizLoginFormValues)
          setBizLoginUser([...bizLoginUser, newBizLoginUser])
        
          const userObjToString = JSON.stringify(newBizLoginUser)
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
                    {bizLoginFormErrors.name}
                    {bizLoginFormErrors.email}
                    {bizLoginFormErrors.username}
                    {bizLoginFormErrors.password}
                </div>

            
                <div>
                    <label htmlFor='name'>Name:&nbsp;
                        <input
                            id='name'
                            bizLoginFormValues = {bizLoginFormValues.name}
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
                            bizLoginFormValues = {bizLoginFormValues.email}
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
                            bizLoginFormValues = {bizLoginFormValues.username}
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
                            bizLoginFormValues = {bizLoginFormValues.password}
                            onChange = {onInputChange}
                            name='password'
                            type='password'
                            placeholder='Type your password'
                        />
                    </label>
                </div>
   
                <div>
                    <button className='submit' onClick={onSubmit} disabled={bizLoginFormDisabled}>Submit</button>
                </div>
            </form>
        </div>
        
    )
}

export default BusinessLogin;