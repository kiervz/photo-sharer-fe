import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import UserIcon from '../../assets/images/user.png';
import axios from '../../config/AxiosClient';

const PostDetail = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});

  const fetchPost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/posts/${params.id}`);
  
      setPost(data.response);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      { loading ?
        'Loading...'
        :
        <div className='flex flex-col sm:flex-row justify-center content-center'>
          <div className="w-full sm:w-[508px] max-w-full">
            <img 
              src={post.photo} 
              className='object-cover rounded-lg' 
            />
          </div>
          <div className='sticky top-0 p-2 sm:p-5 w-full sm:w-[508px]'>
            <div className='flex justify-start items-center gap-2'>
              <img src={UserIcon} className='w-8 h-8 object-cover rounded-full cursor-pointer' />
              <p className='cursor-pointer font-semibold'>{ post.user?.name }</p>
            </div>
            <div className='pt-2 sm:pt-5'>
              <p>{ post.description }</p>
            </div>
            <div className='flex justify-start gap-2 pt-3 pb-2'>
              <BiUpvote 
                className='text-2xl cursor-pointer hover:text-red-500' 
              />
              <p className='text-lg font-semibold cursor-default'>0</p>
              <BiDownvote 
                className='text-2xl cursor-pointer hover:text-gray-500' 
              />
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default PostDetail;