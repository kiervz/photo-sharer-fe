import React from 'react';
import { Link } from 'react-router-dom';
import Error404 from '../../assets/images/error404.svg';

const Missing = () => {
  return (
    <div className='flex justify-center'>
      <img
        className='w-full sm:w-[50%] relative'
        src={Error404}
      />
      <span className='bottom-[50%] sm:top-[10%] text-xl absolute'> 
        Go back to
        <Link 
          to="/" 
          className='font-semibold'
        > Homepage
        </Link>
      </span>
      
    </div>
  );
};

export default Missing;