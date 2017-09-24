/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import HeaderCell from './header-cell';
import HeaderCellSelectColumn from './row-selection/header-cell-select-column';

const Header = (props) => {
  const {
    data,
    columns,
    onSort,
    sortField,
    sortOrder,
    selectRowProps,
    selectedRowKeys,
    handleSelectAllRows
  } = props;
  return (
    <thead>
      <tr>
        {<HeaderCellSelectColumn
          data={data}
          selectRowProps={selectRowProps}
          selectedRowKeys={selectedRowKeys}
          handleSelectAllRows={handleSelectAllRows}
        />}
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
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  sortField: PropTypes.string,
  sortOrder: PropTypes.string,
  selectRowProps: PropTypes.object,
  selectedRowKeys: PropTypes.array,
  handleSelectAllRows: PropTypes.func
};

export default Header;
