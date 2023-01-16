import React, { useEffect, useState } from 'react';

const SORT_BY = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'highest-votes', label: 'Highest Votes' },
  { value: 'lowest-votes', label: 'Lowest Votes' },
];

const SortBy = ({ handleSelectedSort, className }) => {
  const [sort, setSort] = useState('latest');

  useEffect(() => {
    handleSelectedSort(sort);
  }, [sort]);

  return (
    <div className={`${className} flex justify-end`}>
      <select 
        id='sort' 
        className='cursor-pointer bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-max p-2.5'
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        { SORT_BY.map(sort => (
          <option 
            value={sort.value} 
            key={sort.value}
          >
            {sort.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBy;