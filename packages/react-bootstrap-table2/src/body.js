/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import Row from './row';
import RowAggregator from './row-aggregator';
import RowSection from './row-section';
import Const from './const';
import bindSelection from './row-selection/row-binder';
import bindExpansion from './row-expand/row-binder';

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
    rowStyle,
    rowClasses,
    rowEvents,
    expandRow
  } = props;

  let content;

  if (isEmpty) {
    const indication = _.isFunction(noDataIndication) ? noDataIndication() : noDataIndication;
    if (!indication) {
      return null;
    }
    content = <RowSection content={ indication } colSpan={ visibleColumnSize } />;
  } else {
    let RowComponent = Row;
    const nonEditableRows = cellEdit.nonEditableRows || [];
    const selectRowEnabled = selectRow.mode !== Const.ROW_SELECT_DISABLED;
    const expandRowEnabled = !!expandRow.renderer;

    if (expandRowEnabled) {
      RowComponent = bindExpansion(RowAggregator, visibleColumnSize);
    }
    if (selectRowEnabled) {
      RowComponent = bindSelection(expandRowEnabled ? RowComponent : RowAggregator);
    }

    content = data.map((row, index) => {
      const key = _.get(row, keyField);
      const editable = !(nonEditableRows.length > 0 && nonEditableRows.indexOf(key) > -1);

      const attrs = rowEvents || {};
      const style = _.isFunction(rowStyle) ? rowStyle(row, index) : rowStyle;
      const classes = (_.isFunction(rowClasses) ? rowClasses(row, index) : rowClasses);

      // refine later
      const result =
        selectRowEnabled || expandRowEnabled ?
          (<RowComponent
            key={ key }
            row={ row }
            keyField={ keyField }
            rowIndex={ index }
            columns={ columns }
            style={ style }
            className={ classes }
            attrs={ attrs }
            cellEdit={ cellEdit }
            selectRow={ selectRow }
            expandRow={ expandRow }
          />) :
          (<RowComponent
            key={ key }
            row={ row }
            keyField={ keyField }
            rowIndex={ index }
            columns={ columns }
            cellEdit={ cellEdit }
            editable={ editable }
            style={ style }
            className={ classes }
            attrs={ attrs }
          />);

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
  selectRow: PropTypes.object
};

export default Body;
