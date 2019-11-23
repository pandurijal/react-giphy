import React, { useState } from 'react';

const SearchBar = props => {
  const [query, setQuery] = useState(props.query);

  const onSearchChanged = e => {
    const { name, value } = e.target;
    setQuery(value);
    console.log({ name, value });
    props.onSearchChanged(name, value);
  };

  return (
    <form className="component-form">
      <input
        name="query"
        type="text"
        className="component-searchbar"
        placeholder="Start searching for images!"
        autoFocus
        value={query}
        onChange={onSearchChanged}
        onKeyPress={props.onKeyPressed}
      />
    </form>
  );
};

export { SearchBar };
