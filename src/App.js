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
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchImg !== this.state.searchImg) {
      this.fetchImg();
    }
  }

  onSearchChanged = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  fetchImg = async () => {
    const { searchImg } = this.state;
    const res = await searchImgService(searchImg);
    this.setState({
      dataImg: res
    });
  };

  render() {
    const { searchImg, dataImg } = this.state;
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
            />
          </form>
          <div className="grid-row">
            {dataImg.data.map(val => (
              <div className="grid-item">
                <img
                  src="https://2359media.com/static/media/our-first-app.1c622491.jpg"
                  alt="img"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
