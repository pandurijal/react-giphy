import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    return (
      <div className="App">
        <nav className="app-navbar">
          <div className="container">
            <div className="app-title__wrapper">
              <Link to="/">
                <p className="app-title">GallerEasy</p>
              </Link>
            </div>
            <div className="app-menu__wrapper">
              <Link to="/search">
                <p className="app-menu active">Search</p>
              </Link>
              <Link to="/fav">
                <p className="app-menu">Favourites ({favImg.length})</p>
              </Link>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.props.location.pathname === '/search' ||
            (this.props.location.pathname === '/' && (
              <SearchPage favImg={favImg} onFavClicked={this.onFavClicked} />
            ))}
          {this.props.location.pathname === '/fav' && (
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
