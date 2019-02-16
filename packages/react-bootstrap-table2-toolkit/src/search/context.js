/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */
/* eslint no-continue: 0 */
/* eslint no-lonely-if: 0 */
/* eslint class-methods-use-this: 0 */
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
      searchText: PropTypes.string,
      dataChangeListener: PropTypes.object
    }

    constructor(props) {
      super(props);
      let initialData = props.data;
      if (isRemoteSearch() && this.props.searchText !== '') {
        handleRemoteSearchChange(this.props.searchText);
      } else {
        initialData = this.search(props);
        this.triggerListener(initialData);
      }
      this.state = { data: initialData };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.searchText !== this.props.searchText) {
        if (isRemoteSearch()) {
          handleRemoteSearchChange(nextProps.searchText);
        } else {
          const result = this.search(nextProps);
          this.triggerListener(result);
          this.setState({
            data: result
          });
        }
      } else {
        if (isRemoteSearch()) {
          this.setState({ data: nextProps.data });
        } else if (!_.isEqual(nextProps.data, this.props.data)) {
          const result = this.search(nextProps);
          this.triggerListener(result);
          this.setState({
            data: result
          });
        }
      }
    }

    triggerListener(result) {
      if (this.props.dataChangeListener) {
        this.props.dataChangeListener.emit('filterChanged', result.length);
      }
    }

    search(props) {
      const { data, columns } = props;
      const searchText = props.searchText.toLowerCase();
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
      return (
        <SearchContext.Provider value={ { data: this.state.data } }>
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
