"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _comparison = require("../comparison");
var _const = require("../const");
var _excluded = ["id", "style", "className", "defaultValue", "onFilter", "column", "options", "comparator", "withoutEmptyOption", "caseSensitive", "getFilter", "filterState"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
function optionsEquals(currOpts, prevOpts) {
  if (Array.isArray(currOpts)) {
    if (currOpts.length === prevOpts.length) {
      for (var i = 0; i < currOpts.length; i += 1) {
        if (currOpts[i].value !== prevOpts[i].value || currOpts[i].label !== prevOpts[i].label) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  var keys = Object.keys(currOpts);
  for (var _i = 0; _i < keys.length; _i += 1) {
    if (currOpts[keys[_i]] !== prevOpts[keys[_i]]) {
      return false;
    }
  }
  return Object.keys(currOpts).length === Object.keys(prevOpts).length;
}
function getOptionValue(options, key) {
  if (Array.isArray(options)) {
    var result = options.filter(function (_ref) {
      var label = _ref.label;
      return label === key;
    }).map(function (_ref2) {
      var value = _ref2.value;
      return value;
    });
    return result[0];
  }
  return options[key];
}
var SelectFilter = /*#__PURE__*/function (_Component) {
  _inherits(SelectFilter, _Component);
  var _super = _createSuper(SelectFilter);
  function SelectFilter(props) {
    var _this;
    _classCallCheck(this, SelectFilter);
    _this = _super.call(this, props);
    _this.filter = _this.filter.bind(_assertThisInitialized(_this));
    _this.options = _this.getOptions(props);
    var isSelected = getOptionValue(_this.options, _this.getDefaultValue()) !== undefined;
    _this.state = {
      isSelected: isSelected
    };
    return _this;
  }
  _createClass(SelectFilter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var _this$props = this.props,
        column = _this$props.column,
        onFilter = _this$props.onFilter,
        getFilter = _this$props.getFilter;
      var value = this.selectInput.value;
      if (value && value !== '') {
        onFilter(column, _const.FILTER_TYPE.SELECT, true)(value);
      }

      // export onFilter function to allow users to access
      if (getFilter) {
        getFilter(function (filterVal) {
          _this2.setState(function () {
            return {
              isSelected: filterVal !== ''
            };
          });
          _this2.selectInput.value = filterVal;
          onFilter(column, _const.FILTER_TYPE.SELECT)(filterVal);
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var needFilter = false;
      var _this$props2 = this.props,
        column = _this$props2.column,
        onFilter = _this$props2.onFilter,
        defaultValue = _this$props2.defaultValue;
      var nextOptions = this.getOptions(this.props);
      if (defaultValue !== prevProps.defaultValue) {
        needFilter = true;
      } else if (!optionsEquals(nextOptions, this.options)) {
        this.options = nextOptions;
        needFilter = true;
      }
      if (needFilter) {
        var value = this.selectInput.value;
        if (value) {
          onFilter(column, _const.FILTER_TYPE.SELECT)(value);
        }
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions(props) {
      return typeof props.options === 'function' ? props.options(props.column) : props.options;
    }
  }, {
    key: "getDefaultValue",
    value: function getDefaultValue() {
      var _this$props3 = this.props,
        filterState = _this$props3.filterState,
        defaultValue = _this$props3.defaultValue;
      if (filterState && typeof filterState.filterVal !== 'undefined') {
        return filterState.filterVal;
      }
      return defaultValue;
    }
  }, {
    key: "cleanFiltered",
    value: function cleanFiltered() {
      var value = this.props.defaultValue !== undefined ? this.props.defaultValue : '';
      this.setState(function () {
        return {
          isSelected: value !== ''
        };
      });
      this.selectInput.value = value;
      this.props.onFilter(this.props.column, _const.FILTER_TYPE.SELECT)(value);
    }
  }, {
    key: "applyFilter",
    value: function applyFilter(value) {
      this.selectInput.value = value;
      this.setState(function () {
        return {
          isSelected: value !== ''
        };
      });
      this.props.onFilter(this.props.column, _const.FILTER_TYPE.SELECT)(value);
    }
  }, {
    key: "filter",
    value: function filter(e) {
      var value = e.target.value;
      this.setState(function () {
        return {
          isSelected: value !== ''
        };
      });
      this.props.onFilter(this.props.column, _const.FILTER_TYPE.SELECT)(value);
    }
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      var optionTags = [];
      var options = this.options;
      var _this$props4 = this.props,
        placeholder = _this$props4.placeholder,
        column = _this$props4.column,
        withoutEmptyOption = _this$props4.withoutEmptyOption;
      if (!withoutEmptyOption) {
        optionTags.push( /*#__PURE__*/_react["default"].createElement("option", {
          key: "-1",
          value: ""
        }, placeholder || "Select ".concat(column.text, "...")));
      }
      if (Array.isArray(options)) {
        options.forEach(function (_ref3) {
          var value = _ref3.value,
            label = _ref3.label;
          return optionTags.push( /*#__PURE__*/_react["default"].createElement("option", {
            key: value,
            value: value
          }, label));
        });
      } else {
        Object.keys(options).forEach(function (key) {
          return optionTags.push( /*#__PURE__*/_react["default"].createElement("option", {
            key: key,
            value: key
          }, options[key]));
        });
      }
      return optionTags;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props5 = this.props,
        id = _this$props5.id,
        style = _this$props5.style,
        className = _this$props5.className,
        defaultValue = _this$props5.defaultValue,
        onFilter = _this$props5.onFilter,
        column = _this$props5.column,
        options = _this$props5.options,
        comparator = _this$props5.comparator,
        withoutEmptyOption = _this$props5.withoutEmptyOption,
        caseSensitive = _this$props5.caseSensitive,
        getFilter = _this$props5.getFilter,
        filterState = _this$props5.filterState,
        rest = _objectWithoutProperties(_this$props5, _excluded);
      var selectClass = "filter select-filter form-control ".concat(className, " ").concat(this.state.isSelected ? '' : 'placeholder-selected');
      var elmId = "select-filter-column-".concat(column.dataField).concat(id ? "-".concat(id) : '');
      return /*#__PURE__*/_react["default"].createElement("label", {
        className: "filter-label",
        htmlFor: elmId
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "sr-only"
      }, "Filter by ", column.text), /*#__PURE__*/_react["default"].createElement("select", _extends({}, rest, {
        ref: function ref(n) {
          return _this3.selectInput = n;
        },
        id: elmId,
        style: style,
        className: selectClass,
        onChange: this.filter,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        defaultValue: this.getDefaultValue() || ''
      }), this.renderOptions()));
    }
  }]);
  return SelectFilter;
}(_react.Component);
SelectFilter.propTypes = {
  onFilter: _propTypes["default"].func.isRequired,
  column: _propTypes["default"].object.isRequired,
  id: _propTypes["default"].string,
  filterState: _propTypes["default"].object,
  options: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].array]).isRequired,
  comparator: _propTypes["default"].oneOf([_comparison.LIKE, _comparison.EQ]),
  placeholder: _propTypes["default"].string,
  style: _propTypes["default"].object,
  className: _propTypes["default"].string,
  withoutEmptyOption: _propTypes["default"].bool,
  defaultValue: _propTypes["default"].any,
  caseSensitive: _propTypes["default"].bool,
  getFilter: _propTypes["default"].func
};
SelectFilter.defaultProps = {
  defaultValue: '',
  filterState: {},
  className: '',
  withoutEmptyOption: false,
  comparator: _comparison.EQ,
  caseSensitive: true,
  id: null
};
var _default = SelectFilter;
exports["default"] = _default;