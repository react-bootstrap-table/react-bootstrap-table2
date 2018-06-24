/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Const from './const';

import HeaderCell from './header-cell';
import SelectionHeaderCell from './row-selection/selection-header-cell';

const Header = (props) => {
  const { ROW_SELECT_DISABLED } = Const;

  const {
    columns,
    onSort,
    onFilter,
    sortField,
    sortOrder,
    selectRow,
    onExternalFilter
  } = props;

  return (
    <thead>
      <tr>
        {
          (selectRow.mode !== ROW_SELECT_DISABLED && !selectRow.hideSelectColumn)
            ? <SelectionHeaderCell { ...selectRow } /> : null
        }
        {
          columns.map((column, i) => {
            if (!column.hidden) {
              const currSort = column.dataField === sortField;
              const isLastSorting = column.dataField === sortField;

              return (
                <HeaderCell
                  index={ i }
                  key={ column.dataField }
                  column={ column }
                  onSort={ onSort }
                  sorting={ currSort }
                  onFilter={ onFilter }
                  onExternalFilter={ onExternalFilter }
                  sortOrder={ sortOrder }
                  isLastSorting={ isLastSorting }
                />);
            }
            return false;
          })
        }
      </tr>
    </thead>
  );
};

Header.propTypes = {
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  onFilter: PropTypes.func,
  sortField: PropTypes.string,
  sortOrder: PropTypes.string,
  selectRow: PropTypes.object,
  onExternalFilter: PropTypes.func
};

export default Header;
