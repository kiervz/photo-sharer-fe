import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import UserIcon from '../../assets/images/user.png';
import axios from '../../config/AxiosClient';
import Comment from './Comment';

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
            <div className='py-2 sm:py-5'>
              <p>{ post.description }</p>
            </div>
            <div className='flex justify-end gap-2 pt-2 pb-2 h-6 text-center items-center'>
              <BiUpvote 
                className='text-2xl cursor-pointer hover:text-red-500' 
              />
              <p className='text-lg font-semibold cursor-default'>{ post.total_votes }</p>
              <BiDownvote 
                className='text-2xl cursor-pointer hover:text-gray-500' 
              />
            </div>
            <div className='mb-4'>
              <label 
                htmlFor="message" 
                className="block mb-2 text-sm font-medium text-gray-900">
                Your message
              </label>
              <textarea 
                id="message" 
                rows="3" 
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500" 
                placeholder="Write your thoughts here...">
              </textarea>
              <button 
                className='bg-blue-500 text-white py-1 px-2 rounded-lg text-sm mt-1'
              >
                Comment
              </button>
            </div>
            <hr/>
            { post.comments?.data.length > 0 ?
              post.comments.data.map(comment => (
                <Comment 
                  key={comment.id} 
                  {...comment} 
                /> 
              ))
              :
              <p 
                className='text-center text-sm py-2'
              >
                No Comments Yet
              </p> }
          </div>
        </div>
      }
    </>
  );
};

export default PostDetail;