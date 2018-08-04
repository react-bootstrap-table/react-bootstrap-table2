import createContext from './src/context';
import editingCellFactory from './src/editing-cell';
import {
  EDITTYPE,
  CLICK_TO_CELL_EDIT,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK
} from './src/const';

export default (options = {}) => ({
  createContext,
  editingCellFactory,
  CLICK_TO_CELL_EDIT,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK,
  options
});

export const Type = EDITTYPE;
