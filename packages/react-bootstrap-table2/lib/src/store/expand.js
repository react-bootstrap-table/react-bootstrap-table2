"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAnyExpands = exports.getExpandedRows = exports.expandableKeys = void 0;

var _utils = _interopRequireDefault(require("../utils"));

var _rows = require("./rows");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var isAnyExpands = function isAnyExpands(data, keyField) {
  var expanded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  var _loop = function _loop(i) {
    var rowKey = _utils["default"].get(data[i], keyField);

    if (typeof expanded.find(function (x) {
      return x === rowKey;
    }) !== 'undefined') {
      return {
        v: true
      };
    }
  };

  for (var i = 0; i < data.length; i += 1) {
    var _ret = _loop(i);

    if (_typeof(_ret) === "object") return _ret.v;
  }

  return false;
};

exports.isAnyExpands = isAnyExpands;

var expandableKeys = function expandableKeys(data, keyField) {
  var skips = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (skips.length === 0) {
    return data.map(function (row) {
      return _utils["default"].get(row, keyField);
    });
  }

  return data.filter(function (row) {
    return !_utils["default"].contains(skips, _utils["default"].get(row, keyField));
  }).map(function (row) {
    return _utils["default"].get(row, keyField);
  });
};

exports.expandableKeys = expandableKeys;

var getExpandedRows = function getExpandedRows(data, keyField, expanded) {
  return expanded.map(function (k) {
    return (0, _rows.getRowByRowId)(data, keyField, k);
  });
};

exports.getExpandedRows = getExpandedRows;