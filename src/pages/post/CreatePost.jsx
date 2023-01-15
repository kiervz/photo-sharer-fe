import React, { useState } from 'react';
import axios from 'axios';
import axiosClient from '../../config/AxiosClient';
import { BiCloudUpload, BiTrash, BiRefresh } from 'react-icons/bi';
import { Button, Input, PreviewImage } from '../../components';
import { useFormik } from 'formik';
import { initialValues, schema } from '../../validations/post';
import { notifyUser } from '../../utility';

const CreatePost = () => {
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false);

  const { values, errors, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      handleSave(values);
    }
  });
  
  const generateCatFact = async () => {
    setIsLoadingGenerate(true);
    try {
      const { data } = await axios.get('https://catfact.ninja/fact');
      setFieldValue('description', data.fact);
      animateText(data.fact);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
    } finally { setIsLoadingGenerate(false); }
  };

  const animateText = (catFact) => {
    let messageText = document.getElementById('message');
    messageText.innerText = '';

    let delay = 200;
    let splittedMessage = catFact.split(' ');
    
    for (const [index, value] of splittedMessage.entries()) {
      setTimeout(function() {
        messageText.innerText += ' ' + value;
      }, delay * index);
    }
  };
  
  const handleSave = async (values) => {
    let formData = new FormData();

    formData.append('description', values.description);
    formData.append('photo', values.photo);

    try {
      const { data } = await axiosClient.post('/api/v1/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (data.code === 201) notifyUser('success', 'Post successfully created!');
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
      if (err.response.status === 401) notifyUser('error', 'Please login before making a post.');
    }
  };
  return (
    <form 
      className='flex flex-col sm:flex-row justify-center content-center' 
      onSubmit={handleSubmit} 
    >
      <div className="w-full sm:w-[508px] max-w-full pt-5">
        <div 
          className={`relative border-2 ${errors.photo ? 'border-red-600' : 'border-gray-300'} border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100`}
        >
          { errors.photo && <p className='text-center text-red-600 text-sm'>{ errors.photo }</p> }
          { values.photo ? 
            <div className='z-10'>
              <PreviewImage
                file={values.photo}
              />
              <Button
                type="button"
                className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md hover:bg-gray-100 transition-all duration-500 ease-in-out"
                btnIcon={<BiTrash />}
                onClick={() => setFieldValue('photo', '')}
              />
            </div>
            : 
            <label 
              htmlFor="photo" 
              className="flex flex-col items-center justify-center w-full cursor-pointer z-20"
            >
              <div className="flex flex-col items-center justify-center py-6">
                <BiCloudUpload 
                  className='text-5xl text-gray-500' 
                />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Click to upload
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG or JPG (MAX. 2MB)
                </p>
              </div>
              <input 
                id="photo" 
                type="file" 
                className="hidden" 
                value={values.photo}
                onChange={(e) => setFieldValue('photo', e.target.files[0])}
              />
            </label> }
        </div>
      </div> 
      <div className='sticky top-0 p-2 sm:p-5 w-full sm:w-[508px]'>
        <div className='flex justify-between pb-3 items-center'>
          <p className="block text-md font-medium text-gray-900">
          Generate some cat facts
          </p>
          <Button 
            type="button" 
            className="text-gray-900 bg-white hover:bg-gray-100 border font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            onClick={generateCatFact}
            btnIcon={<BiRefresh className='text-xl mr-1'/> }
            btnText='Generate'
            loading={isLoadingGenerate}
          />
        </div>
        <p 
          id="message" 
          className={`border p-2 rounded-lg min-h-[30%] ${ errors.description ? 'border-2 border-red-600': 'border-gray-300'}`}
        >
          { errors.description && errors.description }
        </p>
        <Input 
          id='description'
          name='description'
          className='hidden'
          type='text' 
          value={values.description}
          onChange={handleChange}
        />
        <div className='text-right mt-4'>
          <Button 
            type='submit'
            className="text-white bg-red-600 hover:bg-red-700 border font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            btnText='POST'
          />
        </div>
      </div>
    </form>
  );
};

export default CreatePost;