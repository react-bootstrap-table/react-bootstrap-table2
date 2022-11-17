"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editCell = void 0;
var _utils = _interopRequireDefault(require("../utils"));
var _rows = require("./rows");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var editCell = function editCell(data, keyField, rowId, dataField, newValue) {
  var row = (0, _rows.getRowByRowId)(data, keyField, rowId);
  if (row) _utils["default"].set(row, dataField, newValue);
};
exports.editCell = editCell;