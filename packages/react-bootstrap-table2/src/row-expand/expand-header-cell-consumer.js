import React from 'react';
import ExpansionContext from '../contexts/row-expand-context';

export default Component => () => (
  <ExpansionContext.Consumer>
    { expandRow => <Component { ...expandRow } /> }
  </ExpansionContext.Consumer>
);
