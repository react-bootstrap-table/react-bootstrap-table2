"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filters = exports.filterFactory = exports.filterByText = exports.filterByNumber = exports.filterByDate = exports.filterByArray = void 0;
var _const = require("./const");
var _comparison = require("./comparison");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var filterByText = function filterByText(_) {
  return function (data, dataField, _ref, customFilterValue) {
    var _ref$filterVal = _ref.filterVal,
      userInput = _ref$filterVal === void 0 ? '' : _ref$filterVal,
      _ref$comparator = _ref.comparator,
      comparator = _ref$comparator === void 0 ? _comparison.LIKE : _ref$comparator,
      caseSensitive = _ref.caseSensitive;
    // make sure filter value to be a string
    var filterVal = userInput.toString();
    return data.filter(function (row) {
      var cell = _.get(row, dataField);
      if (customFilterValue) {
        cell = customFilterValue(cell, row);
      }
      var cellStr = _.isDefined(cell) ? cell.toString() : '';
      if (comparator === _comparison.EQ) {
        return cellStr === filterVal;
      }
      if (caseSensitive) {
        return cellStr.includes(filterVal);
      }
      return cellStr.toLocaleUpperCase().indexOf(filterVal.toLocaleUpperCase()) !== -1;
    });
  };
};
exports.filterByText = filterByText;
var filterByNumber = function filterByNumber(_) {
  return function (data, dataField, _ref2, customFilterValue) {
    var _ref2$filterVal = _ref2.filterVal,
      comparator = _ref2$filterVal.comparator,
      number = _ref2$filterVal.number;
    return data.filter(function (row) {
      if (number === '' || !comparator) return true;
      var cell = _.get(row, dataField);
      if (customFilterValue) {
        cell = customFilterValue(cell, row);
      }
      switch (comparator) {
        case _comparison.EQ:
          {
            return cell == number;
          }
        case _comparison.GT:
          {
            return cell > number;
          }
        case _comparison.GE:
          {
            return cell >= number;
          }
        case _comparison.LT:
          {
            return cell < number;
          }
        case _comparison.LE:
          {
            return cell <= number;
          }
        case _comparison.NE:
          {
            return cell != number;
          }
        default:
          {
            console.error('Number comparator provided is not supported');
            return true;
          }
      }
    });
  };
};
exports.filterByNumber = filterByNumber;
var filterByDate = function filterByDate(_) {
  return function (data, dataField, _ref3, customFilterValue) {
    var _ref3$filterVal = _ref3.filterVal,
      comparator = _ref3$filterVal.comparator,
      date = _ref3$filterVal.date;
    if (!date || !comparator) return data;
    var filterDate = date.getUTCDate();
    var filterMonth = date.getUTCMonth();
    var filterYear = date.getUTCFullYear();
    return data.filter(function (row) {
      var valid = true;
      var cell = _.get(row, dataField);
      if (customFilterValue) {
        cell = customFilterValue(cell, row);
      }
      if (_typeof(cell) !== 'object') {
        cell = new Date(cell);
      }
      var targetDate = cell.getUTCDate();
      var targetMonth = cell.getUTCMonth();
      var targetYear = cell.getUTCFullYear();
      switch (comparator) {
        case _comparison.EQ:
          {
            if (filterDate !== targetDate || filterMonth !== targetMonth || filterYear !== targetYear) {
              valid = false;
            }
            break;
          }
        case _comparison.GT:
          {
            if (cell <= date) {
              valid = false;
            }
            break;
          }
        case _comparison.GE:
          {
            if (targetYear < filterYear) {
              valid = false;
            } else if (targetYear === filterYear && targetMonth < filterMonth) {
              valid = false;
            } else if (targetYear === filterYear && targetMonth === filterMonth && targetDate < filterDate) {
              valid = false;
            }
            break;
          }
        case _comparison.LT:
          {
            if (cell >= date) {
              valid = false;
            }
            break;
          }
        case _comparison.LE:
          {
            if (targetYear > filterYear) {
              valid = false;
            } else if (targetYear === filterYear && targetMonth > filterMonth) {
              valid = false;
            } else if (targetYear === filterYear && targetMonth === filterMonth && targetDate > filterDate) {
              valid = false;
            }
            break;
          }
        case _comparison.NE:
          {
            if (filterDate === targetDate && filterMonth === targetMonth && filterYear === targetYear) {
              valid = false;
            }
            break;
          }
        default:
          {
            console.error('Date comparator provided is not supported');
            break;
          }
      }
      return valid;
    });
  };
};
exports.filterByDate = filterByDate;
var filterByArray = function filterByArray(_) {
  return function (data, dataField, _ref4) {
    var filterVal = _ref4.filterVal,
      comparator = _ref4.comparator;
    if (filterVal.length === 0) return data;
    var refinedFilterVal = filterVal.filter(function (x) {
      return _.isDefined(x);
    }).map(function (x) {
      return x.toString();
    });
    return data.filter(function (row) {
      var cell = _.get(row, dataField);
      var cellStr = _.isDefined(cell) ? cell.toString() : '';
      if (comparator === _comparison.EQ) {
        return refinedFilterVal.indexOf(cellStr) !== -1;
      }
      cellStr = cellStr.toLocaleUpperCase();
      return refinedFilterVal.some(function (item) {
        return cellStr.indexOf(item.toLocaleUpperCase()) !== -1;
      });
    });
  };
};
exports.filterByArray = filterByArray;
var filterFactory = function filterFactory(_) {
  return function (filterType) {
    switch (filterType) {
      case _const.FILTER_TYPE.MULTISELECT:
        return filterByArray(_);
      case _const.FILTER_TYPE.NUMBER:
        return filterByNumber(_);
      case _const.FILTER_TYPE.DATE:
        return filterByDate(_);
      case _const.FILTER_TYPE.TEXT:
      case _const.FILTER_TYPE.SELECT:
      default:
        // Use `text` filter as default filter
        return filterByText(_);
    }
  };
};
exports.filterFactory = filterFactory;
var filters = function filters(data, columns, _) {
  return function (currFilters) {
    var clearFilters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var factory = filterFactory(_);
    var filterState = _objectSpread(_objectSpread({}, clearFilters), currFilters);
    var result = data;
    var filterFn;
    Object.keys(filterState).forEach(function (dataField) {
      var currentResult;
      var filterValue;
      var customFilter;
      for (var i = 0; i < columns.length; i += 1) {
        if (columns[i].dataField === dataField) {
          filterValue = columns[i].filterValue;
          if (columns[i].filter) {
            customFilter = columns[i].filter.props.onFilter;
          }
          break;
        }
      }
      if (clearFilters[dataField] && customFilter) {
        currentResult = customFilter(clearFilters[dataField].filterVal, result);
        if (typeof currentResult !== 'undefined') {
          result = currentResult;
        }
      } else {
        var filterObj = filterState[dataField];
        filterFn = factory(filterObj.filterType);
        if (customFilter) {
          currentResult = customFilter(filterObj.filterVal, result);
        }
        if (typeof currentResult === 'undefined') {
          result = filterFn(result, dataField, filterObj, filterValue);
        } else {
          result = currentResult;
        }
      }
    });
    return result;
  };
};
exports.filters = filters;