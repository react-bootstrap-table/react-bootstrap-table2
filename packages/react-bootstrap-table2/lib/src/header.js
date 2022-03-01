"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _headerCell = _interopRequireDefault(require("./header-cell"));

var _selectionHeaderCell = _interopRequireDefault(require("./row-selection/selection-header-cell"));

var _expandHeaderCell = _interopRequireDefault(require("./row-expand/expand-header-cell"));

var _selectionHeaderCellConsumer = _interopRequireDefault(require("./row-selection/selection-header-cell-consumer"));

var _expandHeaderCellConsumer = _interopRequireDefault(require("./row-expand/expand-header-cell-consumer"));

var _const = _interopRequireDefault(require("./const"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint react/require-default-props: 0 */
var Header = function Header(props) {
  var className = props.className,
      columns = props.columns,
      onSort = props.onSort,
      onFilter = props.onFilter,
      sortField = props.sortField,
      sortOrder = props.sortOrder,
      selectRow = props.selectRow,
      expandRow = props.expandRow,
      currFilters = props.currFilters,
      onExternalFilter = props.onExternalFilter,
      filterPosition = props.filterPosition,
      globalSortCaret = props.globalSortCaret,
      wrapperClasses = props.wrapperClasses;

  var SelectionHeaderCellComp = function SelectionHeaderCellComp() {
    return null;
  };

  var ExpansionHeaderCellComp = function ExpansionHeaderCellComp() {
    return null;
  };

  if (expandRow.showExpandColumn) {
    ExpansionHeaderCellComp = (0, _expandHeaderCellConsumer["default"])(_expandHeaderCell["default"]);
  }

  if (selectRow) {
    SelectionHeaderCellComp = (0, _selectionHeaderCellConsumer["default"])(_selectionHeaderCell["default"]);
  }

  var isRenderFunctionColumnInLeft = function isRenderFunctionColumnInLeft() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _const["default"].INDICATOR_POSITION_LEFT;
    return position === _const["default"].INDICATOR_POSITION_LEFT;
  };

  var childrens = [columns.map(function (column, i) {
    var currSort = column.dataField === sortField;
    var isLastSorting = column.dataField === sortField;
    return /*#__PURE__*/_react["default"].createElement(_headerCell["default"], {
      index: i,
      key: column.dataField,
      column: column,
      onSort: onSort,
      sorting: currSort,
      sortOrder: sortOrder,
      globalSortCaret: globalSortCaret,
      isLastSorting: isLastSorting,
      onFilter: onFilter,
      currFilters: currFilters,
      onExternalFilter: onExternalFilter,
      filterPosition: filterPosition
    });
  })];

  if (!selectRow.hideSelectColumn) {
    if (isRenderFunctionColumnInLeft(selectRow.selectColumnPosition)) {
      childrens.unshift( /*#__PURE__*/_react["default"].createElement(SelectionHeaderCellComp, {
        key: "selection"
      }));
    } else {
      childrens.push( /*#__PURE__*/_react["default"].createElement(SelectionHeaderCellComp, {
        key: "selection"
      }));
    }
  }

  if (expandRow.showExpandColumn) {
    if (isRenderFunctionColumnInLeft(expandRow.expandColumnPosition)) {
      childrens.unshift( /*#__PURE__*/_react["default"].createElement(ExpansionHeaderCellComp, {
        key: "expansion"
      }));
    } else {
      childrens.push( /*#__PURE__*/_react["default"].createElement(ExpansionHeaderCellComp, {
        key: "expansion"
      }));
    }
  }

  return /*#__PURE__*/_react["default"].createElement("thead", {
    className: wrapperClasses
  }, /*#__PURE__*/_react["default"].createElement("tr", {
    className: className
  }, childrens));
};

Header.propTypes = {
  columns: _propTypes["default"].array.isRequired,
  onSort: _propTypes["default"].func,
  onFilter: _propTypes["default"].func,
  sortField: _propTypes["default"].string,
  sortOrder: _propTypes["default"].string,
  selectRow: _propTypes["default"].object,
  currFilters: _propTypes["default"].object,
  onExternalFilter: _propTypes["default"].func,
  globalSortCaret: _propTypes["default"].func,
  className: _propTypes["default"].string,
  wrapperClasses: _propTypes["default"].string,
  expandRow: _propTypes["default"].object,
  filterPosition: _propTypes["default"].oneOf([_const["default"].FILTERS_POSITION_TOP, _const["default"].FILTERS_POSITION_INLINE, _const["default"].FILTERS_POSITION_BOTTOM])
};
var _default = Header;
exports["default"] = _default;