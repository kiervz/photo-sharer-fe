import React, { useEffect, useState } from 'react';
import axios from '../../config/AxiosClient';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SkeletonPost } from '../../components';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

import UserIcon from '../../assets/images/user.png';
import Comment from './Comment';
import CommentItem from './CommentItem';

const PostDetail = () => {
  const params = useParams();
  const userState = useSelector(state => state.user);

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/v1/posts/${params.id}`);
  
      setPost(data.response);
      setComments(data.response.comments.data);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
    } finally { 
      setLoading(false); 
    }
  };

  const handleAddComment = async (comment) => {
    try {
      setIsLoadingComment(true);
      const { data } = await axios.post('/api/v1/comments', {
        post_id: post.id,
        text: comment
      });
      
      const newComment = data.response;

      setComments([
        ...comments, {
          id: newComment.id,
          post_id: newComment.post_id,
          text: newComment.text,
          user: {...newComment.user},
          created_at: newComment.created_at
        }
      ]);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
    } finally { 
      setIsLoadingComment(false); 
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`/api/v1/comments/${id}`);

      setComments([
        ...comments.filter(comment => {
          return comment.id !== id;
        })
      ]);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
    }
  };

  const handleUpdateComment = async (id, text) => {
    try {
      await axios.put(`/api/v1/comments/${id}`, {
        text: text
      });
      
      setComments([
        ...comments.map(comment => (
          comment.id === id ? { ...comment, text} : comment
        ))
      ]);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      { loading ?
        <SkeletonPost />
        :
        <div className='flex flex-col sm:flex-row justify-center content-center'>
          <div className="w-full sm:w-[508px] max-w-full">
            <img 
              src={post.photo} 
              className='object-cover rounded-lg' 
            />
          </div>
          <div className='sticky top-0 p-2 sm:p-5 w-full sm:w-[508px]'>
            <div className='flex justify-start items-center gap-2'>
              <img src={UserIcon} className='w-8 h-8 object-cover rounded-full cursor-pointer' />
              <p className='cursor-pointer font-semibold'>{ post.user?.name }</p> 
              <small className='text-gray-900' style={{fontSize:'6px', lineHeight: '20px'}}>•</small>
              <small className='text-gray-500 text-sm'>{ post.created_at }</small>
            </div>
            <div className='py-2 sm:py-5'>
              <p>{ post.description }</p>
            </div>
            <div className={`flex justify-end gap-2 pt-2 pb-2 h-6 text-center items-center ${userState.token === '' && 'mb-10'}`}>
              <BiUpvote 
                className='text-2xl cursor-pointer hover:text-red-500' 
              />
              <p className='text-lg font-semibold cursor-default'>{ post.total_votes }</p>
              <BiDownvote 
                className='text-2xl cursor-pointer hover:text-gray-500' 
              />
            </div>
            { userState.token != '' &&
              <Comment 
                handleAddComment={handleAddComment}
                isLoadingComment={isLoadingComment}
              /> }
            <hr/>
            { comments.length > 0 ?
              comments.map(comment => (
                <CommentItem 
                  handleDeleteComment={handleDeleteComment}
                  handleUpdateComment={handleUpdateComment}
                  isLoadingComment={isLoadingComment}
                  key={comment.id} 
                  {...comment} 
                /> 
              ))
              :
              <p className='text-center text-sm py-2'>
                No Comments Yet
              </p> }
          </div>
        </div> }
    </>
  );
};

export default PostDetail;