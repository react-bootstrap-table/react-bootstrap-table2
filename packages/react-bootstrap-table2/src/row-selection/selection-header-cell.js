/* eslint react/require-default-props: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from '../const';

export const CheckBox = ({ checked, indeterminate }) => (
  <input
    type="checkbox"
    checked={checked}
    ref={(input) => {
      if (input) input.indeterminate = indeterminate; // eslint-disable-line no-param-reassign
    }}
  />
);

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool.isRequired
};

export default class SelectionHeaderCell extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    checkedStatus: PropTypes.string,
    onAllRowsSelect: PropTypes.func
  }

  constructor() {
    super();
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
  }

  /**
   * avoid updating if button is
   * 1. radio
   * 2. status was not changed.
   */
  shouldComponentUpdate(nextProps) {
    const { ROW_SELECT_SINGLE } = Const;
    const { mode, checkedStatus } = this.props;

    if (mode === ROW_SELECT_SINGLE) return false;

    return nextProps.checkedStatus !== checkedStatus;
  }

  handleCheckBoxClick() {
    const { onAllRowsSelect } = this.props;

    onAllRowsSelect();
  }

  render() {
    const {
      CHECKBOX_STATUS_CHECKED, CHECKBOX_STATUS_INDETERMINATE, ROW_SELECT_SINGLE
    } = Const;

    const { mode, checkedStatus } = this.props;

    const checked = checkedStatus === CHECKBOX_STATUS_CHECKED;

    const indeterminate = checkedStatus === CHECKBOX_STATUS_INDETERMINATE;

    return mode === ROW_SELECT_SINGLE
      ? <th data-row-selection />
      : (
        <th data-row-selection onClick={this.handleCheckBoxClick}>
          <CheckBox
            {...this.props}
            checked={checked}
            indeterminate={indeterminate}
          />
        </th>
      );
  }
}
