import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import * as yup from 'yup';
import SignUp from './Form';
import Home from './Home';
import Login from './Login';
import Card from './UserCard';
import BusinessLogin from './BusinessLogin';
import BusinessSignUp from './BusinessSignUp';
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';

const url= 'https://reqres.in/api/users'

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

const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must have at least 2 characters')
    .required('Name is required!'),
  
  email: yup
    .string()
    .min(2, 'Email must have at least 7 characters')
    .required('Email is required!'),

  username: yup
    .string()
    .min(6, 'Username must have at least 6 characters')
    .required('Username is required!'),

  password: yup
    .string()
    .min(2, 'Password must have at least 5 characters')
    .required('Password is required!'),

  

    })

const initialFormDisabled = true;


function App() {

  const [user, setUser] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [formDisabled, setFormDisabled] = useState(initialFormDisabled)

  const postUser = aUser => {
    axios.post(url, aUser)
      .then(res => {
        setUser([res.data, ...user])
          console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      setFormValues(initialFormValues)
    })
  } 

  useEffect(() =>{
  postUser()
  }, [])

  useEffect(() => {
    formSchema.isValid(formValues)
      .then(valid => { 
        setFormDisabled(!valid)
      })
  }, [formValues])


  const onSubmit = evt => {
    evt.preventDefault()

  const newUser = {
    name: formValues.name,
    email: formValues.email,
    username: formValues.username,
    password: formValues.password,
    termsOfService: Object.keys(formValues.termsOfService)
        .filter(termsOfService => formValues.termsOfService[termsOfService] ===true)
  }

  postUser(newUser)
  setFormValues(initialFormValues)
  setUser([...user, newUser])

  const userObjToString = JSON.stringify(newUser)
  console.log(userObjToString)

  const toJSONuser= JSON.parse(userObjToString);
  }
  
  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setFormErrors({
        ...formErrors,
        [name]: '',
        })
      })
      .catch(err => {
        setFormErrors({
        ...formErrors,
        [name]: err.errors[0],
        })
      })
      setFormValues({
        ...formValues,
        [name]:value,
      })
    }


    const onCheckBoxChange = evt => {
      const checked = evt.target.checked
      console.log(checked);
      setFormValues({
        ...formValues,
        termsOfService: checked
      })
    }




    return (
      <div>
      
        <h1>African Marketplace</h1>

        <ul>
          <li>
        <NavLink to='/' exact>Home</NavLink>
        </li>
        <li>
        <NavLink to='/signup'>Sign Up</NavLink>
        </li>
        <li>
        <NavLink to='/login'>Log In</NavLink>
        </li>
        <li>
        <NavLink to='/businesslogin'> Business Log In</NavLink>
        </li>
        <li>
        <NavLink to='businesssignup'>Business Sign Up</NavLink>
        </li>
        </ul>

        <Switch>

        <Route path="/signup">
          <SignUp
            values = {formValues}
            onInputChange = {onInputChange}
            onCheckBoxChange = {onCheckBoxChange}
            onSubmit = {onSubmit}
            disabled = {formDisabled}
            errors ={formErrors}
          />
        </Route>


      <Route path='/login'>
        <Login 
          values = {formValues}
          onInputChange = {onInputChange}
          onCheckBoxChange = {onCheckBoxChange}
          onSubmit = {onSubmit}
          disabled = {formDisabled}
          errors ={formErrors}
        />
      </Route>

      <Route path='/businesslogin'>
        <BusinessLogin 
          values = {formValues}
          onInputChange = {onInputChange}
          onCheckBoxChange = {onCheckBoxChange}
          onSubmit = {onSubmit}
          disabled = {formDisabled}
          errors ={formErrors}
        />
      </Route>

      <Route path='/businesssignup'>
        <BusinessSignUp 
          values = {formValues}
          onInputChange = {onInputChange}
          onCheckboxChange = {onCheckBoxChange}
          onSubmit = {onSubmit}
          disabled = {formDisabled}
          errors ={formErrors}
        />
      </Route>

      <Route exact path='/' component={Home} />
      </Switch>
      
    {
        user.map((aUser) => {
          return (
            <Card key={aUser.id} details={aUser} />
          )
        })
      }
   
      </div>
  );
}

export default App;
