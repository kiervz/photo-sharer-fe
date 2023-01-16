import React, { useState } from 'react';
import { Button } from '../../components';

const Comment = ({ handleAddComment, isLoadingComment }) => {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const hanldeComment = () => {
    if (comment?.length > 500) {
      return setError('The comment must not be greater than 500 characters.');
    }

    handleAddComment(comment);
    setComment('');
    setError('');
  };

  return (
    <div className='mb-4'>
      <label 
        htmlFor="message" 
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Your message
      </label>
      <textarea 
        id="message" 
        rows="3" 
        className={`${error?.length > 0 ? 'border-red-600' : 'border-gray-300'} block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:border-blue-500`}
        placeholder="Write your thoughts here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      >
      </textarea>
      { error?.length > 0 && <span className="text-xs tracking-wide text-red-600">{ error }</span> } 
      <div className='text-right'>
        <Button 
          className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 rounded-lg text-sm px-5 py-2 my-2 disabled:bg-gray-100 disabled:cursor-not-allowed'
          isDisabled={comment.length === 0}
          loading={isLoadingComment}
          btnText='Comment'
          onClick={hanldeComment}
        />
      </div>
    </div>
  );
};

export default Comment;