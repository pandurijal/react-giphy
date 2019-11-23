import React, { Component } from 'react';
import { Loading, SearchBar, Button } from '../Components';
import { searchImgService } from '../Service';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: {
        query: '',
        limit: 8,
        offset: 0
      },
      dataImg: [],
      isLoading: false,
      isLoaded: false
    };
  }

  onSearchChanged = (name, value) => {
    const { searchParams } = this.state;
    this.setState({
      searchParams: {
        ...searchParams,
        [name]: value
      }
    });
  };

  onKeyPressed = e => {
    const { key } = e;
    let { searchParams } = this.state;
    if (key === 'Enter') {
      searchParams = { ...searchParams, offset: 0 };
      e.preventDefault();
      this.setState(
        {
          dataImg: [],
          searchParams,
          isLoaded: false
        },
        () =>
          this.fetchImg(
            searchParams.query,
            searchParams.limit,
            searchParams.offset
          )
      );
    }
  };

  onLoadMoreClicked = () => {
    const { searchParams } = this.state;
    searchParams.offset = searchParams.offset + 8;
    this.fetchImg(searchParams.query, searchParams.limit, searchParams.offset);
    this.setState({
      searchParams
    });
  };

  fetchImg = async (query, limit, offset) => {
    this.setState({ isLoading: true });
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
    const { searchParams, dataImg, isLoading, isLoaded } = this.state;
    const { favImg, onFavClicked } = this.props;
    return (
      <div>
        <SearchBar
          query={searchParams.query}
          onSearchChanged={this.onSearchChanged}
          onKeyPressed={this.onKeyPressed}
        />
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
                          onClick={() => onFavClicked(val.id, srcImg)}
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
                <div className="blank-data__wrapper">
                  <p className="blank-data">
                    Sorry, we couldn't find images with that keyword
                  </p>
                </div>
              )}
            </>
          )}
          <div className="btn-more__wrapper">
            {isLoaded && dataImg.length >= 8 && !isLoading && (
              <Button onClick={this.onLoadMoreClicked}>
                Load more images!
              </Button>
            )}
          </div>
          {isLoading && <Loading />}
        </div>
      </div>
    );
  }
}

export default Search;
