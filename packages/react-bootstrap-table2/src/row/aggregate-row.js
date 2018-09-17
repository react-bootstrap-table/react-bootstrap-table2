/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import _ from '../utils';
import ExpandCell from '../row-expand/expand-cell';
import SelectionCell from '../row-selection/selection-cell';
import shouldUpdater from './should-updater';
import eventDelegater from './event-delegater';
import RowPureContent from './row-pure-content';

export default class RowAggregator extends shouldUpdater(eventDelegater(React.Component)) {
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
        <RowPureContent
          row={ row }
          columns={ columns }
          keyField={ keyField }
          rowIndex={ rowIndex }
          shouldUpdate={ this.shouldUpdateRowContent }
          { ...rest }
        />
      </tr>
    );
  }
}
