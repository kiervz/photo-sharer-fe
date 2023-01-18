import React from 'react';

const Content = (props) => {
  return (
    <div className='m-auto min-w-[80%] my-10 w-full sm:w-[80%]'>
      { props.children }
    </div>
  );
};

export default Content;