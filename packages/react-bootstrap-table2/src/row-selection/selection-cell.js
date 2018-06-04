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
    rowIndex: PropTypes.number,
    clickToSelect: PropTypes.bool,
    selectionRenderer: PropTypes.func
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { selected } = this.props;

    return nextProps.selected !== selected;
  }

  handleClick(e) {
    const {
      mode: inputType,
      rowKey,
      selected,
      onRowSelect,
      disabled,
      rowIndex,
      clickToSelect
    } = this.props;

    if (disabled) return;
    if (clickToSelect) return;

    const checked = inputType === Const.ROW_SELECT_SINGLE
      ? true
      : !selected;

    onRowSelect(rowKey, checked, rowIndex, e);
  }

  render() {
    const {
      mode: inputType,
      selected,
      disabled,
      selectionRenderer
    } = this.props;

    return (
      <td onClick={ this.handleClick }>
        {
          selectionRenderer ? selectionRenderer({
            mode: inputType,
            checked: selected,
            disabled
          }) : (
            <input
              type={ inputType }
              checked={ selected }
              disabled={ disabled }
            />
          )
        }
      </td>
    );
  }
}
