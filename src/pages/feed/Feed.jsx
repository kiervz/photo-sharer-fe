import React, { useEffect, useState } from 'react';
import MasonryLayout from './MasonryLayout';

const pinsData = [
  {
    id: 1,
    description: 'When a cat drinks, its tongue - which has tiny barbs on it - scoops the liquid up backwards.',
    photo: 'https://kvey-images.s3.ap-southeast-1.amazonaws.com/photos/491673543793.jpg'
  },
  {
    id: 2,
    description: 'Cats have 32 muscles that control the outer ear (compared to human\'s 6 muscles each). A cat can rotate its ears independently 180 degrees, and can turn in the direction of sound 10 times faster than those of the best watchdog.',
    photo: 'https://kvey-images.s3.ap-southeast-1.amazonaws.com/photos/1491673550583.jpg'
  },
  {
    id: 3,
    description: 'The life expectancy of cats has nearly doubled over the last fifty years.',
    photo: 'https://kvey-images.s3.ap-southeast-1.amazonaws.com/photos/1391673549927.jpg'
  },
  {
    id: 4,
    description: 'Approximately 1/3 of cat owners think their pets are able to read their minds.',
    photo: 'https://kvey-images.s3.ap-southeast-1.amazonaws.com/photos/101673550280.jpg'
  }
];

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState([]);

  if (loading) {
    return 'Loading...';
  }

  useEffect(() => {
    setLoading(false);
    setPins(pinsData);
  }, []);

  return (
    <div className=''>
      { pins && <MasonryLayout pins={pins} /> }
    </div>
  );
};

export default Feed;