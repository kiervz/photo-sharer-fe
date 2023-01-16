import { Dropdown } from 'flowbite-react';
import React from 'react';

const SortBy = ({ handleSelectedSort }) => {
  const handleSelectSortBy = (sort) => {
    handleSelectedSort(sort);
  };

  return (
    <div className='flex justify-end'>
      <Dropdown
        color='gray'
        label="Sort By"
        dismissOnClick={false}
      >
        <Dropdown.Item
          onClick={() => handleSelectSortBy('latest')}
        >
          Latest
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => handleSelectSortBy('oldest')}
        >
          Oldest
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => handleSelectSortBy('highest-votes')}
        >
          Highest Votes
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => handleSelectSortBy('lowest-votes')}
        >
          Lowest Votes
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default SortBy;