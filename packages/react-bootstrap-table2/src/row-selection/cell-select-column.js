/* eslint react/require-default-props: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constant from '../const';


export default class CellSelectColumn extends Component {
  static propTypes = {
    row: PropTypes.object,
    keyField: PropTypes.string,
    selectRowProps: PropTypes.object,
    selectedRowKeys: PropTypes.array,
    handleSelectRow: PropTypes.func
  }

  static defaultProps = {
    selectRowProps: null
  }

  constructor() {
    super();
    this.onRowClicked = this.onRowClicked.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    // render element if check status was changing.
    const {
      row,
      keyField,
      selectedRowKeys
    } = this.props;

    const rowKey = row[keyField];

    const checked = selectedRowKeys.includes(rowKey);
    const nextStatus = nextProps.selectedRowKeys.includes(rowKey);

    // return true if status was changing
    return checked !== nextStatus;
  }

  onRowClicked() {
    const {
      row,
      keyField,
      selectRowProps,
      handleSelectRow,
      selectedRowKeys
    } = this.props;

    const {
      mode
    } = selectRowProps;

    const inputType = mode === Constant.ROW_SELECT_SINGLE ? 'radio' : 'checkbox';

    const rowKey = row[keyField];

    const checked = selectedRowKeys.includes(rowKey);

    const nextStatus = mode === Constant.ROW_SELECT_SINGLE
      ? true
      : !checked;

    handleSelectRow(rowKey, inputType, nextStatus);
  }

  render() {
    const {
      row,
      keyField,
      selectRowProps,
      selectedRowKeys
    } = this.props;

    if (!selectRowProps) return null;

    const {
      mode
    } = selectRowProps;

    const inputType = mode === Constant.ROW_SELECT_SINGLE ? 'radio' : 'checkbox';

    const rowKey = row[keyField];

    const checked = selectedRowKeys.includes(rowKey);

    return (
      <td>
        <input
          type={inputType}
          checked={checked}
          onClick={this.onRowClicked}
        />
      </td>
    );
  }
}
