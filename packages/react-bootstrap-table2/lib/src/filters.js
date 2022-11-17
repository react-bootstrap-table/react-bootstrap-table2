"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _filtersCell = _interopRequireDefault(require("./filters-cell"));
var _const = _interopRequireDefault(require("./const"));
var _rowTemplate = _interopRequireDefault(require("./row/row-template"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/* eslint react/require-default-props: 0 */

var Filters = function Filters(props) {
  var columns = props.columns,
    onFilter = props.onFilter,
    currFilters = props.currFilters,
    filterPosition = props.filterPosition,
    onExternalFilter = props.onExternalFilter,
    className = props.className,
    selectRow = props.selectRow,
    expandRow = props.expandRow;
  function renderContent() {
    var filterColumns = [];
    var showFiltersRow = false;
    columns.forEach(function (column, i) {
      filterColumns.push( /*#__PURE__*/_react["default"].createElement(_filtersCell["default"], {
        index: i,
        key: column.dataField,
        column: column,
        currFilters: currFilters,
        onExternalFilter: onExternalFilter,
        onFilter: onFilter
      }));
      if (column.filterRenderer || column.filter) {
        if (!showFiltersRow) {
          showFiltersRow = true;
        }
      }
    });
    return filterColumns;
  }
  return /*#__PURE__*/_react["default"].createElement("tbody", {
    className: className,
    style: {
      display: filterPosition === _const["default"].FILTERS_POSITION_TOP ? 'table-header-group' : 'table-footer-group'
    }
  }, /*#__PURE__*/_react["default"].createElement(_rowTemplate["default"], {
    renderContent: renderContent,
    selectRow: selectRow,
    expandRow: expandRow,
    cellEl: "td"
  }));
};
Filters.propTypes = {
  columns: _propTypes["default"].array.isRequired,
  onFilter: _propTypes["default"].func,
  filterPosition: _propTypes["default"].oneOf([_const["default"].FILTERS_POSITION_TOP, _const["default"].FILTERS_POSITION_INLINE, _const["default"].FILTERS_POSITION_BOTTOM]),
  currFilters: _propTypes["default"].object,
  onExternalFilter: _propTypes["default"].func,
  className: _propTypes["default"].string,
  selectRow: _propTypes["default"].object,
  expandRow: _propTypes["default"].object
};
Filters.defaultProps = {
  position: _const["default"].FILTERS_POSITION_TOP
};
var _default = Filters;
exports["default"] = _default;