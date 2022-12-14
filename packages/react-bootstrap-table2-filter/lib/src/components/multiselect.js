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
var _excluded = ["id", "style", "className", "filterState", "defaultValue", "onFilter", "column", "options", "comparator", "withoutEmptyOption", "caseSensitive", "getFilter"];
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
  var keys = Object.keys(currOpts);
  for (var i = 0; i < keys.length; i += 1) {
    if (currOpts[keys[i]] !== prevOpts[keys[i]]) {
      return false;
    }
  }
  return Object.keys(currOpts).length === Object.keys(prevOpts).length;
}
var getSelections = function getSelections(container) {
  if (container.selectedOptions) {
    return Array.from(container.selectedOptions).map(function (item) {
      return item.value;
    });
  }
  var selections = [];
  var totalLen = container.options.length;
  for (var i = 0; i < totalLen; i += 1) {
    var option = container.options.item(i);
    if (option.selected) selections.push(option.value);
  }
  return selections;
};
var MultiSelectFilter = /*#__PURE__*/function (_Component) {
  _inherits(MultiSelectFilter, _Component);
  var _super = _createSuper(MultiSelectFilter);
  function MultiSelectFilter(props) {
    var _this;
    _classCallCheck(this, MultiSelectFilter);
    _this = _super.call(this, props);
    _this.filter = _this.filter.bind(_assertThisInitialized(_this));
    _this.applyFilter = _this.applyFilter.bind(_assertThisInitialized(_this));
    var isSelected = props.defaultValue.map(function (item) {
      return props.options[item];
    }).length > 0;
    _this.state = {
      isSelected: isSelected
    };
    return _this;
  }
  _createClass(MultiSelectFilter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var getFilter = this.props.getFilter;
      var value = getSelections(this.selectInput);
      if (value && value.length > 0) {
        this.applyFilter(value);
      }

      // export onFilter function to allow users to access
      if (getFilter) {
        getFilter(function (filterVal) {
          _this2.selectInput.value = filterVal;
          _this2.applyFilter(filterVal);
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var needFilter = false;
      if (this.props.defaultValue !== prevProps.defaultValue) {
        needFilter = true;
      } else if (!optionsEquals(this.props.options, prevProps.options)) {
        needFilter = true;
      }
      if (needFilter) {
        this.applyFilter(getSelections(this.selectInput));
      }
    }
  }, {
    key: "getDefaultValue",
    value: function getDefaultValue() {
      var _this$props = this.props,
        filterState = _this$props.filterState,
        defaultValue = _this$props.defaultValue;
      if (filterState && typeof filterState.filterVal !== 'undefined') {
        return filterState.filterVal;
      }
      return defaultValue;
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var optionTags = [];
      var _this$props2 = this.props,
        options = _this$props2.options,
        placeholder = _this$props2.placeholder,
        column = _this$props2.column,
        withoutEmptyOption = _this$props2.withoutEmptyOption;
      if (!withoutEmptyOption) {
        optionTags.push( /*#__PURE__*/_react["default"].createElement("option", {
          key: "-1",
          value: ""
        }, placeholder || "Select ".concat(column.text, "...")));
      }
      Object.keys(options).forEach(function (key) {
        return optionTags.push( /*#__PURE__*/_react["default"].createElement("option", {
          key: key,
          value: key
        }, options[key]));
      });
      return optionTags;
    }
  }, {
    key: "cleanFiltered",
    value: function cleanFiltered() {
      var value = this.props.defaultValue !== undefined ? this.props.defaultValue : [];
      this.selectInput.value = value;
      this.applyFilter(value);
    }
  }, {
    key: "applyFilter",
    value: function applyFilter(value) {
      if (value.length === 1 && value[0] === '') {
        value = [];
      }
      this.setState(function () {
        return {
          isSelected: value.length > 0
        };
      });
      this.props.onFilter(this.props.column, _const.FILTER_TYPE.MULTISELECT)(value);
    }
  }, {
    key: "filter",
    value: function filter(e) {
      var value = getSelections(e.target);
      this.applyFilter(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props3 = this.props,
        id = _this$props3.id,
        style = _this$props3.style,
        className = _this$props3.className,
        filterState = _this$props3.filterState,
        defaultValue = _this$props3.defaultValue,
        onFilter = _this$props3.onFilter,
        column = _this$props3.column,
        options = _this$props3.options,
        comparator = _this$props3.comparator,
        withoutEmptyOption = _this$props3.withoutEmptyOption,
        caseSensitive = _this$props3.caseSensitive,
        getFilter = _this$props3.getFilter,
        rest = _objectWithoutProperties(_this$props3, _excluded);
      var selectClass = "filter select-filter form-control ".concat(className, " ").concat(this.state.isSelected ? '' : 'placeholder-selected');
      var elmId = "multiselect-filter-column-".concat(column.dataField).concat(id ? "-".concat(id) : '');
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
        multiple: true,
        className: selectClass,
        onChange: this.filter,
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        defaultValue: this.getDefaultValue()
      }), this.getOptions()));
    }
  }]);
  return MultiSelectFilter;
}(_react.Component);
MultiSelectFilter.propTypes = {
  onFilter: _propTypes["default"].func.isRequired,
  column: _propTypes["default"].object.isRequired,
  options: _propTypes["default"].object.isRequired,
  id: _propTypes["default"].string,
  filterState: _propTypes["default"].object,
  comparator: _propTypes["default"].oneOf([_comparison.LIKE, _comparison.EQ]),
  placeholder: _propTypes["default"].string,
  style: _propTypes["default"].object,
  className: _propTypes["default"].string,
  withoutEmptyOption: _propTypes["default"].bool,
  defaultValue: _propTypes["default"].array,
  caseSensitive: _propTypes["default"].bool,
  getFilter: _propTypes["default"].func
};
MultiSelectFilter.defaultProps = {
  defaultValue: [],
  filterState: {},
  className: '',
  withoutEmptyOption: false,
  comparator: _comparison.EQ,
  caseSensitive: true,
  id: null
};
var _default = MultiSelectFilter;
exports["default"] = _default;