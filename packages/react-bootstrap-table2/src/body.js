/* eslint react/prop-types: 0 */
/* eslint react/require-default-props: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import _ from './utils';
import SimpleRow from './row/simple-row';
import RowAggregator from './row/aggregate-row';
import RowSection from './row/row-section';
import Const from './const';
import withRowSelection from './row-selection/row-consumer';
import withRowExpansion from './row-expand/row-consumer';

class Body extends React.Component {
  constructor(props) {
    super(props);
    const {
      keyField,
      cellEdit,
      selectRow,
      expandRow
    } = props;

    // Construct Editing Cell Component
    if (cellEdit.createContext) {
      this.EditingCell = cellEdit.createEditingCell(_, cellEdit.options.onStartEdit);
    }

    // Construct Row Component
    let RowComponent = SimpleRow;
    const selectRowEnabled = selectRow.mode !== Const.ROW_SELECT_DISABLED;
    const expandRowEnabled = !!expandRow.renderer;

    if (expandRowEnabled) {
      RowComponent = withRowExpansion(RowAggregator);
    }

    if (selectRowEnabled) {
      RowComponent = withRowSelection(expandRowEnabled ? RowComponent : RowAggregator);
    }

    if (cellEdit.createContext) {
      RowComponent = cellEdit.withRowLevelCellEdit(RowComponent, selectRowEnabled, keyField, _);
    }
    this.RowComponent = RowComponent;
  }

  render() {
    const {
      columns,
      data,
      tabIndexCell,
      keyField,
      isEmpty,
      noDataIndication,
      visibleColumnSize,
      cellEdit,
      selectRow,
      rowStyle,
      rowClasses,
      rowEvents,
      expandRow,
      className
    } = this.props;

    let content;

    if (isEmpty) {
      const indication = _.isFunction(noDataIndication) ? noDataIndication() : noDataIndication;
      if (!indication) {
        return null;
      }
      content = <RowSection content={ indication } colSpan={ visibleColumnSize } />;
    } else {
      const selectRowEnabled = selectRow.mode !== Const.ROW_SELECT_DISABLED;
      const expandRowEnabled = !!expandRow.renderer;

      const additionalRowProps = {};

      if (cellEdit.createContext) {
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
          tabIndexCell,
          columns,
          keyField,
          cellEdit,
          value: key,
          rowIndex: index,
          visibleColumnSize,
          attrs: rowEvents || {},
          ...additionalRowProps
        };

        baseRowProps.style = _.isFunction(rowStyle) ? rowStyle(row, index) : rowStyle;
        baseRowProps.className = (_.isFunction(rowClasses) ? rowClasses(row, index) : rowClasses);

        return <this.RowComponent { ...baseRowProps } />;
      });
    }

    return (
      <tbody className={ className }>{ content }</tbody>
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
