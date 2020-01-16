import React from 'react';
import { DragSource } from 'react-dnd';

import { DRAG_TYPES } from '../const';
import { Consumer } from '../context';

const source = {
  beginDrag(props) {
    return {
      index: props.index,
      onDragDrop: props.onDragDrop
    };
  }
};

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const Source = ({ connectDragSource, children }) => (
  connectDragSource(
    <div>
      {children}
    </div>
  )
);

const WrappedSource = DragSource(DRAG_TYPES.ROW, source, collectSource)(Source);

const ProvideContext = props => (
  <Consumer>
    { ({ onDragDrop }) => <WrappedSource onDragDrop={ onDragDrop } { ...props } /> }
  </Consumer>
);

export default ProvideContext;
