import React from 'react';
import PropTypes from 'prop-types';

AutocompleteMenu.propTypes = {
  list: PropTypes.array.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default function AutocompleteMenu({list, setFilter}) {
  return (
    <div className="search__list">
      {list.map((item) => (
        <p
          className="search__list-item"
          onClick={() => setFilter(item)}
          key={item}
        >
          {item}{' '}
          {item === 'Draft' ? (
            <span className="-draft" />
          ) : item === 'In Progress' ? (
            <span className="-progress" />
          ) : item === 'Ready' ? (
            <span className="-ready" />
          ) : item === 'Completed' ? (
            <span className="-completed" />
          ) : null}
        </p>
      ))}
    </div>
  );
}
