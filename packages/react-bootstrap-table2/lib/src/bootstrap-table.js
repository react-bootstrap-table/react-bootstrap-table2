"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _header = _interopRequireDefault(require("./header"));
var _filters = _interopRequireDefault(require("./filters"));
var _caption = _interopRequireDefault(require("./caption"));
var _body = _interopRequireDefault(require("./body"));
var _footer = _interopRequireDefault(require("./footer"));
var _propsResolver = _interopRequireDefault(require("./props-resolver"));
var _const = _interopRequireDefault(require("./const"));
var _utils = _interopRequireDefault(require("./utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var BootstrapTable = /*#__PURE__*/function (_PropsBaseResolver) {
  _inherits(BootstrapTable, _PropsBaseResolver);
  var _super = _createSuper(BootstrapTable);
  function BootstrapTable(props) {
    var _this;
    _classCallCheck(this, BootstrapTable);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "getData", function () {
      return _this.visibleRows();
    });
    _this.validateProps();
    return _this;
  }
  _createClass(BootstrapTable, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.onDataSizeChange && !nextProps.pagination) {
        if (nextProps.data.length !== this.props.data.length) {
          nextProps.onDataSizeChange({
            dataSize: nextProps.data.length
          });
        }
      }
    }

    // Exposed APIs
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        loading = _this$props.loading,
        overlay = _this$props.overlay;
      if (overlay) {
        var LoadingOverlay = overlay(loading);
        return /*#__PURE__*/_react["default"].createElement(LoadingOverlay, null, this.renderTable());
      }
      return this.renderTable();
    }
  }, {
    key: "renderTable",
    value: function renderTable() {
      var _this$props2 = this.props,
        columns = _this$props2.columns,
        keyField = _this$props2.keyField,
        tabIndexCell = _this$props2.tabIndexCell,
        id = _this$props2.id,
        classes = _this$props2.classes,
        bootstrap4 = _this$props2.bootstrap4,
        striped = _this$props2.striped,
        hover = _this$props2.hover,
        bordered = _this$props2.bordered,
        condensed = _this$props2.condensed,
        noDataIndication = _this$props2.noDataIndication,
        caption = _this$props2.caption,
        rowStyle = _this$props2.rowStyle,
        rowClasses = _this$props2.rowClasses,
        wrapperClasses = _this$props2.wrapperClasses,
        rowEvents = _this$props2.rowEvents,
        selectRow = _this$props2.selectRow,
        expandRow = _this$props2.expandRow,
        cellEdit = _this$props2.cellEdit,
        filterPosition = _this$props2.filterPosition;
      var tableWrapperClass = (0, _classnames["default"])('react-bootstrap-table', wrapperClasses);
      var tableClass = (0, _classnames["default"])('table', _defineProperty({
        'table-striped': striped,
        'table-hover': hover,
        'table-bordered': bordered
      }, bootstrap4 ? 'table-sm' : 'table-condensed', condensed), classes);
      var hasFilters = columns.some(function (col) {
        return col.filter || col.filterRenderer;
      });
      var hasFooter = _utils["default"].filter(columns, function (col) {
        return _utils["default"].has(col, 'footer');
      }).length > 0;
      var tableCaption = caption && /*#__PURE__*/_react["default"].createElement(_caption["default"], {
        bootstrap4: bootstrap4
      }, caption);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: tableWrapperClass
      }, /*#__PURE__*/_react["default"].createElement("table", {
        id: id,
        className: tableClass
      }, tableCaption, /*#__PURE__*/_react["default"].createElement(_header["default"], {
        columns: columns,
        className: this.props.headerClasses,
        wrapperClasses: this.props.headerWrapperClasses,
        sortField: this.props.sortField,
        sortOrder: this.props.sortOrder,
        onSort: this.props.onSort,
        globalSortCaret: this.props.sort && this.props.sort.sortCaret,
        onFilter: this.props.onFilter,
        currFilters: this.props.currFilters,
        onExternalFilter: this.props.onExternalFilter,
        selectRow: selectRow,
        expandRow: expandRow,
        filterPosition: filterPosition
      }), hasFilters && filterPosition !== _const["default"].FILTERS_POSITION_INLINE && /*#__PURE__*/_react["default"].createElement(_filters["default"], {
        columns: columns,
        className: this.props.filtersClasses,
        onSort: this.props.onSort,
        onFilter: this.props.onFilter,
        currFilters: this.props.currFilters,
        filterPosition: this.props.filterPosition,
        onExternalFilter: this.props.onExternalFilter,
        selectRow: selectRow,
        expandRow: expandRow
      }), /*#__PURE__*/_react["default"].createElement(_body["default"], {
        className: this.props.bodyClasses,
        data: this.getData(),
        keyField: keyField,
        tabIndexCell: tabIndexCell,
        columns: columns,
        isEmpty: this.isEmpty(),
        visibleColumnSize: this.visibleColumnSize(),
        noDataIndication: noDataIndication,
        cellEdit: cellEdit,
        selectRow: selectRow,
        expandRow: expandRow,
        rowStyle: rowStyle,
        rowClasses: rowClasses,
        rowEvents: rowEvents
      }), hasFooter && /*#__PURE__*/_react["default"].createElement(_footer["default"], {
        data: this.getData(),
        columns: columns,
        selectRow: selectRow,
        expandRow: expandRow,
        className: this.props.footerClasses
      })));
    }
  }]);
  return BootstrapTable;
}((0, _propsResolver["default"])(_react.Component));
BootstrapTable.propTypes = {
  keyField: _propTypes["default"].string.isRequired,
  data: _propTypes["default"].array.isRequired,
  columns: _propTypes["default"].array.isRequired,
  bootstrap4: _propTypes["default"].bool,
  remote: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
    pagination: _propTypes["default"].bool
  })]),
  noDataIndication: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  striped: _propTypes["default"].bool,
  bordered: _propTypes["default"].bool,
  hover: _propTypes["default"].bool,
  tabIndexCell: _propTypes["default"].bool,
  id: _propTypes["default"].string,
  classes: _propTypes["default"].string,
  headerClasses: _propTypes["default"].string,
  bodyClasses: _propTypes["default"].string,
  wrapperClasses: _propTypes["default"].string,
  headerWrapperClasses: _propTypes["default"].string,
  condensed: _propTypes["default"].bool,
  caption: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  pagination: _propTypes["default"].object,
  filter: _propTypes["default"].object,
  cellEdit: _propTypes["default"].object,
  selectRow: _propTypes["default"].shape({
    mode: _propTypes["default"].oneOf([_const["default"].ROW_SELECT_SINGLE, _const["default"].ROW_SELECT_MULTIPLE, _const["default"].ROW_SELECT_DISABLED]).isRequired,
    clickToSelect: _propTypes["default"].bool,
    clickToExpand: _propTypes["default"].bool,
    clickToEdit: _propTypes["default"].bool,
    hideSelectAll: _propTypes["default"].bool,
    onSelect: _propTypes["default"].func,
    onSelectAll: _propTypes["default"].func,
    style: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
    classes: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    nonSelectable: _propTypes["default"].array,
    nonSelectableStyle: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    nonSelectableClasses: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    bgColor: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    hideSelectColumn: _propTypes["default"].bool,
    selectionRenderer: _propTypes["default"].func,
    selectionHeaderRenderer: _propTypes["default"].func,
    headerColumnStyle: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
    selectColumnStyle: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
    selectColumnPosition: _propTypes["default"].oneOf([_const["default"].INDICATOR_POSITION_LEFT, _const["default"].INDICATOR_POSITION_RIGHT])
  }),
  expandRow: _propTypes["default"].shape({
    renderer: _propTypes["default"].func,
    expanded: _propTypes["default"].array,
    onExpand: _propTypes["default"].func,
    onExpandAll: _propTypes["default"].func,
    nonExpandable: _propTypes["default"].array,
    showExpandColumn: _propTypes["default"].bool,
    onlyOneExpanding: _propTypes["default"].bool,
    expandByColumnOnly: _propTypes["default"].bool,
    expandColumnRenderer: _propTypes["default"].func,
    expandHeaderColumnRenderer: _propTypes["default"].func,
    expandColumnPosition: _propTypes["default"].oneOf([_const["default"].INDICATOR_POSITION_LEFT, _const["default"].INDICATOR_POSITION_RIGHT]),
    className: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
    parentClassName: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func])
  }),
  rowStyle: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]),
  rowEvents: _propTypes["default"].object,
  rowClasses: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  filtersClasses: _propTypes["default"].string,
  filterPosition: _propTypes["default"].oneOf([_const["default"].FILTERS_POSITION_TOP, _const["default"].FILTERS_POSITION_INLINE, _const["default"].FILTERS_POSITION_BOTTOM]),
  footerClasses: _propTypes["default"].string,
  defaultSorted: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    dataField: _propTypes["default"].string.isRequired,
    order: _propTypes["default"].oneOf([_const["default"].SORT_DESC, _const["default"].SORT_ASC]).isRequired
  })),
  sort: _propTypes["default"].shape({
    dataField: _propTypes["default"].string,
    order: _propTypes["default"].oneOf([_const["default"].SORT_DESC, _const["default"].SORT_ASC]),
    sortFunc: _propTypes["default"].func,
    sortCaret: _propTypes["default"].func
  }),
  defaultSortDirection: _propTypes["default"].oneOf([_const["default"].SORT_DESC, _const["default"].SORT_ASC]),
  overlay: _propTypes["default"].func,
  onTableChange: _propTypes["default"].func,
  onSort: _propTypes["default"].func,
  onFilter: _propTypes["default"].func,
  onExternalFilter: _propTypes["default"].func,
  onDataSizeChange: _propTypes["default"].func,
  // Inject from toolkit
  search: _propTypes["default"].shape({
    searchText: _propTypes["default"].string,
    searchContext: _propTypes["default"].func
  }),
  setDependencyModules: _propTypes["default"].func
};
BootstrapTable.defaultProps = {
  bootstrap4: false,
  remote: false,
  striped: false,
  bordered: true,
  hover: false,
  condensed: false,
  noDataIndication: null,
  selectRow: {
    mode: _const["default"].ROW_SELECT_DISABLED,
    selected: [],
    hideSelectColumn: true
  },
  expandRow: {
    renderer: undefined,
    expanded: [],
    nonExpandable: []
  },
  cellEdit: {
    mode: null,
    nonEditableRows: []
  },
  filterPosition: _const["default"].FILTERS_POSITION_INLINE
};
var _default = BootstrapTable;
exports["default"] = _default;