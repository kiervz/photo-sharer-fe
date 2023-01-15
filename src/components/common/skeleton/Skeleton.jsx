import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
  
export const SkeletonPosts = () => {
  return (
    <div 
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-co'
    >
      <div className='flex flex-col'>
        <Skeleton height={400} className='visible' />
        <Skeleton height={25} className='mt-3'/>
        <Skeleton height={25} />
        <Skeleton height={25} />
      </div>
      <div className='flex flex-col'>
        <Skeleton height={400} className='visible' />
        <Skeleton height={25} className='mt-3'/>
        <Skeleton height={25} />
        <Skeleton height={25} />
      </div>
      <div className='flex flex-col'>
        <Skeleton height={400} className='invisible md:visible' />
        <Skeleton height={25} className='invisible md:visible mt-3' />
        <Skeleton height={25} className='invisible md:visible' />
        <Skeleton height={25} className='invisible md:visible' />
      </div>
      <div className='flex flex-col'>
        <Skeleton height={400} className='invisible lg:visible' />
        <Skeleton height={25} className='invisible lg:visible mt-3' />
        <Skeleton height={25} className='invisible lg:visible' />
        <Skeleton height={25} className='invisible lg:visible' />
      </div>
    </div>
  );
};