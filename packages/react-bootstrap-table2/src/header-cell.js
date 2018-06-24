/* eslint react/require-default-props: 0 */
import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

import Const from './const';
import SortSymbol from './sort/symbol';
import SortCaret from './sort/caret';
import _ from './utils';


const HeaderCell = (props) => {
  const {
    column,
    index,
    onSort,
    sorting,
    sortOrder,
    isLastSorting,
    onFilter,
    onExternalFilter
  } = props;

  const {
    text,
    sort,
    filter,
    filterRenderer,
    headerTitle,
    headerAlign,
    headerFormatter,
    headerEvents,
    headerClasses,
    headerStyle,
    headerAttrs,
    headerSortingClasses,
    headerSortingStyle
  } = column;

  const cellAttrs = {
    ..._.isFunction(headerAttrs) ? headerAttrs(column, index) : headerAttrs,
    ...headerEvents
  };

  let sortSymbol;
  let filterElm;
  let cellStyle = {};
  let cellClasses = _.isFunction(headerClasses) ? headerClasses(column, index) : headerClasses;

  if (headerStyle) {
    cellStyle = _.isFunction(headerStyle) ? headerStyle(column, index) : headerStyle;
  }

  if (headerTitle) {
    cellAttrs.title = _.isFunction(headerTitle) ? headerTitle(column, index) : text;
  }

  if (headerAlign) {
    cellStyle.textAlign = _.isFunction(headerAlign) ? headerAlign(column, index) : headerAlign;
  }

  if (sort) {
    const customClick = cellAttrs.onClick;
    cellAttrs.onClick = (e) => {
      onSort(column);
      if (_.isFunction(customClick)) customClick(e);
    };
    cellAttrs.className = cs(cellAttrs.className, 'sortable');

    if (sorting) {
      sortSymbol = <SortCaret order={ sortOrder } />;

      // append customized classes or style if table was sorting based on the current column.
      cellClasses = cs(
        cellClasses,
        _.isFunction(headerSortingClasses)
          ? headerSortingClasses(column, sortOrder, isLastSorting, index)
          : headerSortingClasses
      );

      cellStyle = {
        ...cellStyle,
        ..._.isFunction(headerSortingStyle)
          ? headerSortingStyle(column, sortOrder, isLastSorting, index)
          : headerSortingStyle
      };
    } else {
      sortSymbol = <SortSymbol />;
    }
  }

  if (cellClasses) cellAttrs.className = cs(cellAttrs.className, cellClasses);
  if (!_.isEmptyObject(cellStyle)) cellAttrs.style = cellStyle;

  if (filterRenderer) {
    const onCustomFilter = onExternalFilter(column, filter.props.type);
    filterElm = filterRenderer(onCustomFilter, column);
  } else if (filter) {
    filterElm = <filter.Filter { ...filter.props } onFilter={ onFilter } column={ column } />;
  }

  const children = headerFormatter ?
    headerFormatter(column, index, { sortElement: sortSymbol, filterElement: filterElm }) :
    text;

  if (headerFormatter) {
    return React.createElement('th', cellAttrs, children);
  }

  return React.createElement('th', cellAttrs, children, sortSymbol, filterElm);
};

HeaderCell.propTypes = {
  column: PropTypes.shape({
    dataField: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    headerFormatter: PropTypes.func,
    formatter: PropTypes.func,
    formatExtraData: PropTypes.any,
    headerClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    classes: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    headerTitle: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    title: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    headerEvents: PropTypes.object,
    events: PropTypes.object,
    headerAlign: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    align: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    headerAttrs: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    attrs: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    sort: PropTypes.bool,
    sortFunc: PropTypes.func,
    onSort: PropTypes.func,
    editor: PropTypes.object,
    editable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    editCellStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    editCellClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    editorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    editorClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    editorRenderer: PropTypes.func,
    validator: PropTypes.func,
    filter: PropTypes.object,
    filterRenderer: PropTypes.func,
    filterValue: PropTypes.func
  }).isRequired,
  index: PropTypes.number.isRequired,
  onSort: PropTypes.func,
  sorting: PropTypes.bool,
  sortOrder: PropTypes.oneOf([Const.SORT_ASC, Const.SORT_DESC]),
  isLastSorting: PropTypes.bool,
  onFilter: PropTypes.func,
  onExternalFilter: PropTypes.func
};

export default HeaderCell;
