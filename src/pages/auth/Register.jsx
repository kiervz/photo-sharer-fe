import React, { useState } from 'react';
import axios from '../../config/AxiosClient';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../components';
import { useFormik } from 'formik';
import { initialValues, schema } from '../../validations/register';
import { notifyUser } from '../../utility/MessageHelper';

export const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      registerHandler(values);
    }
  });

  const registerHandler = async (values) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post('/api/v1/auth/register', values);
      notifyUser('success', data.message);
      navigate('/login');
    } catch(err) {
      const status = err?.response?.status;
      let error = err?.response?.data?.message;
      if (status === 422) error = err?.response?.data?.errors?.email[0];
      setError(error);
    } finally { setIsLoading(false); }
  };

  return (
    <section className='min-h-[80vh] flex items-center justify-center'>
      <div className='bg-white flex rounded-2xl max-w-6xl shadow-lg w-[600px]'>
        <div className='w-[100%] p-16'>
          <h2 className='font-bold text-2xl'>Register</h2>
          <p className='text-sm mt-4'>Register to create an account.</p>
          { error != null && <p className='bg-red-200 p-2 rounded mt-6'>{ error }</p>}
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleSubmit} className='mt-6'>
              <div className="grid grid-cols-1 gap-4">
                <div className="mb-2">
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <Input 
                    id="name" 
                    type="text" 
                    name="name" 
                    className={`${errors.name != null ? 'border-2 border-red-600': ''} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} 
                    placeholder="Your name" 
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  { errors.name != null && <span className="text-xs tracking-wide text-red-600">{ errors.name }</span> } 
                </div>

                <div className="mb-2">
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <Input 
                    id="email" 
                    name='email'
                    type="email" 
                    className={`${errors.email != null ? 'border-2 border-red-600': ''} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} 
                    placeholder="Your email address" 
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  { errors.email != null && <span className="text-xs tracking-wide text-red-600">{ errors.email }</span> } 
                </div>

                <div className="mb-2">
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <Input 
                    id="password" 
                    name='password'
                    type="password" 
                    className={`${errors.password != null ? 'border-2 border-red-600': ''} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} 
                    placeholder="Your password" 
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  { errors.password != null && <span className="text-xs tracking-wide text-red-600">{ errors.password }</span> } 
                </div>


                <div className="mb-2">
                  <label 
                    htmlFor="password_confirmation" 
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <Input 
                    id="password_confirmation" 
                    name='password_confirmation'
                    type="password" 
                    className={`${errors.password_confirmation != null ? 'border-2 border-red-600': ''} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} 
                    placeholder="Your password" 
                    value={values.password_confirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  { errors.password_confirmation != null && <span className="text-xs tracking-wide text-red-600">{ errors.password_confirmation }</span> } 
                </div>
                <Button 
                  type='submit'
                  className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                  btnText={'Register'}
                  loading={isLoading}
                />
              </div>
            </form>
          </div>
          <div className='mt-8'>
            <p className='text-sm'>
              <span className='text-gray-500'>Already have an account? </span>
              <span className='font-bold cursor-pointer text-gray-800'>
                <Link to='/login'>Login here</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;