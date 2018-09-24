import createContext from './src/context';
import withRowLevelCellEdit from './src/row-consumer';
import createEditingCell from './src/editing-cell-binder';
import {
  EDITTYPE,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK
} from './src/const';

export default (options = {}) => ({
  createContext,
  createEditingCell,
  withRowLevelCellEdit,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK,
  options
});

export const Type = EDITTYPE;
