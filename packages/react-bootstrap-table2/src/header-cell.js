import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';


const HeaderCell = ({ column, index }) => {
  const { headerTitle, text, headerAlign } = column;
  const attrs = {};
  const headerStyle = {};

  if (headerTitle) {
    attrs.title = _.isFunction(headerTitle) ? headerTitle(column, index) : text;
  }

  if (headerAlign) {
    headerStyle.textAlign = _.isFunction(headerAlign) ? headerAlign(column, index) : headerAlign;
  }

  attrs.style = headerStyle;

  return (
    <th { ...attrs }>
      { column.text }
    </th>
  );
};

HeaderCell.propTypes = {
  column: PropTypes.shape({
    dataField: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    formatter: PropTypes.func,
    formatExtraData: PropTypes.any,
    classes: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    headerTitle: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    title: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    events: PropTypes.object,
    headerAlign: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    align: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  }).isRequired,
  index: PropTypes.number.isRequired
};

export default HeaderCell;
