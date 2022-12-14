"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = require("prop-types");
var _comparison = require("../comparison");
var _const = require("../const");
var _excluded = ["id", "placeholder", "column", "style", "className", "onFilter", "caseSensitive", "defaultValue", "getFilter", "filterState"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
var TextFilter = /*#__PURE__*/function (_Component) {
  _inherits(TextFilter, _Component);
  var _super = _createSuper(TextFilter);
  function TextFilter(props) {
    var _this;
    _classCallCheck(this, TextFilter);
    _this = _super.call(this, props);
    _this.filter = _this.filter.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.timeout = null;
    function getDefaultValue() {
      if (props.filterState && typeof props.filterState.filterVal !== 'undefined') {
        return props.filterState.filterVal;
      }
      return props.defaultValue;
    }
    _this.state = {
      value: getDefaultValue()
    };
    return _this;
  }
  _createClass(TextFilter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var _this$props = this.props,
        onFilter = _this$props.onFilter,
        getFilter = _this$props.getFilter,
        column = _this$props.column;
      var defaultValue = this.input.value;
      if (defaultValue) {
        onFilter(this.props.column, _const.FILTER_TYPE.TEXT, true)(defaultValue);
      }

      // export onFilter function to allow users to access
      if (getFilter) {
        getFilter(function (filterVal) {
          _this2.setState(function () {
            return {
              value: filterVal
            };
          });
          onFilter(column, _const.FILTER_TYPE.TEXT)(filterVal);
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanTimer();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.defaultValue !== this.props.defaultValue) {
        this.applyFilter(nextProps.defaultValue);
      }
    }
  }, {
    key: "filter",
    value: function filter(e) {
      var _this3 = this;
      e.stopPropagation();
      this.cleanTimer();
      var filterValue = e.target.value;
      this.setState(function () {
        return {
          value: filterValue
        };
      });
      this.timeout = setTimeout(function () {
        _this3.props.onFilter(_this3.props.column, _const.FILTER_TYPE.TEXT)(filterValue);
      }, this.props.delay);
    }
  }, {
    key: "cleanTimer",
    value: function cleanTimer() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
    }
  }, {
    key: "cleanFiltered",
    value: function cleanFiltered() {
      var value = this.props.defaultValue;
      this.setState(function () {
        return {
          value: value
        };
      });
      this.props.onFilter(this.props.column, _const.FILTER_TYPE.TEXT)(value);
    }
  }, {
    key: "applyFilter",
    value: function applyFilter(filterText) {
      this.setState(function () {
        return {
          value: filterText
        };
      });
      this.props.onFilter(this.props.column, _const.FILTER_TYPE.TEXT)(filterText);
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      e.stopPropagation();
      if (this.props.onClick) {
        this.props.onClick(e);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var _this$props2 = this.props,
        id = _this$props2.id,
        placeholder = _this$props2.placeholder,
        _this$props2$column = _this$props2.column,
        dataField = _this$props2$column.dataField,
        text = _this$props2$column.text,
        style = _this$props2.style,
        className = _this$props2.className,
        onFilter = _this$props2.onFilter,
        caseSensitive = _this$props2.caseSensitive,
        defaultValue = _this$props2.defaultValue,
        getFilter = _this$props2.getFilter,
        filterState = _this$props2.filterState,
        rest = _objectWithoutProperties(_this$props2, _excluded);
      var elmId = "text-filter-column-".concat(dataField).concat(id ? "-".concat(id) : '');
      return /*#__PURE__*/_react["default"].createElement("label", {
        className: "filter-label",
        htmlFor: elmId
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "sr-only"
      }, "Filter by ", text), /*#__PURE__*/_react["default"].createElement("input", _extends({}, rest, {
        ref: function ref(n) {
          return _this4.input = n;
        },
        type: "text",
        id: elmId,
        className: "filter text-filter form-control ".concat(className),
        style: style,
        onChange: this.filter,
        onClick: this.handleClick,
        placeholder: placeholder || "Enter ".concat(text, "..."),
        value: this.state.value
      })));
    }
  }]);
  return TextFilter;
}(_react.Component);
TextFilter.propTypes = {
  onFilter: _propTypes.PropTypes.func.isRequired,
  column: _propTypes.PropTypes.object.isRequired,
  id: _propTypes.PropTypes.string,
  filterState: _propTypes.PropTypes.object,
  comparator: _propTypes.PropTypes.oneOf([_comparison.LIKE, _comparison.EQ]),
  defaultValue: _propTypes.PropTypes.string,
  delay: _propTypes.PropTypes.number,
  placeholder: _propTypes.PropTypes.string,
  style: _propTypes.PropTypes.object,
  className: _propTypes.PropTypes.string,
  caseSensitive: _propTypes.PropTypes.bool,
  getFilter: _propTypes.PropTypes.func
};
TextFilter.defaultProps = {
  delay: _const.FILTER_DELAY,
  filterState: {},
  defaultValue: '',
  caseSensitive: false,
  id: null
};
var _default = TextFilter;
exports["default"] = _default;