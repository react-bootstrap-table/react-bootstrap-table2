import DragSource from './src/components/drag-source';
import DragTarget from './src/components/drag-target';
import DragCell from './src/components/drag-cell';
import dragFormatter from './src/components/drag-formatter';
import createContext from './src/context';

export default (options = {}) => ({
  createContext,
  options
});

export {
  DragSource,
  DragTarget,
  DragCell,
  dragFormatter
};
