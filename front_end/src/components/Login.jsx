import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import toast, { Toaster }from 'react-hot-toast';
import { useFormik } from 'formik';
import { validateForm } from '../helper/validate'
import { verifyPassword } from '../helper/helper'
import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css';

export default function Login() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: validateForm,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      setUsername(values.username);
      let loginPromise = verifyPassword({ username: values.username, password: values.password });
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/homepage')
      })
    }
  })


  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>

            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password' />
              <button className={styles.btn} type='submit'>Sign In</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
              <br />
              <span className='text-gray-500'>Forgot Password? <Link className='text-red-500' to="/username">Recover Now</Link></span>

            </div>

          </form>

        </div>
      </div>
    </div>
  )
}
