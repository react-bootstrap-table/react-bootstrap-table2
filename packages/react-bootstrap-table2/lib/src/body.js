"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = _interopRequireDefault(require("./utils"));
var _simpleRow = _interopRequireDefault(require("./row/simple-row"));
var _aggregateRow = _interopRequireDefault(require("./row/aggregate-row"));
var _rowSection = _interopRequireDefault(require("./row/row-section"));
var _const = _interopRequireDefault(require("./const"));
var _rowConsumer = _interopRequireDefault(require("./row-selection/row-consumer"));
var _rowConsumer2 = _interopRequireDefault(require("./row-expand/row-consumer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var Body = /*#__PURE__*/function (_React$Component) {
  _inherits(Body, _React$Component);
  var _super = _createSuper(Body);
  function Body(props) {
    var _this;
    _classCallCheck(this, Body);
    _this = _super.call(this, props);
    var keyField = props.keyField,
      cellEdit = props.cellEdit,
      selectRow = props.selectRow,
      expandRow = props.expandRow;

    // Construct Editing Cell Component
    if (cellEdit.createContext) {
      _this.EditingCell = cellEdit.createEditingCell(_utils["default"], cellEdit.options.onStartEdit);
    }

    // Construct Row Component
    var RowComponent = _simpleRow["default"];
    var selectRowEnabled = selectRow.mode !== _const["default"].ROW_SELECT_DISABLED;
    var expandRowEnabled = !!expandRow.renderer;
    if (expandRowEnabled) {
      RowComponent = (0, _rowConsumer2["default"])(_aggregateRow["default"]);
    }
    if (selectRowEnabled) {
      RowComponent = (0, _rowConsumer["default"])(expandRowEnabled ? RowComponent : _aggregateRow["default"]);
    }
    if (cellEdit.createContext) {
      RowComponent = cellEdit.withRowLevelCellEdit(RowComponent, selectRowEnabled, keyField, _utils["default"]);
    }
    _this.RowComponent = RowComponent;
    return _this;
  }
  _createClass(Body, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        columns = _this$props.columns,
        data = _this$props.data,
        tabIndexCell = _this$props.tabIndexCell,
        keyField = _this$props.keyField,
        isEmpty = _this$props.isEmpty,
        noDataIndication = _this$props.noDataIndication,
        visibleColumnSize = _this$props.visibleColumnSize,
        cellEdit = _this$props.cellEdit,
        selectRow = _this$props.selectRow,
        rowStyle = _this$props.rowStyle,
        rowClasses = _this$props.rowClasses,
        rowEvents = _this$props.rowEvents,
        expandRow = _this$props.expandRow,
        className = _this$props.className;
      var content;
      if (isEmpty) {
        var indication = _utils["default"].isFunction(noDataIndication) ? noDataIndication() : noDataIndication;
        if (!indication) {
          return null;
        }
        content = /*#__PURE__*/_react["default"].createElement(_rowSection["default"], {
          content: indication,
          colSpan: visibleColumnSize
        });
      } else {
        var selectRowEnabled = selectRow.mode !== _const["default"].ROW_SELECT_DISABLED;
        var expandRowEnabled = !!expandRow.renderer;
        var additionalRowProps = {};
        if (cellEdit.createContext) {
          additionalRowProps.EditingCellComponent = this.EditingCell;
        }
        if (selectRowEnabled || expandRowEnabled) {
          additionalRowProps.expandRow = expandRow;
          additionalRowProps.selectRow = selectRow;
        }
        content = data.map(function (row, index) {
          var key = _utils["default"].get(row, keyField);
          var baseRowProps = _objectSpread({
            key: key,
            row: row,
            tabIndexCell: tabIndexCell,
            columns: columns,
            keyField: keyField,
            cellEdit: cellEdit,
            value: key,
            rowIndex: index,
            visibleColumnSize: visibleColumnSize,
            attrs: rowEvents || {}
          }, additionalRowProps);
          baseRowProps.style = _utils["default"].isFunction(rowStyle) ? rowStyle(row, index) : rowStyle;
          baseRowProps.className = _utils["default"].isFunction(rowClasses) ? rowClasses(row, index) : rowClasses;
          return /*#__PURE__*/_react["default"].createElement(_this2.RowComponent, baseRowProps);
        });
      }
      return /*#__PURE__*/_react["default"].createElement("tbody", {
        className: className
      }, content);
    }
  }]);
  return Body;
}(_react["default"].Component);
Body.propTypes = {
  keyField: _propTypes["default"].string.isRequired,
  data: _propTypes["default"].array.isRequired,
  columns: _propTypes["default"].array.isRequired,
  selectRow: _propTypes["default"].object
};
var _default = Body;
exports["default"] = _default;