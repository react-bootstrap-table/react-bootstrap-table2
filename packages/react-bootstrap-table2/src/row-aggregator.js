/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import _ from './utils';
import RowContent from './row-pure-content';
// import RowAggregatorContent from './row-aggregator-content';
import shouldRowUpdater from './row-should-updater';
import ExpandCell from './row-expand/expand-cell';
import SelectionCell from './row-selection/selection-cell';
// import Cell from './cell';
import eventDelegater from './row-event-delegater';

export default class RowAggregator extends shouldRowUpdater(eventDelegater(React.Component)) {
  static propTypes = {
    attrs: PropTypes.object,
    style: PropTypes.object
  }
  static defaultProps = {
    attrs: {},
    style: {}
  }

  constructor(props) {
    super(props);
    this.clickNum = 0;
    this.shouldUpdateRowContent = false;
    this.createClickEventHandler = this.createClickEventHandler.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.selected !== nextProps.selected ||
      this.props.expanded !== nextProps.expanded ||
      this.props.selectable !== nextProps.selectable ||
      this.shouldUpdateByWhenEditing(nextProps) ||
      this.shouldUpdatedBySelfProps(nextProps)
    ) {
      this.shouldUpdateRowContent = this.shouldUpdatedByNormalProps(nextProps);
      return true;
    }
    this.shouldUpdateRowContent = this.shouldUpdatedByNormalProps(nextProps);

    return this.shouldUpdateRowContent;
  }

  createClickEventHandler(cb) {
    return (e) => {
      const {
        row,
        selected,
        keyField,
        selectable,
        expandable,
        rowIndex,
        expanded,
        expandRow,
        selectRow,
        DELAY_FOR_DBCLICK
      } = this.props;

      const clickFn = () => {
        if (cb) {
          cb(e, row, rowIndex);
        }
        const key = _.get(row, keyField);
        if (expandRow && expandable) {
          expandRow.onRowExpand(key, !expanded, rowIndex, e);
        }
        if (selectRow.clickToSelect && selectable) {
          selectRow.onRowSelect(key, !selected, rowIndex, e);
        }
      };

      if (DELAY_FOR_DBCLICK) {
        this.clickNum += 1;
        _.debounce(() => {
          if (this.clickNum === 1) {
            clickFn();
          }
          this.clickNum = 0;
        }, DELAY_FOR_DBCLICK)();
      } else {
        clickFn();
      }
    };
  }

  render() {
    const {
      row,
      columns,
      keyField,
      rowIndex,
      style,
      className,
      attrs,
      selectRow,
      expandRow,
      expanded,
      selected,
      selectable,
      ...rest
    } = this.props;
    const key = _.get(row, keyField);
    const { hideSelectColumn, clickToSelect } = selectRow;
    const { showExpandColumn } = expandRow;

    const newAttrs = this.delegate({ ...attrs });
    if (clickToSelect || !!expandRow.renderer) {
      newAttrs.onClick = this.createClickEventHandler(newAttrs.onClick);
    }

    return (
      <tr
        style={ style }
        className={ className }
        { ...newAttrs }
      >
        <td>123</td>
        <td>12121212</td>
      </tr>
    );
    // const content0 = _.get(row, columns[1].dataField);
    // const content1 = _.get(row, columns[1].dataField);
    // const content2 = _.get(row, columns[2].dataField);
    // return (
    //   <tr
    //     style={ style }
    //     className={ className }
    //     onClick={ e => selectRow.onRowSelect(key, !selected, rowIndex, e) }
    //   >
    //     <td>1</td>
    //     <td>2</td>
    //     <td>3</td>
    //     <td>4</td>
    //   </tr>
    // );

    // const newCols = [{ fake: true }, ...columns];

    // return (
    //   <tr
    //     style={ style }
    //     className={ className }
    //     { ...newAttrs }
    //   >
    //     {
    //       newCols.map((column, i) => {
    //         if (column.fake) {
    //           return (
    //             <Cell
    //               key={ `${key}_${i}_sel}` }
    //               column={ {} }
    //               row={ {} }
    //               rowIndex={ rowIndex }
    //               columnIndex={ i }
    //             >
    //               <input type="checkbox" />
    //             </Cell>
    //           );
    //         }
    //         const content = _.get(row, column.dataField);
    //         return (
    //           <Cell
    //             key={ `${key}_${content}}` }
    //             row={ row }
    //             rowIndex={ rowIndex }
    //             column={ column }
    //             columnIndex={ i }
    //           />
    //         );
    //       })
    //     }
    //   </tr>
    // );
  }
}
