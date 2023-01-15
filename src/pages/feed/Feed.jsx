import React, { useEffect, useState } from 'react';
import MasonryLayout from './MasonryLayout';
import axios from '../../config/AxiosClient';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/v1/posts?sort=latest&paginate=10');
  
      setPosts(data.response.data);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      { loading ? 
        'Loading...' 
        : 
        posts && <MasonryLayout posts={posts} />
      }
    </>
  );
};

export default Feed;