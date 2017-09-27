/* eslint
  react/require-default-props: 0
  jsx-a11y/no-noninteractive-element-interactions: 0
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from '../const';

export default class SelectionCell extends Component {
  static propTypes = {
    rowKey: PropTypes.any,
    mode: PropTypes.string,
    selected: PropTypes.bool,
    onRowSelect: PropTypes.func
  }

  constructor() {
    super();
    this.handleRowClicked = this.handleRowClicked.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { selected } = this.props;

    return nextProps.selected !== selected;
  }

  handleRowClicked() {
    const { ROW_SELECT_SINGLE } = Const;
    const {
      rowKey,
      mode,
      selected,
      onRowSelect
    } = this.props;

    const inputType = mode;

    const checked = inputType === ROW_SELECT_SINGLE
      ? true
      : !selected;

    onRowSelect(rowKey, checked);
  }

  render() {
    const {
      mode,
      selected
    } = this.props;

    const inputType = mode;

    return (
      <td onClick={this.handleRowClicked}>
        <input
          type={inputType}
          checked={selected}
        />
      </td>
    );
  }
}
