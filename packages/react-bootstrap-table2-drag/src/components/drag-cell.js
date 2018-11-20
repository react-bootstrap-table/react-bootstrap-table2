
import React from 'react';
import PropTypes from 'prop-types';

import DragSource from './drag-source';
import DragTarget from './drag-target';
import DefaultButton from './default-button';

const DragCell = ({ index, Button = DefaultButton }) => (
  <DragTarget index={ index }>
    <DragSource index={ index }><Button /></DragSource>
  </DragTarget>
);

DragCell.propTypes = {
  index: PropTypes.number.isRequired,
  Button: PropTypes.func
};

DragCell.defaultProps = {
  Button: DefaultButton
};

export default DragCell;
