import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

const breakPointsObj = {
  default: 4,
  1200: 3,
  1000: 2,
  500: 1
};

const MasonryLayout = ({ pins }) => {
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols={breakPointsObj}>
      { pins?.map((pin) => <Pin key={pin.id} {...pin} className="w-max" />) }
    </Masonry>
  );
};
  
export default MasonryLayout;
  