import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import Row from './row';

const Body = ({ columns, data, keyField }) => (
  <tbody>
    {
      data.map((row, index) => (
        <Row
          key={ _.get(row, keyField) }
          row={ row }
          rowIndex={ index }
          columns={ columns }
        />
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
