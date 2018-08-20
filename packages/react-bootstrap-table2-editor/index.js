import createContext from './src/context';
import bindCellLevelCellEdit from './src/cell-binder';
import bindRowLevelCellEdit from './src/row-binder';
import createEditingCell from './src/editing-cell-binder';
import {
  EDITTYPE,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK
} from './src/const';

export default (options = {}) => ({
  createContext,
  createEditingCell,
  bindCellLevelCellEdit,
  bindRowLevelCellEdit,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK,
  options
});

export const Type = EDITTYPE;
