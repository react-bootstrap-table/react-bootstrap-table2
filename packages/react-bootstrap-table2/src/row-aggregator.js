/* eslint react/prop-types: 0 */
/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import _ from './utils';
import Row from './row';
import ExpandCell from './row-expand/expand-cell';
import SelectionCell from './row-selection/selection-cell';

export default class RowAggregator extends React.Component {
  static propTypes = {
    attrs: PropTypes.object
  }
  static defaultProps = {
    attrs: {}
  }

  constructor(props) {
    super(props);
    this.clickNum = 0;
    this.createClickEventHandler = this.createClickEventHandler.bind(this);
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
        cellEdit: {
          mode,
          DBCLICK_TO_CELL_EDIT,
          DELAY_FOR_DBCLICK
        }
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

      if (mode === DBCLICK_TO_CELL_EDIT && selectRow.clickToEdit) {
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
      cellEdit,
      selectRow,
      expandRow,
      expanded,
      selected,
      selectable
    } = this.props;

    const key = _.get(row, keyField);
    const { hideSelectColumn, clickToSelect } = selectRow;
    const { showExpandColumn } = expandRow;

    const nonEditableRows = cellEdit.nonEditableRows || [];
    const editable = !(nonEditableRows.length > 0 && nonEditableRows.indexOf(key) > -1);

    const newAttrs = { ...attrs };
    if (clickToSelect || !!expandRow.renderer) {
      newAttrs.onClick = this.createClickEventHandler(attrs.onClick);
    }

    return (
      <Row
        key={ key }
        row={ row }
        keyField={ keyField }
        rowIndex={ rowIndex }
        columns={ columns }
        cellEdit={ cellEdit }
        editable={ editable }
        style={ style }
        className={ className }
        attrs={ newAttrs }
      >
        {
          showExpandColumn ? (
            <ExpandCell
              { ...expandRow }
              rowKey={ key }
              rowIndex={ rowIndex }
              expanded={ expanded }
            />
          ) : null
        }
        {
          !hideSelectColumn
            ? (
              <SelectionCell
                { ...selectRow }
                rowKey={ key }
                rowIndex={ rowIndex }
                selected={ selected }
                disabled={ !selectable }
              />
            )
            : null
        }
      </Row>
    );
  }
}
