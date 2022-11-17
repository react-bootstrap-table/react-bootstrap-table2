"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchRow = exports.getRowByRowId = void 0;
var _utils = _interopRequireDefault(require("../utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var matchRow = function matchRow(keyField, id) {
  return function (row) {
    return _utils["default"].get(row, keyField) === id;
  };
};
exports.matchRow = matchRow;
var getRowByRowId = function getRowByRowId(data, keyField, id) {
  return data.find(matchRow(keyField, id));
};
exports.getRowByRowId = getRowByRowId;