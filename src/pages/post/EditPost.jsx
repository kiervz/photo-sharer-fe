import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosClient from '../../config/AxiosClient';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, SkeletonPost } from '../../components';
import { BiRefresh, BiSave } from 'react-icons/bi';
import { notifyUser } from '../../utility';

const EditPost = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userState = useSelector(state => state.user);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
 
  const fetchPost = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`/api/v1/posts/${params.id}`);
  
      setPost(data.response);

      if (userState.data.id !== data.response.user.id) {
        navigate('/unauthorized');
      }
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
    } finally { 
      setLoading(false); 
    }
  };

  const generateCatFact = async () => {
    setIsLoadingGenerate(true);
    try {
      const { data } = await axios.get('https://catfact.ninja/fact');
      animateText(data.fact);
      setPost({ ...post, description: data.fact });
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

  const handleSave = async () => {
    setIsLoadingSave(true);
    try {
      const { data } = await axiosClient.put(`/api/v1/posts/${params.id}`, {
        description: post.description
      });

      notifyUser('success', data.message);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
    } finally { setIsLoadingSave(false); }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      { loading ?
        <SkeletonPost />
        :     
        <div className='flex flex-col sm:flex-row justify-center content-center'>
          <div className="w-full sm:w-[508px] max-w-full">
            <img 
              src={post.photo} 
              className='object-cover rounded-lg' 
            />
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
              id='message'
              className='border p-2 rounded-lg min-h-[30%]'
            >
              <span>{ post.description }</span>
            </p>
            <div className='text-right mt-4'>
              <Button 
                type='submit'
                className="text-white bg-red-600 hover:bg-red-700 border font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
                btnIcon={<BiSave className='text-xl mr-1'/>}
                onClick={handleSave}
                loading={isLoadingSave}
                btnText='UPDATE'
              />
            </div>
          </div>
        </div> }
    </>
  );
};

export default EditPost;