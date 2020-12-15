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
import formSchema from './FormSchema';
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';



const url= 'https://african-market-place.herokuapp.com/api/users'

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



function App() {

  const [user, setUser] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [formDisabled, setFormDisabled] = useState(initialFormDisabled)


  const getUser = () => {
    axios.get(url)
    .then(function(res) {
      console.log(res);
      setUser([...user, res.data])
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  useEffect(() =>{
    getUser()
    }, [])



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

    console.log('Your form was successfully submitted!')

  const newUser = {
    name: formValues.name.trim(),
    email: formValues.email.trim(),
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
        [name]:value
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
      
        
        <nav className='navs'>
          <nav>
          <NavLink className='nav-link' to='/' exact>Home</NavLink>
          </nav>
          <nav>
          <NavLink className='nav-link' to='/signup'>Sign Up</NavLink>
          </nav>
          <nav>
          <NavLink className='nav-link' to='/login'>Log In</NavLink>
          </nav>
          <nav>
          <NavLink className='nav-link' to='/businesslogin'> Business Log In</NavLink>
          </nav>
          <nav>
          <NavLink className='nav-link' to='businesssignup'>Business Sign Up</NavLink>
          </nav>
          </nav>

          <h1 style={{backgroundColor: "orange"}}>African Marketplace</h1>
        
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
              // values = {formValues}
              // onSubmit = {onSubmit}
              // disabled = {formDisabled}
              // errors ={formErrors}
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
              onCheckBoxChange = {onCheckBoxChange}
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
