import React from 'react';
import Masonry from 'react-masonry-css';
import Post from '../post/Post';

const breakPointsObj = {
  default: 4,
  1400: 3,
  1100: 2,
  500: 1
};

const MasonryLayout = ({ posts }) => {
  return (
    <Masonry 
      className='flex animate-slide-fwd' 
      breakpointCols={breakPointsObj}
    >
      { posts?.map((post) => <Post key={post.id} {...post} className="w-max" />) }
    </Masonry>
  );
};
  
export default MasonryLayout;
  