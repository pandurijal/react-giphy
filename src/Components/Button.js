import React from 'react';

const Button = props => {
  return (
    <button className="btn-more" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export { Button };
