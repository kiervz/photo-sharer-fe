import React from 'react';

const Content = (props) => {
  return (
    <div className='m-auto min-w-[80%] mt-10 w-[80%]'>
      { props.children }
    </div>
  );
};

export default Content;