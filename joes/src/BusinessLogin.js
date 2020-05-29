import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as yup from 'yup';
import formSchemaLogin from './FormSchemaLogin';


const url= 'https://african-market-place.herokuapp.com/api/users'



const initialBizLoginFormValues = {
    
    email: '',
    username:'',
    password: ''
   
  }
  
  const initialBizLoginFormErrors = {
    
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
        
            console.log('You have successfully logged in!')

          const newBizLoginUser = {
            
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


        const resetAll = () => {
            setBizLoginFormValues(initialBizLoginFormValues)
        }

    return(
        <div>
            <form className='container'>

                <div>
                    <h2>Log In</h2>
                </div>

                <div>
                    
                    {bizLoginFormErrors.email}
                    {bizLoginFormErrors.username}
                    {bizLoginFormErrors.password}
                </div>

            


                <div>
                    <label htmlFor='email'>Business Email:&nbsp;
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
                    <button className='myBtn' onClick={onSubmit} disabled={bizLoginFormDisabled}>Submit</button>
                    <button onClick={resetAll}>Reset Form</button>
                </div>
            </form>
        </div>
        
    )
}

export default BusinessLogin;