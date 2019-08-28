import React from 'react';
import PropTypes from 'prop-types';
import _ from './utils';

const FiltersCell = (props) => {
  const { index, column, onExternalFilter, currFilters, onFilter } = props;
  const { filterRenderer, filter } = column;
  let filterElm;
  const cellAttrs = {};
  const cellStyle = {};
  cellAttrs.style = cellStyle;
  if (column.headerAlign) {
    cellStyle.textAlign = _.isFunction(column.headerAlign)
      ? column.headerAlign(column, index)
      : column.headerAlign;
  }
  if (column.filterRenderer) {
    const onCustomFilter = onExternalFilter(column, filter.props.type);
    filterElm = filterRenderer(onCustomFilter, column);
  } else if (filter) {
    filterElm = (
      <filter.Filter
        { ...filter.props }
        filterState={ currFilters[column.dataField] }
        onFilter={ onFilter }
        column={ column }
      />
    );
  }
  return React.createElement('th', cellAttrs, filterElm);
};

FiltersCell.propTypes = {
  index: PropTypes.number.isRequired,
  column: PropTypes.object,
  onFilter: PropTypes.func,
  currFilters: PropTypes.object,
  onExternalFilter: PropTypes.func
};

export default FiltersCell;
