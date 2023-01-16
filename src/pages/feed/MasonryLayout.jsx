import React from 'react';
import Masonry from 'react-masonry-css';

const Post = React.lazy(() => import('../post/Post'));

const breakPointsObj = {
  default: 4,
  1400: 3,
  1100: 2,
  500: 1
};

const MasonryLayout = ({ posts, handleDelete, handleTotalVotes }) => {
  return (
    <Masonry 
      className='flex animate-slide-fwd' 
      breakpointCols={breakPointsObj}
    >
      { posts?.map(post => (
        <Post 
          handleDelete={handleDelete}
          handleTotalVotes={handleTotalVotes}
          key={post.id} 
          {...post} 
          className="w-max" 
        />
      )) }
    </Masonry>
  );
};
  
export default MasonryLayout;
  