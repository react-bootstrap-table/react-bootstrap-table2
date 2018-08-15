import React from 'react';
import SelectionContext from '../contexts/selection-context';

export default Component => () => (
  <SelectionContext.Consumer>
    { selectRow => <Component { ...selectRow } /> }
  </SelectionContext.Consumer>
);
