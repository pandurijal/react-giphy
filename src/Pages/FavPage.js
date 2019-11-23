import React, { Component } from 'react';

class FavPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { favImg } = this.props;
    console.log({ favImg });
    return (
      <div className="grid-row">
        {favImg.length > 0 ? (
          favImg.map(val => {
            const srcImg = val.srcImg;
            const favorited =
              favImg.findIndex(fav => fav.id === val.id) !== -1 ? true : false;
            return (
              <div className="grid-item" key={val.id}>
                <div className="grid-content">
                  <img src={srcImg} alt="img" />
                  <div
                    className="fav-btn__wrapper"
                    onClick={() => this.props.onFavClicked(val.id, srcImg)}
                  >
                    <div
                      className={`fav-btn ${favorited ? 'favorited' : ''}`}
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
        <div className="btn-more__wrapper">
          {favImg.length >= 8 && (
            <button className="btn-more" onClick={this.onLoadMoreClicked}>
              Load more images!
            </button>
          )}
        </div>
        {/* {isLoading && (
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
        )} */}
      </div>
    );
  }
}

export default FavPage;
