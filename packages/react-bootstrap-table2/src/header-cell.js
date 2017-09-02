import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';


const HeaderCell = ({ column, index }) => {
  const {
    text,
    hidden,
    headerTitle,
    headerAlign,
    headerFormatter,
    headerEvents,
    headerClasses
  } = column;
  const attrs = {
    ...headerEvents
  };
  const headerStyle = {};
  const children = headerFormatter ? headerFormatter(column, index) : text;
  const cellClasses = _.isFunction(headerClasses) ? headerClasses(column, index) : headerClasses;

  if (headerTitle) {
    attrs.title = _.isFunction(headerTitle) ? headerTitle(column, index) : text;
  }

  if (headerAlign) {
    headerStyle.textAlign = _.isFunction(headerAlign) ? headerAlign(column, index) : headerAlign;
  }

  attrs.style = headerStyle;
  attrs.className = cellClasses;

  if (hidden) {
    attrs.style.display = 'none';
  }

  return (
    <th { ...attrs }>
      { children }
    </th>
  );
};

HeaderCell.propTypes = {
  column: PropTypes.shape({
    dataField: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    headerFormatter: PropTypes.func,
    formatter: PropTypes.func,
    formatExtraData: PropTypes.any,
    classes: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    headerTitle: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    title: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    headerEvents: PropTypes.object,
    events: PropTypes.object,
    headerAlign: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    align: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  }).isRequired,
  index: PropTypes.number.isRequired
};

export default HeaderCell;
