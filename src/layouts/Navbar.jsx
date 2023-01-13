import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='absolute top-0 left-0 w-full z-10 shadow-md'>
      <div className='flex items-center justify-between pt-3 pb-3 min-w-[90%] m-auto px-5 sm:px-20'>
        <Link to='/' className=' text-[1.2rem] font-semibold text-red-600'>PhotoShare</Link>

        <div className='flex items-center gap-x-6 no-underline'>
          <Link to='/upload' className='text-3xl'>
            +
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;