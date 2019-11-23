import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <nav className="app-navbar">
      <div className="container">
        <div className="app-title__wrapper">
          <Link to="/">
            <p className="app-title">{props.title}</p>
          </Link>
        </div>
        <div className="app-menu__wrapper">{props.children}</div>
      </div>
    </nav>
  );
};

export { Navbar };
