/* eslint
  react/require-default-props: 0
  jsx-a11y/no-noninteractive-element-interactions: 0
*/
/* eslint no-nested-ternary: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ExpandCell extends Component {
  static propTypes = {
    rowKey: PropTypes.any,
    expanded: PropTypes.bool.isRequired,
    onRowExpand: PropTypes.func.isRequired,
    expandColumnRenderer: PropTypes.func,
    rowIndex: PropTypes.number
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const { rowKey, expanded, onRowExpand, rowIndex } = this.props;

    onRowExpand(rowKey, !expanded, rowIndex, e);
  }

  render() {
    const { expanded, expandColumnRenderer } = this.props;

    return (
      <td onClick={ this.handleClick }>
        {
          expandColumnRenderer ? expandColumnRenderer({
            expanded
          }) : (expanded ? '(-)' : '(+)')
        }
      </td>
    );
  }
}
