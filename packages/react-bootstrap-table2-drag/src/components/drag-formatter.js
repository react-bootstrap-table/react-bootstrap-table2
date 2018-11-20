import React from 'react';

import DragCell from './drag-cell';

const dragFormatter = (cell, row, rowIndex) => (
  <DragCell index={ rowIndex } />
);

export default dragFormatter;
