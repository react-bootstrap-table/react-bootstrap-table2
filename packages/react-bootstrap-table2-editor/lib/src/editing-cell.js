"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _dropdownEditor = _interopRequireDefault(require("./dropdown-editor"));
var _textareaEditor = _interopRequireDefault(require("./textarea-editor"));
var _checkboxEditor = _interopRequireDefault(require("./checkbox-editor"));
var _dateEditor = _interopRequireDefault(require("./date-editor"));
var _textEditor = _interopRequireDefault(require("./text-editor"));
var _editorIndicator = _interopRequireDefault(require("./editor-indicator"));
var _const = require("./const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
var _default = function _default(_, onStartEdit) {
  var _class;
  return _class = /*#__PURE__*/function (_Component) {
    _inherits(EditingCell, _Component);
    var _super = _createSuper(EditingCell);
    function EditingCell(props) {
      var _this;
      _classCallCheck(this, EditingCell);
      _this = _super.call(this, props);
      _this.indicatorTimer = null;
      _this.clearTimer = _this.clearTimer.bind(_assertThisInitialized(_this));
      _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_this));
      _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
      _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
      _this.beforeComplete = _this.beforeComplete.bind(_assertThisInitialized(_this));
      _this.asyncbeforeCompete = _this.asyncbeforeCompete.bind(_assertThisInitialized(_this));
      _this.displayErrorMessage = _this.displayErrorMessage.bind(_assertThisInitialized(_this));
      _this.state = {
        invalidMessage: null
      };
      return _this;
    }
    _createClass(EditingCell, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clearTimer();
      }
    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(_ref) {
        var message = _ref.message;
        if (_.isDefined(message)) {
          this.createTimer();
          this.setState(function () {
            return {
              invalidMessage: message
            };
          });
        }
      }
    }, {
      key: "clearTimer",
      value: function clearTimer() {
        if (this.indicatorTimer) {
          clearTimeout(this.indicatorTimer);
        }
      }
    }, {
      key: "createTimer",
      value: function createTimer() {
        var _this2 = this;
        this.clearTimer();
        var _this$props = this.props,
          timeToCloseMessage = _this$props.timeToCloseMessage,
          onErrorMessageDisappear = _this$props.onErrorMessageDisappear;
        this.indicatorTimer = _.sleep(function () {
          _this2.setState(function () {
            return {
              invalidMessage: null
            };
          });
          if (_.isFunction(onErrorMessageDisappear)) onErrorMessageDisappear();
        }, timeToCloseMessage);
      }
    }, {
      key: "displayErrorMessage",
      value: function displayErrorMessage(message) {
        this.setState(function () {
          return {
            invalidMessage: message
          };
        });
        this.createTimer();
      }
    }, {
      key: "asyncbeforeCompete",
      value: function asyncbeforeCompete(newValue) {
        var _this3 = this;
        return function () {
          var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
            valid: true
          };
          var valid = result.valid,
            message = result.message;
          var _this3$props = _this3.props,
            onUpdate = _this3$props.onUpdate,
            row = _this3$props.row,
            column = _this3$props.column;
          if (!valid) {
            _this3.displayErrorMessage(message);
            return;
          }
          onUpdate(row, column, newValue);
        };
      }
    }, {
      key: "beforeComplete",
      value: function beforeComplete(newValue) {
        var _this$props2 = this.props,
          onUpdate = _this$props2.onUpdate,
          row = _this$props2.row,
          column = _this$props2.column;
        if (_.isFunction(column.validator)) {
          var validateForm = column.validator(newValue, row, column, this.asyncbeforeCompete(newValue));
          if (_.isObject(validateForm)) {
            if (validateForm.async) {
              return;
            } else if (!validateForm.valid) {
              this.displayErrorMessage(validateForm.message);
              return;
            }
          }
        }
        onUpdate(row, column, newValue);
      }
    }, {
      key: "handleBlur",
      value: function handleBlur() {
        var _this$props3 = this.props,
          onEscape = _this$props3.onEscape,
          blurToSave = _this$props3.blurToSave;
        if (blurToSave) {
          this.beforeComplete(this.editor.getValue());
        } else {
          onEscape();
        }
      }
    }, {
      key: "handleKeyDown",
      value: function handleKeyDown(e) {
        var onEscape = this.props.onEscape;
        if (e.keyCode === 27) {
          // ESC
          onEscape();
        } else if (e.keyCode === 13) {
          // ENTER
          this.beforeComplete(this.editor.getValue());
        }
      }
    }, {
      key: "handleClick",
      value: function handleClick(e) {
        if (e.target.tagName !== 'TD') {
          // To avoid the row selection event be triggered,
          // When user define selectRow.clickToSelect and selectRow.clickToEdit
          // We shouldn't trigger selection event even if user click on the cell editor(input)
          e.stopPropagation();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;
        var editor;
        var _this$props4 = this.props,
          row = _this$props4.row,
          column = _this$props4.column,
          className = _this$props4.className,
          style = _this$props4.style,
          rowIndex = _this$props4.rowIndex,
          columnIndex = _this$props4.columnIndex,
          autoSelectText = _this$props4.autoSelectText;
        var dataField = column.dataField;
        var value = _.get(row, dataField);
        var hasError = _.isDefined(this.state.invalidMessage);
        var customEditorClass = column.editorClasses || '';
        if (_.isFunction(column.editorClasses)) {
          customEditorClass = column.editorClasses(value, row, rowIndex, columnIndex);
        }
        var editorStyle = column.editorStyle || {};
        if (_.isFunction(column.editorStyle)) {
          editorStyle = column.editorStyle(value, row, rowIndex, columnIndex);
        }
        var editorClass = (0, _classnames["default"])({
          animated: hasError,
          shake: hasError
        }, customEditorClass);
        var editorProps = {
          ref: function ref(node) {
            return _this4.editor = node;
          },
          defaultValue: value,
          style: editorStyle,
          className: editorClass,
          onKeyDown: this.handleKeyDown,
          onBlur: this.handleBlur
        };
        if (onStartEdit) {
          editorProps.didMount = function () {
            return onStartEdit(row, column, rowIndex, columnIndex);
          };
        }
        var isDefaultEditorDefined = _.isObject(column.editor);
        if (isDefaultEditorDefined) {
          editorProps = _objectSpread(_objectSpread({}, editorProps), column.editor);
        } else if (_.isFunction(column.editorRenderer)) {
          editorProps = _objectSpread(_objectSpread({}, editorProps), {}, {
            onUpdate: this.beforeComplete
          });
        }
        if (_.isFunction(column.editorRenderer)) {
          editor = column.editorRenderer(editorProps, value, row, column, rowIndex, columnIndex);
        } else if (isDefaultEditorDefined && column.editor.type === _const.EDITTYPE.SELECT) {
          editor = /*#__PURE__*/_react["default"].createElement(_dropdownEditor["default"], _extends({}, editorProps, {
            row: row,
            column: column
          }));
        } else if (isDefaultEditorDefined && column.editor.type === _const.EDITTYPE.TEXTAREA) {
          editor = /*#__PURE__*/_react["default"].createElement(_textareaEditor["default"], _extends({}, editorProps, {
            autoSelectText: autoSelectText
          }));
        } else if (isDefaultEditorDefined && column.editor.type === _const.EDITTYPE.CHECKBOX) {
          editor = /*#__PURE__*/_react["default"].createElement(_checkboxEditor["default"], editorProps);
        } else if (isDefaultEditorDefined && column.editor.type === _const.EDITTYPE.DATE) {
          editor = /*#__PURE__*/_react["default"].createElement(_dateEditor["default"], editorProps);
        } else {
          editor = /*#__PURE__*/_react["default"].createElement(_textEditor["default"], _extends({}, editorProps, {
            autoSelectText: autoSelectText
          }));
        }
        return /*#__PURE__*/_react["default"].createElement("td", {
          className: (0, _classnames["default"])('react-bootstrap-table-editing-cell', className),
          style: style,
          onClick: this.handleClick
        }, editor, hasError ? /*#__PURE__*/_react["default"].createElement(_editorIndicator["default"], {
          invalidMessage: this.state.invalidMessage
        }) : null);
      }
    }]);
    return EditingCell;
  }(_react.Component), _defineProperty(_class, "propTypes", {
    row: _propTypes["default"].object.isRequired,
    rowIndex: _propTypes["default"].number.isRequired,
    column: _propTypes["default"].object.isRequired,
    columnIndex: _propTypes["default"].number.isRequired,
    onUpdate: _propTypes["default"].func.isRequired,
    onEscape: _propTypes["default"].func.isRequired,
    timeToCloseMessage: _propTypes["default"].number,
    autoSelectText: _propTypes["default"].bool,
    className: _propTypes["default"].string,
    style: _propTypes["default"].object
  }), _defineProperty(_class, "defaultProps", {
    timeToCloseMessage: _const.TIME_TO_CLOSE_MESSAGE,
    className: null,
    autoSelectText: false,
    style: {}
  }), _class;
};
exports["default"] = _default;