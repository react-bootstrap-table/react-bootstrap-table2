import React from 'react';
import PropTypes from 'prop-types';

import HeaderCell from './header-cell';


const Header = ({ columns }) => (
  <thead>
    <tr>
      { columns.map(column => <HeaderCell key={ column.dataField } column={ column } />) }
    </tr>
  </thead>
);

Header.propTypes = {
  columns: PropTypes.array.isRequired
};

export default Header;
