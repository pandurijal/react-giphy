import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Components';

import SearchPage from './SearchPage';
import FavPage from './FavPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favImg: []
    };
  }

  onFavClicked = (id, srcImg) => {
    let { favImg } = this.state;
    const favIndex = favImg.findIndex(val => val.id === id);
    if (favIndex !== -1) {
      favImg = favImg.filter(val => val.id !== id);
    } else {
      favImg.push({ id, srcImg });
    }
    this.setState({
      favImg
    });
  };

  render() {
    const { favImg } = this.state;
    const { pathname } = this.props.location;

    return (
      <div className="App">
        <Navbar title="GallerEasy">
          <Link to="/">
            <p className={`app-menu ${pathname === '/' ? 'active' : ''}`}>
              Search
            </p>
          </Link>
          <Link to="/fav">
            <p className={`app-menu ${pathname === '/fav' ? 'active' : ''}`}>
              Favourites {`${favImg.length ? favImg.length : ''}`}
            </p>
          </Link>
        </Navbar>
        <div className="container">
          {pathname === '/' && (
            <SearchPage favImg={favImg} onFavClicked={this.onFavClicked} />
          )}
          {pathname === '/fav' && (
            <FavPage favImg={favImg} onFavClicked={this.onFavClicked} />
          )}
        </div>
        <footer className="app-footer">
          <p>GallerEasy | 2359 Media</p>
        </footer>
      </div>
    );
  }
}

export default App;
