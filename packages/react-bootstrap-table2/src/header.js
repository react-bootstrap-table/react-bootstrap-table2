/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Const from './const';

import HeaderCell from './header-cell';
import SelectionHeaderCell from './row-selection/selection-header-cell';
import ExpandHeaderCell from './row-expand/expand-header-cell';
import bindSelection from './row-selection/selection-header-cell-binder';

const Header = (props) => {
  const { ROW_SELECT_DISABLED } = Const;

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

  let SelectionHeaderCellComp = () => {};

  if (selectRow) {
    SelectionHeaderCellComp = bindSelection(SelectionHeaderCell);
  }

  return (
    <thead>
      <tr className={ className }>
        {
          (expandRow && expandRow.showExpandColumn)
            ? <ExpandHeaderCell
              onAllRowExpand={ expandRow.onAllRowExpand }
              anyExpands={ expandRow.isAnyExpands }
              renderer={ expandRow.expandHeaderColumnRenderer }
            /> : null
        }
        {
          (selectRow.mode !== ROW_SELECT_DISABLED && !selectRow.hideSelectColumn) ?
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
