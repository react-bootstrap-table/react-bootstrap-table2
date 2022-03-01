"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textFilter = exports.selectFilter = exports.numberFilter = exports.multiSelectFilter = exports["default"] = exports.dateFilter = exports.customFilter = exports.FILTER_TYPES = exports.Comparator = void 0;

var _text = _interopRequireDefault(require("./src/components/text"));

var _select = _interopRequireDefault(require("./src/components/select"));

var _multiselect = _interopRequireDefault(require("./src/components/multiselect"));

var _number = _interopRequireDefault(require("./src/components/number"));

var _date = _interopRequireDefault(require("./src/components/date"));

var _context = _interopRequireDefault(require("./src/context"));

var Comparison = _interopRequireWildcard(require("./src/comparison"));

var _const = require("./src/const");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    createContext: _context["default"],
    options: options
  };
};

exports["default"] = _default;
var FILTER_TYPES = _const.FILTER_TYPE;
exports.FILTER_TYPES = FILTER_TYPES;
var Comparator = Comparison;
exports.Comparator = Comparator;

var textFilter = function textFilter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Filter: _text["default"],
    props: props
  };
};

exports.textFilter = textFilter;

var selectFilter = function selectFilter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Filter: _select["default"],
    props: props
  };
};

exports.selectFilter = selectFilter;

var multiSelectFilter = function multiSelectFilter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Filter: _multiselect["default"],
    props: props
  };
};

exports.multiSelectFilter = multiSelectFilter;

var numberFilter = function numberFilter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Filter: _number["default"],
    props: props
  };
};

exports.numberFilter = numberFilter;

var dateFilter = function dateFilter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    Filter: _date["default"],
    props: props
  };
};

exports.dateFilter = dateFilter;

var customFilter = function customFilter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    props: props
  };
};

exports.customFilter = customFilter;