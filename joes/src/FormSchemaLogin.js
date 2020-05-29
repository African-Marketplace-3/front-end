import React from 'react';
import * as yup from 'yup';


const formSchemaLogin = yup.object().shape({
   
    
    email: yup
      .string()
      .min(2, 'Email must have at least 7 characters. ')
      .required('Email is required!'),
    
    username: yup
      .string()
      .min(6, 'Username must have at least 6 characters. ')
      .required('Username is required!'),

    password: yup
      .string()
      .min(2, 'Password must have at least 5 characters. ')
      .required('Password is required!'),
      })

export default formSchemaLogin;