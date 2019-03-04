/* eslint react/prop-types: 0 */
import React from 'react';
import ExpandRow from './expand-row';
import ExpansionContext from '../contexts/row-expand-context';

export default (Component) => {
  const renderWithExpansion = (props, expandRow) => {
    const key = props.value;

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
        colSpan={ props.visibleColumnSize }
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
