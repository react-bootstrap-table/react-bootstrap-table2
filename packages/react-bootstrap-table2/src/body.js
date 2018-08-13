/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import _ from './utils';
import Row from './row';
import ExpandRow from './row-expand/expand-row';
import RowSection from './row-section';
import Const from './const';

const Body = (props) => {
  const {
    columns,
    data,
    keyField,
    isEmpty,
    noDataIndication,
    visibleColumnSize,
    cellEdit,
    selectRow,
    selectedRowKeys,
    rowStyle,
    rowClasses,
    rowEvents,
    expandRow
  } = props;

  const {
    bgColor,
    nonSelectable
  } = selectRow;

  let content;

  if (isEmpty) {
    const indication = _.isFunction(noDataIndication) ? noDataIndication() : noDataIndication;
    if (!indication) {
      return null;
    }
    content = <RowSection content={ indication } colSpan={ visibleColumnSize } />;
  } else {
    const nonEditableRows = cellEdit.nonEditableRows || [];
    content = data.map((row, index) => {
      const key = _.get(row, keyField);
      const editable = !(nonEditableRows.length > 0 && nonEditableRows.indexOf(key) > -1);

      const selected = selectRow.mode !== Const.ROW_SELECT_DISABLED
        ? selectedRowKeys.includes(key)
        : null;

      const attrs = rowEvents || {};
      let style = _.isFunction(rowStyle) ? rowStyle(row, index) : rowStyle;
      let classes = (_.isFunction(rowClasses) ? rowClasses(row, index) : rowClasses);
      if (selected) {
        const selectedStyle = _.isFunction(selectRow.style)
          ? selectRow.style(row, index)
          : selectRow.style;

        const selectedClasses = _.isFunction(selectRow.classes)
          ? selectRow.classes(row, index)
          : selectRow.classes;

        style = {
          ...style,
          ...selectedStyle
        };
        classes = cs(classes, selectedClasses);

        if (bgColor) {
          style = style || {};
          style.backgroundColor = _.isFunction(bgColor) ? bgColor(row, index) : bgColor;
        }
      }

      const selectable = !nonSelectable || !nonSelectable.includes(key);
      const expandable = expandRow && !expandRow.nonExpandable.includes(key);
      const expanded = expandRow && expandRow.expanded.includes(key);

      const result = [
        <Row
          key={ key }
          row={ row }
          keyField={ keyField }
          rowIndex={ index }
          columns={ columns }
          cellEdit={ cellEdit }
          editable={ editable }
          selectable={ selectable }
          expandable={ expandable }
          selected={ selected }
          expanded={ expanded }
          selectRow={ selectRow }
          expandRow={ expandRow }
          style={ style }
          className={ classes }
          attrs={ attrs }
        />
      ];

      if (expanded) {
        result.push((
          <ExpandRow
            key={ `${key}-expanding` }
            colSpan={ visibleColumnSize }
          >
            { expandRow.renderer(row) }
          </ExpandRow>
        ));
      }

      return result;
    });
  }

  return (
    <tbody>{ content }</tbody>
  );
};

Body.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  selectRow: PropTypes.object,
  selectedRowKeys: PropTypes.array
};

export default Body;
