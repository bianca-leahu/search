import React from 'react';
import CheckIcon from '../assets/images/check2.png';
import PropTypes from 'prop-types';

FilterList.propTypes = {
  filterLists: PropTypes.array.isRequired,
  addFilterList: PropTypes.func.isRequired,
  toggleFilterList: PropTypes.func.isRequired,
  filterPills: PropTypes.array.isRequired,
};

export default function FilterList({filterLists, addFilterList, toggleFilterList, filterPills}) {
  return (
    <div className="search__input-filter-menu">
      {filterLists && filterLists.length ? (
        filterLists.map((item, i) => (
          <p
            className="search__input-filter-menu-item"
            key={item}
            onClick={() => addFilterList(item)}
          >
            Filtered List {i + 1}
            {filterPills.includes(item) ? (
              <img src={CheckIcon} alt="check" />
            ) : null}
          </p>
        ))
      ) : (
        <p
          className="search__input-filter-menu-item -no-data"
          onClick={toggleFilterList}
        >
          No filters added yet
        </p>
      )}
    </div>
  );
}
