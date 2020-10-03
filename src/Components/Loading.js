import React from 'react';

const Loading = () => {
  const numberOfRepeatingDivs = 8;
  return (
    <>
      {[...Array(numberOfRepeatingDivs)].map((el, i) => (
        <div className="grid-item__skeleton" key={i}/>
      ))}
    </>
  );
};

export { Loading };
