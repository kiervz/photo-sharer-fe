import React, { useState } from 'react';
import { BiCloudUpload, BiTrash, BiRefresh, BiSave } from 'react-icons/bi';

const CreatePost = () => {
  const [wrongImageType, setWrongImageType] = useState(false);
  const [image, setImage] = useState(null);
  const [catFact, setCatFact] = useState('');
  const [showSave, setShowSave] = useState(false);

  const handleUploadImage = (e) => {
    const selectedFile = e.target.files[0];
    const fileSizeKiloBytes = selectedFile.size / 1024;
    console.log(fileSizeKiloBytes);

    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpg' || selectedFile.type === 'image/jpeg') {
      setWrongImageType(false);
      setImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setWrongImageType(true);
    }
  };

  const handleSave = () => {
    console.log('save');
  };

  const generateCatFact = () => {
    let messageText = document.getElementById('message');
    messageText.innerText = '';
    let generatedText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic perspiciatis nam porro deserunt odio quam tenetur natus expedita recusandae esse earum praesentium dolorem enim, magnam tempore consectetur ratione doloribus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic perspiciatis nam porro deserunt odio quam tenetur natus expedita recusandae esse earum praesentium dolorem enim, magnam tempore consectetur ratione doloribus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic perspiciatis nam porro deserunt odio quam tenetur natus expedita recusandae esse earum praesentium dolorem enim, magnam tempore consectetur ratione doloribus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic perspiciatis nam porro deserunt odio quam tenetur natus expedita recusandae esse earum praesentium dolorem enim, magnam tempore consectetur ratione doloribus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit hic perspiciatis nam porro deserunt odio quam tenetur natus expedita recusandae esse earum praesentium dolorem enim, magnam tempore consectetur ratione doloribus?';
    let delay = 200;
    let splittedMessage = generatedText.split(' ');
    
    setCatFact(generatedText);
    
    for (const [index, value] of splittedMessage.entries()) {
      setTimeout(function() {
        messageText.innerText += ' ' + value;
      }, delay * index);
    }

    setShowSave(true);
  };

  return (
    <div className='flex flex-col sm:flex-row justify-center content-center'>
      <div className="w-full sm:w-[508px] max-w-full pt-5">
        <div 
          className='relative border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100'
        >
          { wrongImageType && 
            <p className='text-md text-red-600 text-center z-0'>
              It&apos;s wrong file type.
            </p> }
          { image ? 
            <div className='z-10'>
              <img
                src={image}
                alt="uploaded-pic"
                className="p-2"
              />
              <button
                type="button"
                className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md hover:bg-gray-100 transition-all duration-500 ease-in-out"
                onClick={() => setImage(null)}
              >
                <BiTrash />
              </button>
            </div>
            : 
            <label 
              htmlFor="dropzone-file" 
              className="flex flex-col items-center justify-center w-full cursor-pointer z-20"
            >
              <div className="flex flex-col items-center justify-center py-6">
                <BiCloudUpload 
                  className='text-5xl text-gray-500' 
                />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                  Click to upload
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG or JPG (MAX. 2MB)
                </p>
              </div>
              <input 
                id="dropzone-file" 
                type="file" 
                className="hidden" 
                onChange={handleUploadImage}
              />
            </label> }
        </div>
      </div> 
      <div className='sticky top-0 p-2 sm:p-5 w-full sm:w-[508px]'>
        <div className='flex justify-between pb-3 items-center'>
          <p className="block text-md font-medium text-gray-900">
          Generate some cat facts
          </p>
          <button 
            type="button" 
            className="text-gray-900 bg-white hover:bg-gray-100 border font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            onClick={generateCatFact}
          >
            <BiRefresh className='text-xl mr-1'/> 
            Generate
          </button>
        </div>
        <p id="message" className='border p-2 rounded-lg min-h-[30%]'></p>
        { showSave &&
        <div className='text-right mt-4'>
          <button 
            type="button" 
            className="text-white bg-red-600 hover:bg-red-700 border font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            onClick={handleSave}
          >
            <BiSave className='text-xl mr-1'/> 
            SAVE
          </button>
        </div> }
      </div>
    </div>
  );
};

export default CreatePost;