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
    }

    createDefaultEventHandler(cb) {
      return (e) => {
        const { row, rowIndex } = this.props;
        cb(e, row, rowIndex);
      };
    }

    delegate(attrs = {}) {
      const newAttrs = { ...attrs };
      Object.keys(attrs).forEach((attr) => {
        if (events.includes(attr)) {
          newAttrs[attr] = this.createDefaultEventHandler(attrs[attr]);
        }
      });
      return newAttrs;
    }
  };
