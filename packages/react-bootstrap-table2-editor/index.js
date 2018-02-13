import wrapperFactory from './src/wrapper';
import editingCellFactory from './src/editing-cell';
import {
  CLICK_TO_CELL_EDIT,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK
} from './src/const';
import TextEditor from './src/text-editor';
import DropDownEditor from './src/dropdown-editor';

export default (options = {}) => ({
  wrapperFactory,
  editingCellFactory,
  CLICK_TO_CELL_EDIT,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK,
  options
});

export {
  TextEditor,
  DropDownEditor
};
