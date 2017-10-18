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
    onRowSelect: PropTypes.func
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
    const { ROW_SELECT_SINGLE } = Const;
    const {
      mode: inputType,
      rowKey,
      selected,
      onRowSelect
    } = this.props;

    const checked = inputType === ROW_SELECT_SINGLE
      ? true
      : !selected;

    onRowSelect(rowKey, checked);
  }

  render() {
    const {
      mode: inputType,
      selected
    } = this.props;

    return (
      <td onClick={ this.handleRowClick }>
        <input
          type={ inputType }
          checked={ selected }
        />
      </td>
    );
  }
}
