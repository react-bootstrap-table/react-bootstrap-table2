"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sort = exports.nextOrder = void 0;

var _utils = _interopRequireDefault(require("../utils"));

var _const = _interopRequireDefault(require("../const"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function comparator(a, b) {
  var result;

  if (typeof b === 'string') {
    result = b.localeCompare(a);
  } else {
    result = a > b ? -1 : a < b ? 1 : 0;
  }

  return result;
}

var sort = function sort(data, sortOrder, _ref) {
  var dataField = _ref.dataField,
      sortFunc = _ref.sortFunc,
      sortValue = _ref.sortValue;

  var _data = _toConsumableArray(data);

  _data.sort(function (a, b) {
    var result;

    var valueA = _utils["default"].get(a, dataField);

    var valueB = _utils["default"].get(b, dataField);

    if (sortValue) {
      valueA = sortValue(valueA, a);
      valueB = sortValue(valueB, b);
    } else {
      valueA = _utils["default"].isDefined(valueA) ? valueA : '';
      valueB = _utils["default"].isDefined(valueB) ? valueB : '';
    }

    if (sortFunc) {
      result = sortFunc(valueA, valueB, sortOrder, dataField, a, b);
    } else {
      if (sortOrder === _const["default"].SORT_DESC) {
        result = comparator(valueA, valueB);
      } else {
        result = comparator(valueB, valueA);
      }
    }

    return result;
  });

  return _data;
};

exports.sort = sort;

var nextOrder = function nextOrder(currentSortColumn, _ref2) {
  var sortOrder = _ref2.sortOrder,
      sortColumn = _ref2.sortColumn;
  var defaultOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _const["default"].SORT_DESC;
  if (!sortColumn || currentSortColumn.dataField !== sortColumn.dataField) return defaultOrder;
  return sortOrder === _const["default"].SORT_DESC ? _const["default"].SORT_ASC : _const["default"].SORT_DESC;
};

exports.nextOrder = nextOrder;