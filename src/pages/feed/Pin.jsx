import React from 'react';
import { Link } from 'react-router-dom';

const Pin = ({ id, description, photo, total_votes }) => {
  return (
    <div className='mt-2 mb-10'>
      <div className='relative w-auto rounded-lg overflow-hidden transition-all duration-500 ease-in-out m-3'>
        <Link to={`/posts/${id}`}>
          <img className='rounded-lg w-full cursor-pointer' src={photo} alt='photo' />
        </Link>
        <div className='p-2 text-sm flex justify-between items-start gap-3'>
          <p>{ description }</p>
          <div className='flex flex-col items-center justify-center p-1'>
            <p>+</p>
            <p>{ total_votes }</p>
            <p>-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pin;