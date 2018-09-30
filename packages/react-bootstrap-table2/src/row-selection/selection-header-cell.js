/* eslint react/require-default-props: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from '../const';
import { BootstrapContext } from '../contexts/bootstrap';

export const CheckBox = ({ className, checked, indeterminate }) => (
  <input
    type="checkbox"
    checked={ checked }
    className={ className }
    ref={ (input) => {
      if (input) input.indeterminate = indeterminate; // eslint-disable-line no-param-reassign
    } }
    onChange={ () => {} }
  />
);

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool.isRequired,
  className: PropTypes.string
};

export default class SelectionHeaderCell extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    checkedStatus: PropTypes.string,
    onAllRowsSelect: PropTypes.func,
    hideSelectAll: PropTypes.bool,
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
    const { onAllRowsSelect, checkedStatus } = this.props;
    const isUnSelect =
      checkedStatus === Const.CHECKBOX_STATUS_CHECKED ||
      checkedStatus === Const.CHECKBOX_STATUS_INDETERMINATE;

    onAllRowsSelect(e, isUnSelect);
  }

  render() {
    const {
      CHECKBOX_STATUS_CHECKED, CHECKBOX_STATUS_INDETERMINATE, ROW_SELECT_MULTIPLE
    } = Const;

    const { mode, checkedStatus, selectionHeaderRenderer, hideSelectAll } = this.props;
    if (hideSelectAll) {
      return <th data-row-selection />;
    }

    const checked = checkedStatus === CHECKBOX_STATUS_CHECKED;

    const indeterminate = checkedStatus === CHECKBOX_STATUS_INDETERMINATE;

    const attrs = {};
    let content;
    if (selectionHeaderRenderer || mode === ROW_SELECT_MULTIPLE) {
      attrs.onClick = this.handleCheckBoxClick;
    }

    return (
      <BootstrapContext.Consumer>
        {
          ({ bootstrap4 }) => {
            if (selectionHeaderRenderer) {
              content = selectionHeaderRenderer({
                mode,
                checked,
                indeterminate
              });
            } else if (mode === ROW_SELECT_MULTIPLE) {
              content = (
                <CheckBox
                  { ...this.props }
                  checked={ checked }
                  className={ bootstrap4 ? 'selection-input-4' : '' }
                  indeterminate={ indeterminate }
                />
              );
            }
            return (
              <th data-row-selection { ...attrs }>{ content }</th>
            );
          }
        }
      </BootstrapContext.Consumer>
    );
  }
}
