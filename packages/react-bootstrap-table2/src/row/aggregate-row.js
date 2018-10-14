/* eslint react/prop-types: 0 */
/* eslint no-plusplus: 0 */
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
      this.shouldUpdatedBySelfProps(nextProps)
    ) {
      this.shouldUpdateRowContent = this.shouldUpdateChild(nextProps);
      return true;
    }
    this.shouldUpdateRowContent = this.shouldUpdateChild(nextProps);

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
      visibleColumnSize,
      tabIndexCell,
      ...rest
    } = this.props;
    const key = _.get(row, keyField);
    const { hideSelectColumn, clickToSelect } = selectRow;
    const { showExpandColumn } = expandRow;

    const newAttrs = this.delegate({ ...attrs });
    if (clickToSelect || !!expandRow.renderer) {
      newAttrs.onClick = this.createClickEventHandler(newAttrs.onClick);
    }

    let tabIndexStart = (rowIndex * visibleColumnSize) + 1;

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
              tabIndex={ tabIndexCell ? tabIndexStart++ : -1 }
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
                tabIndex={ tabIndexCell ? tabIndexStart++ : -1 }
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
          tabIndexStart={ tabIndexCell ? tabIndexStart : -1 }
          { ...rest }
        />
      </tr>
    );
  }
}
