import React, { useEffect, useRef, useState } from 'react';
import UserIcon from '../../assets/images/user.png';
import { 
  HiDotsVertical, 
  HiOutlineTrash, 
  HiOutlinePencilAlt
} from 'react-icons/hi';
import { useSelector } from 'react-redux';

const CommentItem = ({ id, user, text, handleDeleteComment }) => {
  let kebabRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const userState = useSelector(state => state.user);
  
  const handleDelete = () => handleDeleteComment(id);

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (!kebabRef?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    });
  });
  
  return (
    <div className='mt-5'>
      <div className='flex justify-start gap-2 mb-2'>
        <img 
          src={UserIcon} 
          className='w-8 h-8 object-cover rounded-full cursor-pointer'
          alt='Commentator Picture'
        />
        <div className='w-full' ref={kebabRef}>
          <div className='flex justify-between items-center relative'>
            <p className='text-sm font-semibold cursor-pointer h-6 mt-1 w-max'>{ user.name }</p>
            { user.id === userState.data.id && 
              <>
                <HiDotsVertical 
                  className='cursor-pointer'
                  onClick={() => setIsOpen(!isOpen)}
                />
                <div className={`${!isOpen && 'hidden'} bg-white py-2 rounded-lg mt-2 absolute right-0 top-[50%] w-48 shadow-xl border z-50`}>
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                      <p 
                        className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100 flex gap-2 justify-start items-center"
                      > 
                        <HiOutlinePencilAlt size={20} />
                    Update
                      </p>
                    </li>
                    <li onClick={handleDelete}>
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
          <p className='text-sm'>
            { text }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;