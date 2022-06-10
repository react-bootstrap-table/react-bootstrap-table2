"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _context = require("./context");

var _editingCell = _interopRequireDefault(require("./editing-cell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = function _default(_, onStartEdit) {
  var EditingCell = (0, _editingCell["default"])(_, onStartEdit);

  var renderWithEditingCell = function renderWithEditingCell(props, cellEdit) {
    var content = _.get(props.row, props.column.dataField);

    var editCellstyle = props.column.editCellStyle || {};
    var editCellclasses = props.column.editCellClasses;

    if (_.isFunction(props.column.editCellStyle)) {
      editCellstyle = props.column.editCellStyle(content, props.row, props.rowIndex, props.columnIndex);
    }

    if (_.isFunction(props.column.editCellClasses)) {
      editCellclasses = props.column.editCellClasses(content, props.row, props.rowIndex, props.columnIndex);
    }

    return /*#__PURE__*/_react["default"].createElement(EditingCell, _extends({}, props, {
      className: editCellclasses,
      style: editCellstyle
    }, cellEdit));
  };

  return function (props) {
    return /*#__PURE__*/_react["default"].createElement(_context.Consumer, null, function (cellEdit) {
      return renderWithEditingCell(props, cellEdit);
    });
  };
};

exports["default"] = _default;