import React from 'react';
import { DropTarget } from 'react-dnd';

import { DRAG_TYPES } from '../const';

const target = {
  drop(props, monitor) {
    const item = monitor.getItem();
    item.onDragDrop(item.index, props.index);
  }
};

const collectTarget = connect => ({
  connectDropTarget: connect.dropTarget()
});

const Target = ({ connectDropTarget, children }) => (
  connectDropTarget(
    <div>{children}</div>
  )
);

const WrappedTarget = DropTarget(DRAG_TYPES.ROW, target, collectTarget)(Target);

export default WrappedTarget;
