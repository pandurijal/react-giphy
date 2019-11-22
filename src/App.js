import React, { Component } from 'react';
import './App.css';

import { searchImgService } from './Service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchImg: '',
      dataImg: {
        data: [],
        meta: {}
      },
      favImg: [],
      isLoading: false,
      isLoaded: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.searchImg !== this.state.searchImg) {
    //   this.fetchImg();
    // }
  }

  onSearchChanged = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onKeyPressed = e => {
    const { key } = e;
    if (key === 'Enter') {
      e.preventDefault();
      this.setState({
        dataImg: {
          data: [],
          meta: {}
        }
      });
      this.fetchImg();
    }
  };

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
    console.log({ val: JSON.stringify(id, srcImg) });
  };

  fetchImg = async () => {
    this.setState({ isLoading: true });
    try {
      const { searchImg } = this.state;
      const res = await searchImgService(searchImg);
      this.setState({
        dataImg: res
      });
    } catch (error) {
      console.error(error);
    }
    this.setState({ isLoading: false, isLoaded: true });
  };

  render() {
    const { searchImg, dataImg, favImg, isLoading, isLoaded } = this.state;
    console.log({ dataImg, favImg, isLoaded });
    return (
      <div className="App">
        <div className="container">
          <form className="component-form">
            <input
              name="searchImg"
              type="text"
              className="component-searchbar"
              placeholder="Start searching for images!"
              autoFocus
              value={searchImg}
              onChange={this.onSearchChanged}
              onKeyPress={this.onKeyPressed}
            />
          </form>
          <div className="grid-row">
            {dataImg.meta.status === 200 && (
              <>
                {dataImg.data.length > 0 ? (
                  dataImg.data.map(val => {
                    const srcImg = val.images.original.url;
                    const favorited =
                      favImg.findIndex(fav => fav.id === val.id) !== -1
                        ? true
                        : false;
                    console.log({ favorited });
                    return (
                      <div className="grid-item" key={val.id}>
                        <img src={srcImg} alt="img" />
                        <div
                          className="fav-btn__wrapper"
                          onClick={() => this.onFavClicked(val.id, srcImg)}
                        >
                          <div
                            className={`fav-btn ${
                              favorited ? 'favorited' : ''
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="zero-data">
                    <p>Sorry, we couldn't find images with that keyword</p>
                  </div>
                )}
              </>
            )}
            {isLoading && (
              <>
                <div className="grid-item__skeleton" />
                <div className="grid-item__skeleton" />
                <div className="grid-item__skeleton" />
                <div className="grid-item__skeleton" />
                <div className="grid-item__skeleton" />
                <div className="grid-item__skeleton" />
                <div className="grid-item__skeleton" />
                <div className="grid-item__skeleton" />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
