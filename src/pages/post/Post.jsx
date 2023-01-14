import React from 'react';
import { BiDownvote, BiUpvote, BiCommentDetail } from 'react-icons/bi';

import { Link } from 'react-router-dom';

const Post = ({ id, description, photo, total_votes, comments }) => {
  return (
    <div className='mt-2 mb-10'>
      <div className='relative w-auto rounded-lg overflow-hidden transition-all duration-500 ease-in-out m-3'>
        <Link to={`/post/${id}`}>
          <img className='rounded-lg w-full cursor-pointer' src={photo} alt='photo' />
        </Link>
        <div className='p-2'>
          <div className='flex items-center text-center justify-between'>
            <div className='flex justify-center gap-2'>
              <BiUpvote 
                className='text-2xl cursor-pointer hover:text-red-500' 
              />
              <p className='text-lg font-semibold cursor-default'>{ total_votes }</p>
              <BiDownvote 
                className='text-2xl cursor-pointer hover:text-gray-500' 
              />
            </div>
            <Link to={`/post/${id}`} className='flex items-center text-center justify-between gap-2 hover:text-blue-500'>
              <p className='text-lg font-semibold'>{ comments.total }</p>
              <BiCommentDetail 
                className='text-2xl cursor-pointer'
              />
            </Link>
          </div>
        </div>
        <div className='px-2 pb-2 text-sm gap-1'>
          <p>{ description }</p>
        </div>
      </div>
    </div>
  );
};

export default Post;