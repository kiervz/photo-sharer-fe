import React, { useEffect, useState } from 'react';
import MasonryLayout from './MasonryLayout';
import axios from '../../config/AxiosClient';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState([]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/v1/posts?sort=highest-votes&paginate=10');
  
      setPins(data.response.data);
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
        pins && <MasonryLayout pins={pins} />
      }
    </>
  );
};

export default Feed;