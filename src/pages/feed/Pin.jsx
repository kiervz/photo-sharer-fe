import React from 'react';
import { BiDownvote, BiUpvote, BiCommentDetail } from 'react-icons/bi';

import { Link } from 'react-router-dom';

const Pin = ({ id, description, photo, total_votes, comments }) => {
  return (
    <div className='mt-2 mb-10'>
      <div className='relative w-auto rounded-lg overflow-hidden transition-all duration-500 ease-in-out m-3'>
        <div>
          
        </div>
        <Link to={`/posts/${id}`}>
          <img className='rounded-lg w-full cursor-pointer' src={photo} alt='photo' />
        </Link>
        <div className='p-2 '>
          <div className='flex items-center text-center justify-between'>
            <div className='flex justify-center gap-2'>
              <BiUpvote 
                className='text-2xl cursor-pointer hover:text-red-500' 
              />
              <p className='text-lg font-semibold'>{ total_votes }</p>
              <BiDownvote 
                className='text-2xl cursor-pointer hover:text-gray-500' 
              />
            </div>
            <div className='flex items-center text-center justify-between gap-2'>
              <p className='text-lg font-semibold'>{ comments.total }</p>
              <BiCommentDetail 
                className='text-2xl cursor-pointer hover:text-blue-500'
              />
            </div>
          </div>
        </div>
        <div className='px-2 pb-2 text-sm gap-1'>
          <p>{ description }</p>
        </div>
      </div>
    </div>
  );
};

export default Pin;