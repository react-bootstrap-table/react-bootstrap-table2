import React from 'react';
import PropTypes from 'prop-types';

import Row from './row';

const Body = ({ columns, data, keyField }) => (
  <tbody>
    {
      data.map(row => (
        <Row key={ row[keyField] } row={ row } columns={ columns } />
      ))
    }
  </tbody>
);

Body.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default Body;
