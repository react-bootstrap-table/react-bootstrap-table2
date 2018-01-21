/* eslint
  react/require-default-props: 0
  jsx-a11y/no-noninteractive-element-interactions: 0
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from '../const';

export default class SelectionCell extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    rowKey: PropTypes.any,
    selected: PropTypes.bool,
    onRowSelect: PropTypes.func,
    disabled: PropTypes.bool,
    rowIndex: PropTypes.number
  }

  constructor() {
    super();
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { selected } = this.props;

    return nextProps.selected !== selected;
  }

  handleRowClick() {
    const {
      mode: inputType,
      rowKey,
      selected,
      onRowSelect,
      disabled,
      rowIndex
    } = this.props;

    if (disabled) return;

    const checked = inputType === Const.ROW_SELECT_SINGLE
      ? true
      : !selected;

    onRowSelect(rowKey, checked, rowIndex);
  }

  render() {
    const {
      mode: inputType,
      selected,
      disabled
    } = this.props;

    return (
      <td onClick={ this.handleRowClick }>
        <input
          type={ inputType }
          checked={ selected }
          disabled={ disabled }
        />
      </td>
    );
  }
}
