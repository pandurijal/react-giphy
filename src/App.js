import React, { Component } from 'react';
import './App.css';

import SearchPage from './Pages/SearchPage';
import FavPage from './Pages/FavPage';

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
              <p className="app-title">GallerEasy</p>
            </div>
            <div className="app-menu__wrapper">
              <p className="app-menu">Search</p>
              <p className="app-menu">Favourites ({favImg.length})</p>
            </div>
          </div>
        </nav>
        <div className="container">
          <SearchPage favImg={favImg} onFavClicked={this.onFavClicked} />
        </div>
        <footer className="app-footer">
          <p>GallerEasy | 2359 Media</p>
        </footer>
      </div>
    );
  }
}

export default App;
