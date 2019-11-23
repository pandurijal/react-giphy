import React, { Component } from 'react';
import './App.css';

import { searchImgService } from './Service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchImg: '',
      searchParams: {
        limit: 8,
        offset: 0
      },
      dataImg: [],
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
    let { searchImg, searchParams } = this.state;
    if (key === 'Enter') {
      searchParams = { ...searchParams, offset: 0 };
      e.preventDefault();
      this.setState(
        {
          dataImg: [],
          searchParams,
          isLoaded: false
        },
        () => this.fetchImg(searchImg, searchParams.limit, searchParams.offset)
      );
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
  };

  onLoadMoreClicked = () => {
    const { searchImg, searchParams } = this.state;
    searchParams.offset = searchParams.offset + 8;
    this.fetchImg(searchImg, searchParams.limit, searchParams.offset);
    this.setState({
      searchParams
    });
  };

  fetchImg = async (query, limit, offset) => {
    this.setState({ isLoading: true });
    console.log({ query, limit, offset });
    const { dataImg } = this.state;
    try {
      const res = await searchImgService(query, limit, offset);
      this.setState({
        dataImg: [...dataImg, ...res.data]
      });
    } catch (error) {
      console.error(error);
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    this.setState({ isLoading: false, isLoaded: true });
  };

  render() {
    const { searchImg, dataImg, favImg, isLoading, isLoaded } = this.state;
    console.log({ dataImg });
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
            {isLoaded && (
              <>
                {dataImg.length > 0 ? (
                  dataImg.map(val => {
                    const srcImg = val.images.original.url;
                    const favorited =
                      favImg.findIndex(fav => fav.id === val.id) !== -1
                        ? true
                        : false;
                    return (
                      <div className="grid-item" key={val.id}>
                        <div className="grid-content">
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
            <div className="btn-more__wrapper">
              {isLoaded && dataImg.length >= 8 && !isLoading && (
                <button className="btn-more" onClick={this.onLoadMoreClicked}>
                  Load more images!
                </button>
              )}
            </div>
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
        <footer className="app-footer">
          <p>Gallereasy | 2359 Media</p>
        </footer>
      </div>
    );
  }
}

export default App;
