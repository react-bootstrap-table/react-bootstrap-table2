"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Consumer = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _const = require("./const");
var _excluded = ["nonEditableRows", "errorMessage"],
  _excluded2 = ["options"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
var CellEditContext = /*#__PURE__*/_react["default"].createContext();
var _default = function _default(_, dataOperator, isRemoteCellEdit, handleCellChange) {
  var CellEditProvider = /*#__PURE__*/function (_React$Component) {
    _inherits(CellEditProvider, _React$Component);
    var _super = _createSuper(CellEditProvider);
    function CellEditProvider(props) {
      var _this;
      _classCallCheck(this, CellEditProvider);
      _this = _super.call(this, props);
      _this.doUpdate = _this.doUpdate.bind(_assertThisInitialized(_this));
      _this.startEditing = _this.startEditing.bind(_assertThisInitialized(_this));
      _this.escapeEditing = _this.escapeEditing.bind(_assertThisInitialized(_this));
      _this.completeEditing = _this.completeEditing.bind(_assertThisInitialized(_this));
      _this.handleCellUpdate = _this.handleCellUpdate.bind(_assertThisInitialized(_this));
      _this.state = {
        ridx: null,
        cidx: null,
        message: null
      };
      return _this;
    }
    _createClass(CellEditProvider, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.cellEdit && isRemoteCellEdit()) {
          if (nextProps.cellEdit.options.errorMessage) {
            this.setState(function () {
              return {
                message: nextProps.cellEdit.options.errorMessage
              };
            });
          } else {
            this.escapeEditing();
          }
        }
      }
    }, {
      key: "handleCellUpdate",
      value: function handleCellUpdate(row, column, newValue) {
        var _this2 = this;
        var newValueWithType = dataOperator.typeConvert(column.type, newValue);
        var cellEdit = this.props.cellEdit;
        var beforeSaveCell = cellEdit.options.beforeSaveCell;
        var oldValue = _.get(row, column.dataField);
        var beforeSaveCellDone = function beforeSaveCellDone() {
          var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
          if (result) {
            _this2.doUpdate(row, column, newValueWithType);
          } else {
            _this2.escapeEditing();
          }
        };
        if (_.isFunction(beforeSaveCell)) {
          var result = beforeSaveCell(oldValue, newValueWithType, row, column, beforeSaveCellDone);
          if (_.isObject(result) && result.async) {
            return;
          }
        }
        this.doUpdate(row, column, newValueWithType);
      }
    }, {
      key: "doUpdate",
      value: function doUpdate(row, column, newValue) {
        var _this$props = this.props,
          keyField = _this$props.keyField,
          cellEdit = _this$props.cellEdit,
          data = _this$props.data;
        var afterSaveCell = cellEdit.options.afterSaveCell;
        var rowId = _.get(row, keyField);
        var oldValue = _.get(row, column.dataField);
        if (isRemoteCellEdit()) {
          handleCellChange(rowId, column.dataField, newValue);
        } else {
          dataOperator.editCell(data, keyField, rowId, column.dataField, newValue);
          if (_.isFunction(afterSaveCell)) afterSaveCell(oldValue, newValue, row, column);
          this.completeEditing();
        }
      }
    }, {
      key: "completeEditing",
      value: function completeEditing() {
        this.setState(function () {
          return {
            ridx: null,
            cidx: null,
            message: null
          };
        });
      }
    }, {
      key: "startEditing",
      value: function startEditing(ridx, cidx) {
        var _this3 = this;
        var editing = function editing() {
          _this3.setState(function () {
            return {
              ridx: ridx,
              cidx: cidx
            };
          });
        };
        var selectRow = this.props.selectRow;
        if (!selectRow || selectRow.clickToEdit || !selectRow.clickToSelect) editing();
      }
    }, {
      key: "escapeEditing",
      value: function escapeEditing() {
        this.setState(function () {
          return {
            ridx: null,
            cidx: null
          };
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props$cellEdit = this.props.cellEdit,
          _this$props$cellEdit$ = _this$props$cellEdit.options,
          nonEditableRows = _this$props$cellEdit$.nonEditableRows,
          errorMessage = _this$props$cellEdit$.errorMessage,
          optionsRest = _objectWithoutProperties(_this$props$cellEdit$, _excluded),
          cellEditRest = _objectWithoutProperties(_this$props$cellEdit, _excluded2);
        var newCellEdit = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, optionsRest), cellEditRest), this.state), {}, {
          nonEditableRows: _.isDefined(nonEditableRows) ? nonEditableRows() : [],
          onStart: this.startEditing,
          onEscape: this.escapeEditing,
          onUpdate: this.handleCellUpdate
        });
        return /*#__PURE__*/_react["default"].createElement(CellEditContext.Provider, {
          value: _objectSpread({}, newCellEdit)
        }, this.props.children);
      }
    }]);
    return CellEditProvider;
  }(_react["default"].Component);
  _defineProperty(CellEditProvider, "propTypes", {
    data: _propTypes["default"].array.isRequired,
    selectRow: _propTypes["default"].object,
    options: _propTypes["default"].shape({
      mode: _propTypes["default"].oneOf([_const.CLICK_TO_CELL_EDIT, _const.DBCLICK_TO_CELL_EDIT]).isRequired,
      onErrorMessageDisappear: _propTypes["default"].func,
      blurToSave: _propTypes["default"].bool,
      beforeSaveCell: _propTypes["default"].func,
      afterSaveCell: _propTypes["default"].func,
      onStartEdit: _propTypes["default"].func,
      nonEditableRows: _propTypes["default"].func,
      timeToCloseMessage: _propTypes["default"].number,
      errorMessage: _propTypes["default"].any
    })
  });
  return {
    Provider: CellEditProvider
  };
};
exports["default"] = _default;
var Consumer = CellEditContext.Consumer;
exports.Consumer = Consumer;