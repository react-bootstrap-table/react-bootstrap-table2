/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import FiltersCell from './filters-cell';
import Const from './const';

const Filters = (props) => {
  const {
    columns,
    onFilter,
    currFilters,
    position,
    onExternalFilter,
    className
  } = props;

  const filterColumns = [];
  let showFiltersRow = false;

  columns.forEach((column, i) => {
    filterColumns.push(<FiltersCell
      index={ i }
      column={ column }
      currFilters={ currFilters }
      onExternalFilter={ onExternalFilter }
      onFilter={ onFilter }
    />);

    if (column.filterRenderer || column.filter) {
      if (!showFiltersRow) {
        showFiltersRow = true;
      }
    }
  });

  return (
    <tfoot
      className={ className }
      style={ {
        display:
          position === Const.FILTERS_POSITION_TOP
            ? 'table-header-group'
            : 'table-footer-group'
      } }
    >
      <tr>{filterColumns}</tr>
    </tfoot>
  );
};

Filters.propTypes = {
  columns: PropTypes.array.isRequired,
  onFilter: PropTypes.func,
  position: PropTypes.oneOf([
    Const.FILTERS_POSITION_TOP,
    Const.FILTERS_POSITION_BOTTOM
  ]),
  currFilters: PropTypes.object,
  onExternalFilter: PropTypes.func,
  className: PropTypes.string
};

Filters.defaultProps = {
  position: Const.FILTERS_POSITION_TOP
};

export default Filters;
