import React from 'react';

const Loading = () => {
  const numberOfRepeatingDivs = 8;
  return (
    <>
      {[...Array(numberOfRepeatingDivs)].map(() => (
        <div className='grid-item__skeleton' />
      ))}
    </>
  );
};

export { Loading };
