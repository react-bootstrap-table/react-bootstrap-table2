"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unSelectableKeys = exports.selectableKeys = exports.getSelectionSummary = exports.getSelectedRows = void 0;

var _utils = _interopRequireDefault(require("../utils"));

var _rows = require("./rows");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSelectionSummary = function getSelectionSummary() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var keyField = arguments.length > 1 ? arguments[1] : undefined;
  var selected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var allRowsSelected = data.length > 0;
  var allRowsNotSelected = true;
  var rowKeys = data.map(function (d) {
    return _utils["default"].get(d, keyField);
  });

  var _loop = function _loop(i) {
    var curr = rowKeys[i];

    if (typeof selected.find(function (x) {
      return x === curr;
    }) === 'undefined') {
      allRowsSelected = false;
    } else {
      allRowsNotSelected = false;
    }
  };

  for (var i = 0; i < rowKeys.length; i += 1) {
    _loop(i);
  }

  return {
    allRowsSelected: allRowsSelected,
    allRowsNotSelected: allRowsNotSelected
  };
};

exports.getSelectionSummary = getSelectionSummary;

var selectableKeys = function selectableKeys() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var keyField = arguments.length > 1 ? arguments[1] : undefined;
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

exports.selectableKeys = selectableKeys;

var unSelectableKeys = function unSelectableKeys(selected) {
  var skips = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (skips.length === 0) {
    return [];
  }

  return selected.filter(function (x) {
    return _utils["default"].contains(skips, x);
  });
};

exports.unSelectableKeys = unSelectableKeys;

var getSelectedRows = function getSelectedRows() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var keyField = arguments.length > 1 ? arguments[1] : undefined;
  var selected = arguments.length > 2 ? arguments[2] : undefined;
  return selected.map(function (k) {
    return (0, _rows.getRowByRowId)(data, keyField, k);
  }).filter(function (x) {
    return !!x;
  });
};

exports.getSelectedRows = getSelectedRows;