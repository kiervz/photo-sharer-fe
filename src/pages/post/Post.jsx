import React, { useEffect, useRef, useState } from 'react';
import { BiDownvote, BiUpvote, BiCommentDetail } from 'react-icons/bi';
import { HiDotsVertical, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';

import UserIcon from '../../assets/images/user.png';

const Post = ({ 
  id, 
  user, 
  description, 
  photo, 
  total_votes, 
  comments 
}) => {
  let kebabRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const userState = useSelector(state => state.user);

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (!kebabRef?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    });
  });

  return (
    <div className='mt-2 mb-10'>
      <div className='relative w-auto rounded-lg overflow-hidden transition-all duration-500 ease-in-out m-3'>
        <div className='flex justify-between items-center relative' ref={kebabRef}>
          <div className='flex py-1 justify-start items-center gap-1'>
            <img src={UserIcon} className='w-6 h-6 ml-1 object-cover rounded-full cursor-pointer' />
            <p className='text-sm cursor-pointer font-semibold'>{ user.name }</p>
          </div>
          { user.id === userState.data.id &&  
            <>
              <HiDotsVertical    
                className='cursor-pointer'
                onClick={() => setIsOpen(!isOpen)}
              />
              <div className={`${!isOpen && 'hidden'} bg-white py-2 rounded-lg mt-2 absolute right-0 top-[50%] w-48 shadow-xl border z-50`}>
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <Link 
                    to={`/post/${id}/edit`}
                    className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100 flex gap-2 justify-start items-center"
                  > 
                    <HiOutlinePencilAlt size={20} />
                    Edit
                  </Link>
                  <li >
                    <p
                      className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100 flex gap-2 justify-start items-center"
                    > 
                      <HiOutlineTrash size={20} />
                    Delete
                    </p>
                  </li>
                </ul>
              </div>
            </> }
        </div>
        <Link to={`/post/${id}`}>
          <LazyLoadImage 
            className='rounded-lg w-full cursor-pointer' 
            src={photo} 
            alt='photo' 
          />
        </Link>
        <div className='p-2'>
          <div className='flex items-center text-center justify-between'>
            <div className='flex justify-center gap-2 pt-3 pb-2 h-6 text-center items-center'>
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