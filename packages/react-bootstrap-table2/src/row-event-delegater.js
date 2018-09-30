import _ from './utils';
import Const from './const';

const events = [
  'onClick',
  'onDoubleClick',
  'onMouseEnter',
  'onMouseLeave',
  'onContextMenu'
];

export default ExtendBase =>
  class RowEventDelegater extends ExtendBase {
    constructor(props) {
      super(props);
      this.clickNum = 0;
      this.createDefaultEventHandler = this.createDefaultEventHandler.bind(this);
      this.createClickEventHandler = this.createClickEventHandler.bind(this);
    }

    createDefaultEventHandler(cb) {
      return (e) => {
        const { row, rowIndex } = this.props;
        cb(e, row, rowIndex);
      };
    }

    createClickEventHandler(cb) {
      return (e) => {
        const {
          row,
          selected,
          keyField,
          selectable,
          expandable,
          rowIndex,
          expanded,
          expandRow,
          selectRow,
          cellEdit: {
            mode,
            DBCLICK_TO_CELL_EDIT,
            DELAY_FOR_DBCLICK
          }
        } = this.props;

        const clickFn = () => {
          if (cb) {
            cb(e, row, rowIndex);
          }
          const key = _.get(row, keyField);
          if (expandRow && expandable) {
            expandRow.onRowExpand(key, !expanded, rowIndex, e);
          }
          if (selectRow.mode !== Const.ROW_SELECT_DISABLED && selectable) {
            selectRow.onRowSelect(key, !selected, rowIndex, e);
          }
        };

        if (mode === DBCLICK_TO_CELL_EDIT && selectRow.clickToEdit) {
          this.clickNum += 1;
          _.debounce(() => {
            if (this.clickNum === 1) {
              clickFn();
            }
            this.clickNum = 0;
          }, DELAY_FOR_DBCLICK)();
        } else {
          clickFn();
        }
      };
    }

    delegate(attrs = {}) {
      const newAttrs = {};
      const { expandRow, selectRow } = this.props;
      if (expandRow || (selectRow && selectRow.clickToSelect)) {
        newAttrs.onClick = this.createClickEventHandler(attrs.onClick);
      }
      Object.keys(attrs).forEach((attr) => {
        if (!newAttrs[attr]) {
          if (events.includes(attr)) {
            newAttrs[attr] = this.createDefaultEventHandler(attrs[attr]);
          } else {
            newAttrs[attr] = attrs[attr];
          }
        }
      });
      return newAttrs;
    }
  };
