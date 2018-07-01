/* eslint react/require-default-props: 0 */
/* eslint no-nested-ternary: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SelectionHeaderCell extends Component {
  static propTypes = {
    anyExpands: PropTypes.bool.isRequired,
    onAllRowExpand: PropTypes.func.isRequired,
    renderer: PropTypes.func
  }

  constructor() {
    super();
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
  }

  handleCheckBoxClick(e) {
    const { anyExpands, onAllRowExpand } = this.props;

    onAllRowExpand(e, !anyExpands);
  }

  render() {
    const { anyExpands, renderer } = this.props;
    const attrs = {
      onClick: this.handleCheckBoxClick
    };

    return (
      <th data-row-selection { ...attrs }>
        {
          renderer ?
            renderer({ isAnyExpands: anyExpands }) :
            (anyExpands ? '(-)' : '(+)')
        }
      </th>
    );
  }
}
