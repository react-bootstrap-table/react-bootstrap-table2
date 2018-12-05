/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import HeaderCell from './header-cell';
import SelectionHeaderCell from './row-selection/selection-header-cell';
import ExpandHeaderCell from './row-expand/expand-header-cell';
import withHeaderSelection from './row-selection/selection-header-cell-consumer';
import withHeaderExpansion from './row-expand/expand-header-cell-consumer';

const Header = (props) => {
  const {
    className,
    columns,
    onSort,
    onFilter,
    sortField,
    sortOrder,
    selectRow,
    onExternalFilter,
    expandRow
  } = props;

  let SelectionHeaderCellComp = () => null;
  let ExpansionHeaderCellComp = () => null;

  if (expandRow.showExpandColumn) {
    ExpansionHeaderCellComp = withHeaderExpansion(ExpandHeaderCell);
  }

  if (selectRow) {
    SelectionHeaderCellComp = withHeaderSelection(SelectionHeaderCell);
  }

  return (
    <thead>
      <tr className={ className }>
        <ExpansionHeaderCellComp />
        {
          !selectRow.hideSelectColumn ?
            <SelectionHeaderCellComp /> : null
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
  onExternalFilter: PropTypes.func,
  className: PropTypes.string,
  expandRow: PropTypes.object
};

export default Header;
