import React, { Component } from 'react';
import './App.css';

import { searchImgService } from './Service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchImg: '',
      dataImg: {
        data: []
      },
      isLoading: false
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
      this.fetchImg();
    }
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
    this.setState({ isLoading: false });
  };

  render() {
    const { searchImg, dataImg, isLoading } = this.state;
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
            {dataImg.data.map(val => {
              const srcImg = val.images.original.url;
              return (
                <div className="grid-item" key={val.id}>
                  <img src={srcImg} alt="img" />
                  <div className="fav-btn__wrapper">
                    <div className="fav-btn" />
                  </div>
                </div>
              );
            })}
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
