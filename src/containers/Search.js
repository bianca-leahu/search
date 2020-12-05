import React, { Component } from 'react';
import './search.scss';
import SearchIcon from '../assets/images/search.svg';
import FilterIcon from '../assets/images/filter.svg';
import NoFilterIcon from '../assets/images/no-filter.svg';
import AutocompleteMenu from './AutocompleteMenu';
import FilterList from './FilterList';
import FilterPill from './FilterPill';
import {
  getListType,
  getInitialList,
  getStatusList,
  getStatusListType,
  getCostsList,
} from '../assets/helpers';

export default class Search extends Component {
  state = {
    inputValue: '',
    isAutocompleteOpen: false,
    filterPills: [],
    filterLists: [],
    isCosts: false,
    showFilterList: false,
  };

  wrapperRef = React.createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ isCosts: false, isAutocompleteOpen: false });
    }
  };

  toggleFilterList = () => {
    this.setState({
      showFilterList: !this.state.showFilterList,
    });
  };

  getValues = (val) => {
    if (!val) {
      this.openAutocomplete();
    }

    if (
      val === 'date' ||
      val === 'title' ||
      val === 'trainer' ||
      val === 'venue' ||
      val === 'learners' ||
      val === 'created by' ||
      val === 'created at'
    ) {
      this.nameInput.focus();
      this.setState({
        inputValue: `${val}: `,
        isAutocompleteOpen: false,
      });
    } else {
      this.setState({
        inputValue: val,
      });
    }
  };

  toggleAutocomplete = () => {
    this.setState({
      isAutocompleteOpen: !this.state.isAutocompleteOpen,
    });
  };

  openAutocomplete = () => {
    this.setState({
      isAutocompleteOpen: true,
    });
  };

  setFilter = (val) => {
    // logic for Costs 2nd step option
    if (this.state.isCosts) {
      const costValue = val.match(/"([^"]+)"/)[1]; // get costs value from the double quotes
      if (this.state.filterPills.includes(costValue)) {
        return;
      } else {
        this.setState({
          inputValue: '',
          filterPills: this.state.filterPills.concat(
            `Costs ${val.charAt(0)} ${costValue}`
          ),
          filterLists: this.state.filterLists.concat(
            `Costs ${val.charAt(0)} ${costValue}`
          ),
          isCosts: false,
          isAutocompleteOpen: false,
        });
      }
    } else if (this.state.inputValue === 'status') {
      // logic for Status 1st step option
      this.setState({
        inputValue: `${this.state.inputValue} ${val.charAt(0)}`,
      });
    } else if (this.state.inputValue.includes('status ')) {
      // logic for Status 2nd step option
      if (this.state.filterPills.includes(`${this.state.inputValue} ${val}`)) {
        return;
      } else {
        this.setState({
          inputValue: '',
          filterPills: this.state.filterPills.concat(
            `${this.state.inputValue} ${val}`
          ),
          filterLists: this.state.filterLists.concat(
            `${this.state.inputValue} ${val}`
          ),
        });

        this.toggleAutocomplete();
      }
    } else if (val === 'costs') {
      // logic for Costs 1st step option
      this.nameInput.focus();
      this.setState({
        inputValue: '',
        isCosts: true,
      });
    } else if (
      // logic for rest of options
      val === 'date' ||
      val === 'title' ||
      val === 'trainer' ||
      val === 'venue' ||
      val === 'learners' ||
      val === 'created by' ||
      val === 'created at'
    ) {
      this.nameInput.focus();
      this.setState({
        inputValue: `${val}: `,
        isAutocompleteOpen: false,
      });
    } else {
      this.setState({ inputValue: val });
    }
  };

  removePill = (val) => {
    const updatedFilterPills = this.state.filterPills.filter(
      (item) => item !== val
    );

    this.setState({ filterPills: updatedFilterPills });
  };

  addFilterList = (val) => {
    if (this.state.filterPills.includes(val)) {
      return;
    } else {
      this.setState({
        filterPills: this.state.filterPills.concat(val),
      });
    }

    this.toggleFilterList();
  };

  resetFilter = () => {
    this.setState({
      filterPills: [],
      filterLists: [],
    });
  };

  keyPress = (e) => {
    if (e.keyCode == 13) {
      this.setState({
        inputValue: '',
        filterPills: this.state.filterPills.concat(e.target.value),
        filterLists: this.state.filterLists.concat(e.target.value),
      });
      this.nameInput.blur();
    }
  };

  render() {
    const {
      inputValue,
      isAutocompleteOpen,
      filterPills,
      isCosts,
      filterLists,
      showFilterList,
    } = this.state;

    const initialList = getInitialList();
    const statusList = getStatusList();
    const statusListType = getStatusListType();
    const costsList = getCostsList(inputValue);
    const list = getListType(
      isCosts,
      inputValue,
      costsList,
      statusList,
      statusListType,
      initialList
    );

    return (
      <div className="search">
        <div className="search__content">
          <div className="search__content-bar">
            <div className="search__filter">
              <div className="d-flex align-items-center">
                <img
                  src={SearchIcon}
                  alt="search"
                  className="search__filter-icon"
                />
                {filterPills &&
                  filterPills.map((item) => (
                    <FilterPill
                      key={item}
                      pill={item}
                      removePill={(val) => this.removePill(val)}
                    />
                  ))}
                <input
                  className="search__input"
                  ref={(input) => {
                    this.nameInput = input;
                  }}
                  onKeyDown={this.keyPress}
                  type="text"
                  onChange={(e) => this.getValues(e.target.value)}
                  value={inputValue}
                  placeholder={
                    isCosts
                      ? 'Type the value for costs...'
                      : 'Filter questions or search for a question...'
                  }
                  onFocus={this.openAutocomplete}
                />
              </div>
              <div className="search__input-filter">
                <img
                  className="search__input-filter-icon"
                  src={FilterIcon}
                  alt="filter"
                  onClick={this.toggleFilterList}
                />
                {showFilterList && (
                  <FilterList
                    filterLists={filterLists}
                    addFilterList={(val) => this.addFilterList(val)}
                    toggleFilterList={this.toggleFilterList}
                    filterPills={filterPills}
                  />
                )}
              </div>
            </div>
            <img
              className="search__no-filter"
              onClick={this.resetFilter}
              src={NoFilterIcon}
              alt="filter"
            />
          </div>
          <div ref={this.wrapperRef} className="d-inline-block">
            {isAutocompleteOpen && (
              <AutocompleteMenu
                setFilter={(val) => this.setFilter(val)}
                list={list}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
