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
    visibleColumnSize
  } = props;

  let content;

  if (isEmpty) {
    const indication = _.isFunction(noDataIndication) ? noDataIndication() : noDataIndication;
    content = <RowSection content={ indication } colSpan={ visibleColumnSize } />;
  } else {
    content = data.map((row, index) => (
      <Row
        key={ _.get(row, keyField) }
        row={ row }
        rowIndex={ index }
        columns={ columns }
      />
    ));
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
