/* eslint react/require-default-props: 0 */
import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import Const from './const';
import SortSymbol from './sort-symbol';
import SortCaret from './sort-caret';
import _ from './utils';


const HeaderCell = (props) => {
  const {
    column,
    index,
    onSort,
    sorting,
    sortOrder
  } = props;
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
  let sortSymbol;

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

  if (sortOrder !== Const.SORT_UNSORTABLE) {
    const customClick = cellAttrs.onClick;
    cellAttrs.onClick = (e) => {
      onSort(column);
      if (_.isFunction(customClick)) customClick(e);
    };
    cellAttrs.className = cs(cellAttrs.className, 'sortable');

    if (sortOrder === Const.SORT_UNSET) {
      sortSymbol = <SortSymbol />;
    } else {
      sortSymbol = <SortCaret order={ sortOrder } sorting={sorting} />;
    }
  }

  return (
    <th { ...cellAttrs }>
      { children }{ sortSymbol }
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
    align: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    sort: PropTypes.bool,
    sortFunc: PropTypes.func,
    editable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    validator: PropTypes.func
  }).isRequired,
  index: PropTypes.number.isRequired,
  onSort: PropTypes.func,
  sorting: PropTypes.bool,
  sortOrder: PropTypes.oneOf([
    Const.SORT_UNSET, Const.SORT_ASC, Const.SORT_DESC, Const.SORT_UNSORTABLE
  ])
};

export default HeaderCell;
