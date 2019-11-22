import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { searchImgService } from './Service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchImg();
    }
  }

  onSearchChanged = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  fetchImg = () => {
    const { search } = this.state;
    const res = searchImgService(search);
    console.log({ res });
  };

  render() {
    const { search } = this.state;
    return (
      <div className="App">
        <div className="container">
          <form className="component-form">
            <input
              name="search"
              type="text"
              className="component-searchbar"
              placeholder="Start searching for images!"
              autoFocus
              value={search}
              onChange={this.onSearchChanged}
            />
          </form>
          <div className="grid-row">
            <div className="grid-item">
              <img
                src="https://2359media.com/static/media/our-first-app.1c622491.jpg"
                alt="img"
              />
            </div>
            <div className="grid-item">
              <img
                src="https://2359media.com/static/media/our-first-app.1c622491.jpg"
                alt="img"
              />
            </div>
            <div className="grid-item">
              <img
                src="https://2359media.com/static/media/our-first-app.1c622491.jpg"
                alt="img"
              />
            </div>
            <div className="grid-item">
              <img
                src="https://2359media.com/static/media/our-first-app.1c622491.jpg"
                alt="img"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
