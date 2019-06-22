import _ from './utils';

const events = [
  'onClick',
  'onDoubleClick',
  'onMouseEnter',
  'onMouseLeave',
  'onContextMenu'
];

export default ExtendBase =>
  class CellEventDelegater extends ExtendBase {
    constructor(props) {
      super(props);
      this.createDefaultEventHandler = this.createDefaultEventHandler.bind(this);
    }

    createDefaultEventHandler(cb) {
      return (e) => {
        const { column, columnIndex } = this.props;
        cb(e, column, columnIndex);
      };
    }

    delegate(attrs = {}) {
      const newAttrs = { ...attrs };
      Object.keys(attrs).forEach((attr) => {
        if (_.contains(events, attr)) {
          newAttrs[attr] = this.createDefaultEventHandler(attrs[attr]);
        }
      });
      return newAttrs;
    }
  };
