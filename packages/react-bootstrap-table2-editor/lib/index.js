"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Type = void 0;
var _context = _interopRequireDefault(require("./src/context"));
var _rowConsumer = _interopRequireDefault(require("./src/row-consumer"));
var _editingCellConsumer = _interopRequireDefault(require("./src/editing-cell-consumer"));
var _const = require("./src/const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    createContext: _context["default"],
    createEditingCell: _editingCellConsumer["default"],
    withRowLevelCellEdit: _rowConsumer["default"],
    DBCLICK_TO_CELL_EDIT: _const.DBCLICK_TO_CELL_EDIT,
    DELAY_FOR_DBCLICK: _const.DELAY_FOR_DBCLICK,
    options: options
  };
};
exports["default"] = _default;
var Type = _const.EDITTYPE;
exports.Type = Type;