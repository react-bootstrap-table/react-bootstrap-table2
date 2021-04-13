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
    isRowHeader: PropTypes.bool,
    expanded: PropTypes.bool.isRequired,
    expandable: PropTypes.bool.isRequired,
    onRowExpand: PropTypes.func.isRequired,
    expandColumnRenderer: PropTypes.func,
    rowIndex: PropTypes.number,
    tabIndex: PropTypes.number
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const shouldUpdate =
      this.props.isRowHeader !== nextProps.isRowHeader ||
      this.props.rowIndex !== nextProps.rowIndex ||
      this.props.expanded !== nextProps.expanded ||
      this.props.rowKey !== nextProps.rowKey ||
      this.props.tabIndex !== nextProps.tabIndex;

    return shouldUpdate;
  }

  handleClick(e) {
    const { rowKey, expanded, onRowExpand, rowIndex } = this.props;
    e.stopPropagation();
    onRowExpand(rowKey, !expanded, rowIndex, e);
  }

  render() {
    const {
      expanded, expandable, expandColumnRenderer, tabIndex, rowKey, isRowHeader
    } = this.props;
    const attrs = {};
    if (tabIndex !== -1) attrs.tabIndex = tabIndex;
    const cellContents = expandColumnRenderer ? expandColumnRenderer({
      expandable,
      expanded,
      rowKey
    }) : (expandable ? (expanded ? '(-)' : '(+)') : '');
    return (isRowHeader ? (
      <th className="expand-cell" onClick={ this.handleClick } { ...attrs }>
        {
          cellContents
        }
      </th>
    ) : (
      <td className="expand-cell" onClick={ this.handleClick } { ...attrs }>
        {
          cellContents
        }
      </td>
    ));
  }
}
