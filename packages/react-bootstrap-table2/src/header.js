/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import HeaderCell from './header-cell';
import SelectionHeaderCell from './row-selection/selection-header-cell';
import ExpandHeaderCell from './row-expand/expand-header-cell';
import withHeaderSelection from './row-selection/selection-header-cell-consumer';
import bindExpansion from './row-expand/expand-header-cell-binder';

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
    expandRow,
    bootstrap4
  } = props;

  let SelectionHeaderCellComp = () => null;
  let ExpansionHeaderCellComp = () => null;

  if (expandRow.showExpandColumn) {
    ExpansionHeaderCellComp = bindExpansion(ExpandHeaderCell);
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
                  bootstrap4={ bootstrap4 }
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
  expandRow: PropTypes.object,
  bootstrap4: PropTypes.bool
};

export default Header;
