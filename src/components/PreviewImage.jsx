import React, { useState } from 'react';

export const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState({});

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }

  return (
    <>
      <img 
        src={preview}
        alt="uploaded picture"
        className="p-2"
      />
    </>
  );
};
