"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _arguments = typeof arguments === "undefined" ? void 0 : arguments,
  _this = void 0;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
var handleDebounce = function handleDebounce(func, wait, immediate) {
  var timeout;
  return function () {
    var later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(_this, _arguments);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait || 0);
    if (callNow) {
      func.appy(_this, _arguments);
    }
  };
};
var SearchBar = /*#__PURE__*/function (_React$Component) {
  _inherits(SearchBar, _React$Component);
  var _super = _createSuper(SearchBar);
  function SearchBar(props) {
    var _this2;
    _classCallCheck(this, SearchBar);
    _this2 = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this2), "onChangeValue", function (e) {
      _this2.setState({
        value: e.target.value
      });
    });
    _defineProperty(_assertThisInitialized(_this2), "onKeyup", function () {
      var _this2$props = _this2.props,
        delay = _this2$props.delay,
        onSearch = _this2$props.onSearch;
      var debounceCallback = handleDebounce(function () {
        onSearch(_this2.input.value);
      }, delay);
      debounceCallback();
    });
    _this2.state = {
      value: props.searchText
    };
    return _this2;
  }
  _createClass(SearchBar, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({
        value: nextProps.searchText
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props = this.props,
        className = _this$props.className,
        style = _this$props.style,
        placeholder = _this$props.placeholder,
        tableId = _this$props.tableId,
        srText = _this$props.srText;
      return /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: "search-bar-".concat(tableId),
        className: "search-label"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        id: "search-bar-".concat(tableId, "-label"),
        className: "sr-only"
      }, srText), /*#__PURE__*/_react["default"].createElement("input", {
        ref: function ref(n) {
          return _this3.input = n;
        },
        id: "search-bar-".concat(tableId),
        type: "text",
        style: style,
        "aria-labelledby": "search-bar-".concat(tableId, "-label"),
        onKeyUp: function onKeyUp() {
          return _this3.onKeyup();
        },
        onChange: this.onChangeValue,
        className: "form-control ".concat(className),
        value: this.state.value,
        placeholder: placeholder || SearchBar.defaultProps.placeholder
      }));
    }
  }]);
  return SearchBar;
}(_react["default"].Component);
SearchBar.propTypes = {
  onSearch: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  style: _propTypes["default"].object,
  delay: _propTypes["default"].number,
  searchText: _propTypes["default"].string,
  tableId: _propTypes["default"].string,
  srText: _propTypes["default"].string
};
SearchBar.defaultProps = {
  className: '',
  style: {},
  placeholder: 'Search',
  delay: 250,
  searchText: '',
  tableId: '0',
  srText: 'Search this table'
};
var _default = SearchBar;
exports["default"] = _default;