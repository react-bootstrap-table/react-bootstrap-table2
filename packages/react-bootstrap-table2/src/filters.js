/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import FiltersCell from './filters-cell';
import Const from './const';
import RowTemplate from './row/row-template';

const Filters = (props) => {
  const {
    columns,
    onFilter,
    currFilters,
    filterPosition,
    onExternalFilter,
    className,
    selectRow,
    expandRow
  } = props;

  function renderContent() {
    const filterColumns = [];
    let showFiltersRow = false;

    columns.forEach((column, i) => {
      filterColumns.push(<FiltersCell
        index={ i }
        key={ column.dataField }
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
    return filterColumns;
  }

  return (
    <tbody
      className={ className }
      style={ {
        display:
        filterPosition === Const.FILTERS_POSITION_TOP
          ? 'table-header-group'
          : 'table-footer-group'
      } }
    >
      <RowTemplate
        renderContent={ renderContent }
        selectRow={ selectRow }
        expandRow={ expandRow }
        cellEl="td"
      />
    </tbody>
  );
};

Filters.propTypes = {
  columns: PropTypes.array.isRequired,
  onFilter: PropTypes.func,
  filterPosition: PropTypes.oneOf([
    Const.FILTERS_POSITION_TOP,
    Const.FILTERS_POSITION_INLINE,
    Const.FILTERS_POSITION_BOTTOM
  ]),
  currFilters: PropTypes.object,
  onExternalFilter: PropTypes.func,
  className: PropTypes.string,
  selectRow: PropTypes.object,
  expandRow: PropTypes.object
};

Filters.defaultProps = {
  position: Const.FILTERS_POSITION_TOP
};

export default Filters;
