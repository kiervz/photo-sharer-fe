import React, { useEffect, useRef, useState } from 'react';

import { notifyUser } from '../../utility/MessageHelper';
import { BiCommentDetail } from 'react-icons/bi';
import { 
  BsHandThumbsDown, 
  BsHandThumbsDownFill, 
  BsHandThumbsUp, 
  BsHandThumbsUpFill 
} from 'react-icons/bs';
import { 
  HiDotsVertical, 
  HiOutlineExclamationCircle, 
  HiOutlinePencilAlt, 
  HiOutlineTrash 
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button, Modal } from 'flowbite-react';


import UserIcon from '../../assets/images/user.png';
import axios from '../../config/AxiosClient';
import { useSelector } from 'react-redux';

const Post = ({ 
  id, 
  user, 
  description, 
  photo, 
  total_votes, 
  comments,
  votes,
  handleDelete,
  handleTotalVotes
}) => {
  let kebabRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [voteStatus, setVoteStatus] = useState(0);
  const userState = useSelector(state => state.user);

  const handleDeletePost = () => {
    handleDelete(id);
  };
  
  const voteUp = async () => {
    try {
      const { data } = await axios.post(`/api/v1/votes/${id}/up`);

      handleTotalVotes(id, data.response.total_votes);
      setVoteStatus(data.response.status);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
      if (err.response.status === 401) {
        notifyUser('error', 'Please login before voting.');
      }
    } 
  };

  const voteDown = async () => {
    try {
      const { data } = await axios.post(`/api/v1/votes/${id}/down`);

      handleTotalVotes(id, data.response.total_votes);
      setVoteStatus(data.response.status);
    } catch (err) {
      const error = err.response?.data?.message;
      console.log(error);
      if (err.response.status === 401) {
        notifyUser('error', 'Please login before voting.');
      }
    } 
  };

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (!kebabRef?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    }); 
  });

  useEffect(() => {
    if (votes?.length > 0) {
      setVoteStatus(votes[0].vote);
    }
  }, []);

  return (
    <div className='mt-2 mb-10'>
      <div className='relative w-auto sm:rounded-lg overflow-hidden transition-all duration-500 ease-in-out sm:m-3'>
        <div className='flex justify-between items-center relative' ref={kebabRef}>
          <div className='flex py-1 justify-start items-center gap-1'>
            <img src={UserIcon} className='w-6 h-6 ml-1 object-cover rounded-full cursor-pointer' />
            <p className='text-sm cursor-pointer font-semibold'>{ user.name }</p>
          </div>
          { userState.data.token != null && 
          <>
            <HiDotsVertical    
              className='cursor-pointer'
              onClick={() => setIsOpen(!isOpen)}
            />
            <div className={`${!isOpen && 'hidden'} bg-white py-2 rounded-lg mt-2 absolute right-0 top-[50%] w-48 shadow-xl border z-50`}>
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                <Link 
                  to={`/post/${id}/edit`}
                  className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100 flex gap-2 justify-start items-center"
                > 
                  <HiOutlinePencilAlt size={20} />
                      Edit
                </Link>
                <li onClick={() => setIsOpenModal(true)} >
                  <p
                    className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100 flex gap-2 justify-start items-center"
                  > 
                    <HiOutlineTrash size={20} />
                        Delete
                  </p>
                </li>
              </ul>
            </div>
            <Modal
              show={isOpenModal}
              size="md"
              popup={true}
              onClose={() => setIsOpenModal(false)}
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this Post?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="failure"
                      onClick={handleDeletePost}
                    >
                      {'Yes, I\'m sure'}
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => setIsOpenModal(false)}
                    >
                          No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </> }
        </div>
        <Link to={`/post/${id}`}>
          <LazyLoadImage 
            className='sm:rounded-lg w-full cursor-pointer' 
            src={photo} 
            alt='photo' 
          />
        </Link>
        <div className='p-2'>
          <div className='flex items-center text-center justify-between'>
            <div className='flex justify-center gap-2 pt-3 pb-2 h-6 text-center items-center'>
              { voteStatus === 1 ?
                <BsHandThumbsUpFill 
                  color={voteStatus === 1 ? 'red' : ''}
                  className='text-2xl cursor-pointer'
                  onClick={voteUp}
                /> : 
                <BsHandThumbsUp 
                  className='text-2xl cursor-pointer hover:text-red-500'
                  onClick={voteUp}
                /> }
              <p className='text-lg font-semibold cursor-default'>{ total_votes }</p>

              { voteStatus === -1 ?
                <BsHandThumbsDownFill 
                  className={`text-2xl cursor-pointer ${voteStatus === -1 ? 'text-blue-500' : ''}`}
                  onClick={voteDown}
                /> : 
                <BsHandThumbsDown 
                  className='text-2xl cursor-pointer hover:text-blue-500'
                  onClick={voteDown}
                /> }
            </div>
            <Link to={`/post/${id}`} className='flex items-center text-center justify-between gap-2 hover:text-blue-500'>
              <p className='text-lg font-semibold'>{ comments.total }</p>
              <BiCommentDetail 
                className='text-2xl cursor-pointer'
              />
            </Link>
          </div>
        </div>
        <div className='px-2 pb-2 text-sm gap-1'>
          <p>{ description }</p>
        </div>
      </div>
    </div>
  );
};

export default Post;