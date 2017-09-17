/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import Row from './row';
import RowSection from './row-section';

const Body = (props) => {
  const {
    columns,
    data,
    keyField,
    isEmpty,
    noDataIndication,
    visibleColumnSize,
    cellEdit
  } = props;

  let content;

  if (isEmpty) {
    const indication = _.isFunction(noDataIndication) ? noDataIndication() : noDataIndication;
    content = <RowSection content={ indication } colSpan={ visibleColumnSize } />;
  } else {
    content = data.map((row, index) => {
      const key = _.get(row, keyField);
      const editable = !(cellEdit && cellEdit.nonEditableRows.indexOf(key) > -1);
      return (
        <Row
          key={ key }
          row={ row }
          keyField={ keyField }
          rowIndex={ index }
          columns={ columns }
          cellEdit={ cellEdit }
          editable={ editable }
        />
      );
    });
  }

  return (
    <tbody>{ content }</tbody>
  );
};

Body.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
};

export default Body;
