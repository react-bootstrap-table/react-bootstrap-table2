/* eslint react/require-default-props: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from '../const';

export const CheckBox = ({ checked, indeterminate }) => (
  <input
    type="checkbox"
    checked={ checked }
    ref={ (input) => {
      if (input) input.indeterminate = indeterminate; // eslint-disable-line no-param-reassign
    } }
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
    onAllRowsSelect: PropTypes.func,
    selectionHeaderRenderer: PropTypes.func
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

  handleCheckBoxClick(e) {
    const { onAllRowsSelect } = this.props;

    onAllRowsSelect(e);
  }

  render() {
    const {
      CHECKBOX_STATUS_CHECKED, CHECKBOX_STATUS_INDETERMINATE, ROW_SELECT_MULTIPLE
    } = Const;

    const { mode, checkedStatus, selectionHeaderRenderer } = this.props;

    const checked = checkedStatus === CHECKBOX_STATUS_CHECKED;

    const indeterminate = checkedStatus === CHECKBOX_STATUS_INDETERMINATE;

    const attrs = {};
    let content;
    if (selectionHeaderRenderer) {
      content = selectionHeaderRenderer({
        mode,
        checked,
        indeterminate
      });
      attrs.onClick = this.handleCheckBoxClick;
    } else if (mode === ROW_SELECT_MULTIPLE) {
      content = (
        <CheckBox
          { ...this.props }
          checked={ checked }
          indeterminate={ indeterminate }
        />
      );
      attrs.onClick = this.handleCheckBoxClick;
    }

    return (
      <th data-row-selection { ...attrs }>{ content }</th>
    );
  }
}
