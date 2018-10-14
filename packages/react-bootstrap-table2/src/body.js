/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import Row from './row/simple-row';
import RowAggregator from './row/aggregate-row';
import RowSection from './row/row-section';
import Const from './const';
import withRowSelection from './row-selection/row-consumer';
import withRowExpansion from './row-expand/row-consumer';

class Body extends React.Component {
  constructor(props) {
    super(props);
    if (props.cellEdit.createContext) {
      this.EditingCell = props.cellEdit.createEditingCell(_, props.cellEdit.options.onStartEdit);
    }
  }

  render() {
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
    } = this.props;

    let content;

    if (isEmpty) {
      const indication = _.isFunction(noDataIndication) ? noDataIndication() : noDataIndication;
      if (!indication) {
        return null;
      }
      content = <RowSection content={ indication } colSpan={ visibleColumnSize } />;
    } else {
      let RowComponent = Row;
      const selectRowEnabled = selectRow.mode !== Const.ROW_SELECT_DISABLED;
      const expandRowEnabled = !!expandRow.renderer;

      const additionalRowProps = {};
      if (expandRowEnabled) {
        RowComponent = withRowExpansion(RowAggregator, visibleColumnSize);
      }

      if (selectRowEnabled) {
        RowComponent = withRowSelection(expandRowEnabled ? RowComponent : RowAggregator);
      }

      if (cellEdit.createContext) {
        RowComponent = cellEdit.withRowLevelCellEdit(RowComponent, selectRowEnabled, keyField, _);
        additionalRowProps.EditingCellComponent = this.EditingCell;
      }

      if (selectRowEnabled || expandRowEnabled) {
        additionalRowProps.expandRow = expandRow;
        additionalRowProps.selectRow = selectRow;
      }

      content = data.map((row, index) => {
        const key = _.get(row, keyField);
        const baseRowProps = {
          key,
          row,
          columns,
          keyField,
          cellEdit,
          value: key,
          rowIndex: index,
          attrs: rowEvents || {},
          ...additionalRowProps
        };

        baseRowProps.style = _.isFunction(rowStyle) ? rowStyle(row, index) : rowStyle;
        baseRowProps.className = (_.isFunction(rowClasses) ? rowClasses(row, index) : rowClasses);

        return <RowComponent { ...baseRowProps } />;
      });
    }

    return (
      <tbody>{ content }</tbody>
    );
  }
}

Body.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  selectRow: PropTypes.object
};

export default Body;
