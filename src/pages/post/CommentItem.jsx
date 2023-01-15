import React from 'react';
import UserIcon from '../../assets/images/user.png';

const CommentItem = ({ user, text }) => {
  return (
    <div className='mt-5'>
      <div className='flex justify-start gap-2 mb-2'>
        <img 
          src={UserIcon} 
          className='w-8 h-8 object-cover rounded-full cursor-pointer'
          alt='Commentator Picture'
        />
        <div>
          <p className='text-sm font-semibold cursor-pointer h-6 mt-1 w-max'>{ user.name }</p>
          <p className='text-sm'>
            { text }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;