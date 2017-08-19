import React from 'react';
import PropTypes from 'prop-types';


const Body = ({ columns, data, keyField }) => (
  <tbody>
    {
      data.map(row => (
        <tr key={ row[keyField] }>
          {
            columns.map(column =>
              <td key={ row[column.dataField] }>{ row[column.dataField] }</td>
            )
          }
        </tr>)
      )
    }
  </tbody>
);

Body.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default Body;
