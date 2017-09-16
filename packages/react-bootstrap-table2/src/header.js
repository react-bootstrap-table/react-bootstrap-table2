/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import HeaderCell from './header-cell';


const Header = (props) => {
  const {
    columns,
    onSort,
    sortField,
    sortOrder
  } = props;
  return (
    <thead>
      <tr>
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
  sortOrder: PropTypes.string
};

export default Header;
