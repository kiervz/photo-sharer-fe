import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='top-0 left-0 w-full z-10 shadow-md sticky bg-white'>
      <div className='flex items-center justify-between pt-3 pb-3 min-w-[80%] w-[80%] m-auto'>
        <Link to='/' className=' text-[1.2rem] font-semibold text-red-600'>PhotoShare</Link>

        <div className='flex items-center gap-x-6 no-underline'>
          <Link to='/create' className='text-xl text-white bg-red-600 p-2 rounded-full'>
            <BiPlus />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;