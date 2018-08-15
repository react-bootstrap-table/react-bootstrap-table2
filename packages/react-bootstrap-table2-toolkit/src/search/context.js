/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-continue: 0 */
import React from 'react';
import PropTypes from 'prop-types';

export default (options = {
  searchFormatted: false
}) => (
  _,
  isRemoteSearch,
  handleRemoteSearchChange
) => {
  const SearchContext = React.createContext();

  class SearchProvider extends React.Component {
    static propTypes = {
      data: PropTypes.array.isRequired,
      columns: PropTypes.array.isRequired,
      searchText: PropTypes.string
    }

    constructor(props) {
      super(props);
      this.performRemoteSearch = props.searchText !== '';
    }

    componentWillReceiveProps(nextProps) {
      if (isRemoteSearch()) {
        if (nextProps.searchText !== this.props.searchText) {
          this.performRemoteSearch = true;
        } else {
          this.performRemoteSearch = false;
        }
      }
    }

    search() {
      const { data, columns } = this.props;
      let { searchText } = this.props;

      if (isRemoteSearch() && this.performRemoteSearch) {
        handleRemoteSearchChange(searchText);
        return data;
      }

      searchText = searchText.toLowerCase();
      return data.filter((row, ridx) => {
        for (let cidx = 0; cidx < columns.length; cidx += 1) {
          const column = columns[cidx];
          if (column.searchable === false) continue;
          let targetValue = _.get(row, column.dataField);
          if (column.formatter && options.searchFormatted) {
            targetValue = column.formatter(targetValue, row, ridx, column.formatExtraData);
          } else if (column.filterValue) {
            targetValue = column.filterValue(targetValue, row);
          }
          if (targetValue !== null && typeof targetValue !== 'undefined') {
            targetValue = targetValue.toString().toLowerCase();
            if (targetValue.indexOf(searchText) > -1) {
              return true;
            }
          }
        }
        return false;
      });
    }

    render() {
      const data = this.search();
      return (
        <SearchContext.Provider value={ { data } }>
          { this.props.children }
        </SearchContext.Provider>
      );
    }
  }

  return {
    Provider: SearchProvider,
    Consumer: SearchContext.Consumer
  };
};
