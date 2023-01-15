import React, { useState } from 'react';
import LoginImage from '../../assets/images/loginbg.jpg';
import axios from '../../config/AxiosClient';

import { Button, Input } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { initialValues, schema } from '../../validations/login';
import { useDispatch } from 'react-redux';
import { userAction } from '../../redux/features/user/userSlice';
import { useFormik } from 'formik';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      loginHandler(values);
    }
  });
  
  const loginHandler = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/v1/auth/login', values);

      dispatch(userAction.setUser(data.response));
      
      navigate('/');
    } catch(err) {
      const error = err?.response?.data?.message;
      setError(error);
    } finally { 
      setIsLoading(false);
    }
  };

  return (
    <section className='min-h-[80vh] flex items-center justify-center'>
      <div className='bg-white flex rounded-2xl max-w-5xl shadow-lg'>
        <div className='sm:w-1/2 w-[100%] p-16'>
          <div className="flex justify-center">
            <p className='text-3xl text-red-600 font-bold py-10'>PhotoShare</p>
          </div>
          <h3 className="text-2xl font-bold text-center">Login to your account</h3>

          
          { error != null && 
          <div className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-gray-800 dark:text-red-400" role="alert">
            { error }
          </div> }
          <form 
            className='mt-4 flex flex-col gap-4' 
            onSubmit={handleSubmit} 
          >
            <div className="mb-2">
              <label 
                htmlFor="email" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <Input 
                id="email" 
                type="email" 
                className={`${errors.email != null ? 'border-2 border-red-600': ''} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} 
                placeholder="Your email address" 
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              { errors.email != null && <span className="text-xs tracking-wide text-red-600">{ errors.email }</span> } 
            </div>
            <div className="mb-6">
              <label 
                htmlFor="password" 
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <Input 
                id="password" 
                type="password" 
                className={`${errors.password != null ? 'border-2 border-red-600': ''} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} 
                placeholder="Your password" 
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              { errors.password != null && <span className="text-xs tracking-wide text-red-600">{ errors.password }</span> } 
            </div>
            <Button 
              type='submit'
              className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              loading={isLoading}
              btnText={'Login'}
            />
          </form>
          <div className='mt-8'>
            <p className='text-sm text-center'>
              <span className='text-gray-500'>Not registered yet? </span>
              <span className='font-bold cursor-pointer text-gray-800'>
                <Link to='/register'>Create an Account</Link>
              </span>
            </p>
          </div>
        </div>
        <div className='sm:block hidden relative w-1/2 rounded-r-xl'>
          <img className='rounded-r-xl w-full h-full' src={LoginImage} alt='login logo'/>
          
          <p className='absolute bottom-2 left-2 text-white'>www.kierveymaghanoy.com</p>
        </div>
      </div>
    </section>
  );
};

export default Login;