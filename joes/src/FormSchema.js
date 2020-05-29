import React from 'react';
import * as yup from 'yup';


const formSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, 'Name must have at least 2 characters. ')
      .required('Name is required!'),
    
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
      .min(2, 'Password must have at least 2 characters. ')
      .required('Password is required!'),

    termsOfService: yup
      .boolean()
      .oneOf ([true], "You must accept Terms Of Service. ")

      })

export default formSchema;