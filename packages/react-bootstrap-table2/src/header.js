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
    sortField,
    sortOrder,
    selectRow
  } = props;

  return (
    <thead>
      <tr>
        {
          selectRow.mode === ROW_SELECT_DISABLED ? null : <SelectionHeaderCell {...selectRow} />
        }
        {
          columns.map((column, i) => {
            const currSort = column.dataField === sortField;
            return (
              <HeaderCell
                index={ i }
                key={ column.dataField }
                column={ column }
                onSort={ onSort }
                sorting={ currSort }
                sortOrder={ sortOrder }
              />);
          })
        }
      </tr>
    </thead>
  );
};

Header.propTypes = {
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  sortField: PropTypes.string,
  sortOrder: PropTypes.string,
  selectRow: PropTypes.object
};

export default Header;
