/* eslint
  react/require-default-props: 0
  jsx-a11y/no-noninteractive-element-interactions: 0
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Const from '../const';
import { BootstrapContext } from '../contexts/bootstrap';

export default class SelectionCell extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    rowKey: PropTypes.any,
    selected: PropTypes.bool,
    onRowSelect: PropTypes.func,
    disabled: PropTypes.bool,
    rowIndex: PropTypes.number,
    tabIndex: PropTypes.number,
    clickToSelect: PropTypes.bool,
    selectionRenderer: PropTypes.func
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const shouldUpdate =
      this.props.rowIndex !== nextProps.rowIndex ||
      this.props.selected !== nextProps.selected ||
      this.props.disabled !== nextProps.disabled ||
      this.props.rowKey !== nextProps.rowKey ||
      this.props.tabIndex !== nextProps.tabIndex;

    return shouldUpdate;
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
      tabIndex,
      rowIndex,
      selectionRenderer
    } = this.props;

    const attrs = {};
    if (tabIndex !== -1) attrs.tabIndex = tabIndex;

    return (
      <BootstrapContext.Consumer>
        {
          ({ bootstrap4 }) => (
            <td onClick={ this.handleClick } { ...attrs }>
              {
                selectionRenderer ? selectionRenderer({
                  mode: inputType,
                  checked: selected,
                  disabled,
                  rowIndex
                }) : (
                  <input
                    type={ inputType }
                    checked={ selected }
                    disabled={ disabled }
                    className={ bootstrap4 ? 'selection-input-4' : '' }
                    onChange={ () => {} }
                  />
                )
              }
            </td>
          )
        }
      </BootstrapContext.Consumer>
    );
  }
}
