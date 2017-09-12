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
    headerClasses,
    headerStyle,
    headerAttrs
  } = column;

  const cellAttrs = {
    ..._.isFunction(headerAttrs) ? headerAttrs(column, index) : headerAttrs,
    ...headerEvents
  };
  const children = headerFormatter ? headerFormatter(column, index) : text;
  const cellClasses = _.isFunction(headerClasses) ? headerClasses(column, index) : headerClasses;

  let cellStyle = {};

  if (headerStyle) {
    cellStyle = _.isFunction(headerStyle) ? headerStyle(column, index) : headerStyle;
  }

  if (headerTitle) {
    cellAttrs.title = _.isFunction(headerTitle) ? headerTitle(column, index) : text;
  }

  if (headerAlign) {
    cellStyle.textAlign = _.isFunction(headerAlign) ? headerAlign(column, index) : headerAlign;
  }

  if (hidden) {
    cellStyle.display = 'none';
  }

  if (cellClasses) cellAttrs.className = cellClasses;

  if (!_.isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;

  return (
    <th { ...cellAttrs }>
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
