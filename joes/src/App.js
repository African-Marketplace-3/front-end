import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import * as yup from 'yup';
import SignUp from './Form';
import Home from './Home';
import Login from './Login';
import Card from './UserCard';
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';

const url= 'https://reqres.in/api/users'

  const initialFormValues = {
    name:'',
    email: '',
    password: ''
  }

  const initialFormErrors = {
    name:'',
    email:'',
    password:''
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
      password: formValues.password
    }

    postUser(newUser)
    setFormValues(initialFormValues)
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
      const name = evt.target.name
    const checked = evt.target.checked
    console.log(checked)
      setFormValues({
        ...formValues,
        toppings: {
          ...formValues.toppings,
          [name]: checked
        
        }
      })
    }




    return (
      <div>
      
        <h1>African Marketplace</h1>

        <NavLink to='/' exact>Home</NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>
        <NavLink to='/login'>Log In</NavLink>


  <Switch>
      
  <Route path="/signup">
  <SignUp
      values = {formValues}
      onInputChange = {onInputChange}
      onChange = {onCheckBoxChange}
      onSubmit = {onSubmit}
      disabled = {formDisabled}
      errors ={formErrors}
    />
      </Route>


      <Route path='/login'>
        <Login 
        values = {formValues}
        onInputChange = {onInputChange}
        onChange = {onCheckBoxChange}
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
