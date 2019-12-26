/* eslint react/prop-types: 0 */
import React from 'react';
import cs from 'classnames';
import ExpandRow from './expand-row';
import _ from '../utils';
import ExpansionContext from '../contexts/row-expand-context';

export default (Component) => {
  const renderWithExpansion = (props, expandRow) => {
    let parentClassName = '';
    let className = '';
    const key = props.value;

    const expanded = _.contains(expandRow.expanded, key);
    const isClosing = _.contains(expandRow.isClosing, key);
    const expandable = !expandRow.nonExpandable || !_.contains(expandRow.nonExpandable, key);
    if (expanded) {
      parentClassName = _.isFunction(expandRow.parentClassName) ?
        expandRow.parentClassName(expanded, props.row, props.rowIndex) :
        (expandRow.parentClassName || '');

      className = _.isFunction(expandRow.className) ?
        expandRow.className(expanded, props.row, props.rowIndex) :
        (expandRow.className || '');
    }

    return [
      <Component
        { ...props }
        key={ key }
        expanded={ expanded }
        expandable={ expandable }
        expandRow={ { ...expandRow } }
        className={ cs(props.className, parentClassName) }
      />,
      expanded || isClosing ? <ExpandRow
        key={ `${key}-expanding` }
        colSpan={ props.visibleColumnSize }
        expanded={ expanded }
        onClosed={ () => expandRow.onClosed(key) }
        className={ className }
      >
        { expandRow.renderer(props.row, props.rowIndex) }
      </ExpandRow> : null
    ];
  };
  return props => (
    <ExpansionContext.Consumer>
      { expandRow => renderWithExpansion(props, expandRow) }
    </ExpansionContext.Consumer>
  );
};
