import React, { useEffect, useRef, useState } from 'react';
import UserIcon from '../../assets/images/user.png';
import { 
  HiDotsVertical, 
  HiOutlineTrash, 
  HiOutlinePencilAlt
} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Modal } from 'flowbite-react';
import { Button } from '../../components';

const CommentItem = ({ 
  id, 
  user, 
  text, 
  created_at,
  handleDeleteComment, 
  handleUpdateComment, 
  isLoadingComment 
}) => {
  let kebabRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [comment, setComment] = useState(text);
  const [error, setError] = useState('');
  const userState = useSelector(state => state.user);
  
  const handleDelete = () => handleDeleteComment(id);

  const hanldeComment = () => {
    if (comment?.length > 500) {
      return setError('The comment must not be greater than 500 characters.');
    }
    handleUpdateComment(id, comment);
    setIsOpenModal(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      if (!kebabRef?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    });
  });
  
  return (
    <div className='mt-7'>
      <div className='flex justify-start gap-2 mb-2'>
        <img 
          src={UserIcon} 
          className='w-8 h-8 object-cover rounded-full cursor-pointer'
          alt='Commentator Picture'
        />
        <div className='w-full' ref={kebabRef}>
          <div className='flex justify-between items-center relative'>
            <div className='flex justify-start items-center gap-2'>
              <p className='text-sm font-semibold cursor-pointer h-6 mt-1 w-max'>{ user.name }</p>
              <small className='text-gray-900' style={{fontSize:'10px', lineHeight: '20px'}}>•</small>
              <small className='text-gray-500 text-sm'>{ created_at }</small>
            </div>
            { user.id === userState.data.id && 
              <>
                <HiDotsVertical 
                  className='cursor-pointer'
                  onClick={() => setIsOpen(!isOpen)}
                />
                <div className={`${!isOpen && 'hidden'} bg-white py-2 rounded-lg mt-2 absolute right-0 top-[50%] w-48 shadow-xl border z-50`}>
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li onClick={() => setIsOpenModal(!false)}>
                      <p 
                        className="cursor-pointer px-4 py-2 text-black hover:bg-gray-100 flex gap-2 justify-start items-center"
                      > 
                        <HiOutlinePencilAlt size={20} />
                        Edit
                      </p>
                    </li>
                    <li onClick={handleDelete}>
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
                    <label 
                      htmlFor="updateMessage" 
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Update comment
                    </label>
                    <textarea 
                      id="updateMessage" 
                      rows="3" 
                      className={`${error?.length > 0 ? 'border-red-600' : 'border-gray-300'} block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:border-blue-500`}
                      placeholder="Write your thoughts here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    >
                    </textarea>
                    { error?.length > 0 && <span className="text-xs tracking-wide text-red-600">{ error }</span> } 
                    <div className='text-right'>
                      <Button 
                        className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 rounded-lg text-sm px-5 py-2 my-2 disabled:bg-gray-100 disabled:cursor-not-allowed'
                        isDisabled={comment.length === 0}
                        loading={isLoadingComment}
                        btnText='Update'
                        onClick={hanldeComment}
                      />
                    </div>
                  </Modal.Body>
                </Modal>
              </> }
          </div>
          <p className='text-sm'>
            { text }
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;