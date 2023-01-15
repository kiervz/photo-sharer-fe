import React, { useEffect, useRef, useState } from 'react';
import UserIcon from '../assets/images/user.png';

import { BiPlus, BiHome } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  let userIconRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const userSlice = useSelector(state => state.user);
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (!userIconRef?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    });
  });

  return (
    <div className='top-0 left-0 w-full z-10 shadow-md sticky bg-white'>
      <div className='flex items-center justify-between pt-3 pb-3 min-w-[80%] w-[80%] m-auto'>
        <Link 
          to='/' 
          className='text-[1.2rem] font-semibold text-red-600'
        >
          PhotoShare
        </Link>
        <Link 
          to='/'
          className='text-xl text-black hover:bg-gray-200 p-2 rounded-full border-2'
        >
          <BiHome />
        </Link>
        <ul className='flex justify-between gap-2 sm:gap-4 items-center'>
          { userSlice?.token != null && 
          <Link 
            to='/create' 
            className='text-xl text-black hover:bg-gray-200 p-2 rounded-full border-2'
          >
            <BiPlus />
          </Link> }
          <li className='cursor-pointer relative' ref={userIconRef}>
            <img 
              className='w-10 h-10 object-cover rounded-full border-2 focus:border-slate-900 '
              src={UserIcon} 
              onClick={() => setIsOpen(!isOpen)}
              alt='user icon'
            />
            <div className={`${!isOpen && 'hidden'} bg-white py-2 rounded-lg mt-2 absolute right-0 w-48 shadow-xl border`}>
              { userSlice?.token != null ? 
                <>
                  <Link 
                    to='/logout'
                    className='text-sm text-slate-900 py-2 px-3 hover:bg-gray-200 block'
                    onClick={handleClick}
                  >
                    Logout
                  </Link>
                </>
                : 
                <>
                  <Link 
                    to='/login'
                    className='text-sm text-slate-900 py-2 px-3 hover:bg-gray-200 block' 
                    onClick={handleClick}
                  >
                    Login
                  </Link>
                  <Link 
                    to='/register'
                    className='text-sm text-slate-900 py-2 px-3 hover:bg-gray-200 block' 
                    onClick={handleClick}
                  >
                    Register
                  </Link>
                </> }
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;