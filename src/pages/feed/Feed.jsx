import React, { useEffect, useState } from 'react';
import MasonryLayout from './MasonryLayout';
import axios from '../../config/AxiosClient';
import { Button, SkeletonPosts } from '../../components';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [fromLoadMore, setFromLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const fetchPosts = async () => {
    if (!fromLoadMore) {
      setLoading(true);
    }

    try {
      const { data } = await axios.get(`/api/v1/posts?page=${currentPage}&sort=latest&paginate=10`);
  
      if (fromLoadMore) {
        setPosts(prev => [...prev, ...data.response.data]);
      } else {
        setPosts(data.response.data);
      }

      setMeta(data.response.meta);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
    } finally {
      setFromLoadMore(false);
      setLoading(false);
      setIsLoadingButton(false);
    }
  };

  const handleLoadMore = () => {
    if (Number(meta?.page) < Number(meta?.totalPages)) {
      setCurrentPage(prev => prev + 1);
      setFromLoadMore(true);
      setIsLoadingButton(true);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/posts/${id}`);

      setPosts([
        ...posts.filter(post => {
          return post.id !== id;
        })
      ]);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
    }
  };

  const handleTotalVotes = (id, total_votes) => {
    setPosts([
      ...posts.map(comment => (
        comment.id === id ? { ...comment, total_votes} : comment
      ))
    ]);
  };
  
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  return (
    <>
      { loading ? 
        <SkeletonPosts />
        : 
        posts.length > 0 ?
          <>
            <MasonryLayout 
              posts={posts} 
              handleDelete={handleDelete}
              handleTotalVotes={handleTotalVotes}
            />
            <div className='flex justify-center pt-8'>
              { currentPage !== meta?.totalPages 
                && 
                <Button 
                  className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 disabled:cursor-not-allowed'
                  btnText='Load More'
                  loading={isLoadingButton}
                  onClick={handleLoadMore}
                /> }
            </div>
          </>
          : 
          <p className='text-center text-sm'>No Post Available</p> }
    </>
  );
};

export default Feed;