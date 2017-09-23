import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Constant from '../const';

const CheckBox = ({ checked, indeterminate, onCheckBoxSelect }) => (
  <input
    type="checkbox"
    checked={checked}
    onClick={onCheckBoxSelect}
    ref={(input) => {
      if (input) input.indeterminate = indeterminate; // eslint-disable-line no-param-reassign
    }}
  />
);

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool.isRequired,
  onCheckBoxSelect: PropTypes.func.isRequired
};

export default class HeaderCellSelectColumn extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    selectedRowKeys: PropTypes.array.isRequired,
    selectRowProps: PropTypes.object,
    handleSelectAllRows: PropTypes.func.isRequired
  }

  static defaultProps = {
    selectRowProps: null
  }

  constructor() {
    super();
    this.onCheckBoxSelect = this.onCheckBoxSelect.bind(this);
    this.mapSelectedCountToStatus = this.mapSelectedCountToStatus.bind(this);
  }

  /**
   * avoid updating if button is
   * 1. radio
   * 2. status was not changed.
   */
  shouldComponentUpdate(nextProps) {
    const {
      selectRowProps,
      selectedRowKeys
    } = this.props;

    if (!selectRowProps) return false;

    const { mode } = selectRowProps;

    if (mode === Constant.ROW_SELECT_SINGLE) return false;

    const currSelectCount = this.mapSelectedCountToStatus(selectedRowKeys.length);
    const nextSelectCount = this.mapSelectedCountToStatus(nextProps.selectedRowKeys.length);

    return currSelectCount !== nextSelectCount;
  }

  onCheckBoxSelect(event) {
    const { selectedRowKeys, handleSelectAllRows } = this.props;

    const selected = selectedRowKeys.length !== 0;

    handleSelectAllRows(event, selected);
  }

  /**
   * map selected count to button status
   * @param {Number} selectCount - selected count of rows.
   * 
   * @return {String} CHECKBOX_STATUS_CHECK - when full selected
   * @return {String} CHECKBOX_STATUS_UNCHECKED - when nothing was selected
   * @return {String} CHECKBOX_STATUS_INDETERMINATE - other situation except above.
   *  
   */
  mapSelectedCountToStatus(selectCount) {
    const { data } = this.props;

    let buttonStatus;

    switch (selectCount) {
      case data.length:
        buttonStatus = Constant.CHECKBOX_STATUS_CHECK;
        break;
      case 0:
        buttonStatus = Constant.CHECKBOX_STATUS_UNCHECKED;
        break;
      default:
        buttonStatus = Constant.CHECKBOX_STATUS_INDETERMINATE;
    }
    return buttonStatus;
  }

  render() {
    const {
      data,
      selectRowProps,
      selectedRowKeys
    } = this.props;

    if (!selectRowProps) return null;

    const {
      mode
    } = selectRowProps;

    const checked = selectedRowKeys.length === data.length;

    const indeterminate = selectedRowKeys.length > 0 && selectedRowKeys.length < data.length;

    return (
      <th data-th-row-selection>
        {
          mode === Constant.ROW_SELECT_SINGLE
            ? null
            : (
              <CheckBox
                {...this.props}
                checked={checked}
                indeterminate={indeterminate}
                onCheckBoxSelect={this.onCheckBoxSelect}
              />
            )
        }
      </th>
    );
  }
}
