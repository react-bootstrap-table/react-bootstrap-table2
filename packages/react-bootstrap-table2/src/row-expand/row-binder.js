/* eslint react/prop-types: 0 */
import React from 'react';
import _ from '../utils';
import ExpandRow from './expand-row';
import ExpansionContext from '../contexts/row-expand-context';

export default (Component, visibleColumnSize) => {
  const renderWithExpansion = (props, expandRow) => {
    const key = _.get(props.row, props.keyField);

    const expanded = expandRow.expanded.includes(key);
    const expandable = !expandRow.nonExpandable || !expandRow.nonExpandable.includes(key);

    return [
      <Component
        { ...props }
        key={ key }
        expanded={ expanded }
        expandable={ expandable }
        expandRow={ { ...expandRow } }
      />,
      expanded ? <ExpandRow
        key={ `${key}-expanding` }
        colSpan={ visibleColumnSize }
      >
        { expandRow.renderer(props.row) }
      </ExpandRow> : null
    ];
  };
  return props => (
    <ExpansionContext.Consumer>
      { expandRow => renderWithExpansion(props, expandRow) }
    </ExpansionContext.Consumer>
  );
};
