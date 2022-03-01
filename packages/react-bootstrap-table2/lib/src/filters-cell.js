"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var FiltersCell = function FiltersCell(props) {
  var index = props.index,
      column = props.column,
      onExternalFilter = props.onExternalFilter,
      currFilters = props.currFilters,
      onFilter = props.onFilter;
  var filterRenderer = column.filterRenderer,
      filter = column.filter;
  var filterElm;
  var cellAttrs = {};
  var cellStyle = {};
  cellAttrs.style = cellStyle;

  if (column.headerAlign) {
    cellStyle.textAlign = _utils["default"].isFunction(column.headerAlign) ? column.headerAlign(column, index) : column.headerAlign;
  }

  if (column.filterRenderer) {
    var onCustomFilter = onExternalFilter(column, filter.props.type);
    filterElm = filterRenderer(onCustomFilter, column);
  } else if (filter) {
    filterElm = /*#__PURE__*/_react["default"].createElement(filter.Filter, _extends({}, filter.props, {
      filterState: currFilters[column.dataField],
      onFilter: onFilter,
      column: column
    }));
  }

  return /*#__PURE__*/_react["default"].createElement('th', cellAttrs, filterElm);
};

FiltersCell.propTypes = {
  index: _propTypes["default"].number.isRequired,
  column: _propTypes["default"].object.isRequired,
  currFilters: _propTypes["default"].object.isRequired,
  onFilter: _propTypes["default"].func,
  onExternalFilter: _propTypes["default"].func
};
FiltersCell.defaultProps = {
  onFilter: function onFilter() {},
  onExternalFilter: function onExternalFilter() {}
};
var _default = FiltersCell;
exports["default"] = _default;