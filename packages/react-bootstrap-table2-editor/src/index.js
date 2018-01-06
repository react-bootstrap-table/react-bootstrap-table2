import wrapperFactory from './wrapper';
import editingCellFactory from './editing-cell';
import {
  CLICK_TO_CELL_EDIT,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK
} from './const';

export default (options = {}) => ({
  wrapperFactory,
  editingCellFactory,
  CLICK_TO_CELL_EDIT,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK,
  options
});
