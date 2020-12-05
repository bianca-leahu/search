import React from 'react';
import CloseIcon from '../assets/images/close.svg';
import PropTypes from 'prop-types';

FilterPill.propTypes = {
  pill: PropTypes.string.isRequired,
  removePill: PropTypes.func.isRequired,
};

export default function FilterPill({removePill, pill}) {
  return (
    <p
      className="search__filter-item"
      onClick={() => removePill(pill)}
    >
      {pill} &nbsp;
      <img src={CloseIcon} alt="close" />
    </p>
  );
}
