"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var Comparator = _interopRequireWildcard(require("../comparison"));
var _const = require("../const");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var legalComparators = [Comparator.EQ, Comparator.NE, Comparator.GT, Comparator.GE, Comparator.LT, Comparator.LE];
var NumberFilter = /*#__PURE__*/function (_Component) {
  _inherits(NumberFilter, _Component);
  var _super = _createSuper(NumberFilter);
  function NumberFilter(props) {
    var _this;
    _classCallCheck(this, NumberFilter);
    _this = _super.call(this, props);
    _this.comparators = props.comparators || legalComparators;
    _this.timeout = null;
    var isSelected = props.defaultValue !== undefined && props.defaultValue.number !== undefined;
    if (props.options && isSelected) {
      isSelected = props.options.indexOf(props.defaultValue.number) > -1;
    }
    _this.state = {
      isSelected: isSelected
    };
    _this.onChangeNumber = _this.onChangeNumber.bind(_assertThisInitialized(_this));
    _this.onChangeNumberSet = _this.onChangeNumberSet.bind(_assertThisInitialized(_this));
    _this.onChangeComparator = _this.onChangeComparator.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(NumberFilter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      var _this$props = this.props,
        column = _this$props.column,
        onFilter = _this$props.onFilter,
        getFilter = _this$props.getFilter;
      var comparator = this.numberFilterComparator.value;
      var number = this.numberFilter.value;
      if (comparator && number) {
        onFilter(column, _const.FILTER_TYPE.NUMBER, true)({
          number: number,
          comparator: comparator
        });
      }

      // export onFilter function to allow users to access
      if (getFilter) {
        getFilter(function (filterVal) {
          _this2.setState(function () {
            return {
              isSelected: filterVal !== ''
            };
          });
          _this2.numberFilterComparator.value = filterVal.comparator;
          _this2.numberFilter.value = filterVal.number;
          onFilter(column, _const.FILTER_TYPE.NUMBER)({
            number: filterVal.number,
            comparator: filterVal.comparator
          });
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: "onChangeNumber",
    value: function onChangeNumber(e) {
      var _this$props2 = this.props,
        delay = _this$props2.delay,
        column = _this$props2.column,
        onFilter = _this$props2.onFilter;
      var comparator = this.numberFilterComparator.value;
      if (comparator === '') {
        return;
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      var filterValue = e.target.value;
      this.timeout = setTimeout(function () {
        onFilter(column, _const.FILTER_TYPE.NUMBER)({
          number: filterValue,
          comparator: comparator
        });
      }, delay);
    }
  }, {
    key: "onChangeNumberSet",
    value: function onChangeNumberSet(e) {
      var _this$props3 = this.props,
        column = _this$props3.column,
        onFilter = _this$props3.onFilter;
      var comparator = this.numberFilterComparator.value;
      var value = e.target.value;
      this.setState(function () {
        return {
          isSelected: value !== ''
        };
      });
      // if (comparator === '') {
      //   return;
      // }
      onFilter(column, _const.FILTER_TYPE.NUMBER)({
        number: value,
        comparator: comparator
      });
    }
  }, {
    key: "onChangeComparator",
    value: function onChangeComparator(e) {
      var _this$props4 = this.props,
        column = _this$props4.column,
        onFilter = _this$props4.onFilter;
      var value = this.numberFilter.value;
      var comparator = e.target.value;
      // if (value === '') {
      //   return;
      // }
      onFilter(column, _const.FILTER_TYPE.NUMBER)({
        number: value,
        comparator: comparator
      });
    }
  }, {
    key: "getDefaultComparator",
    value: function getDefaultComparator() {
      var _this$props5 = this.props,
        defaultValue = _this$props5.defaultValue,
        filterState = _this$props5.filterState;
      if (filterState && filterState.filterVal) {
        return filterState.filterVal.comparator;
      }
      if (defaultValue && defaultValue.comparator) {
        return defaultValue.comparator;
      }
      return '';
    }
  }, {
    key: "getDefaultValue",
    value: function getDefaultValue() {
      var _this$props6 = this.props,
        defaultValue = _this$props6.defaultValue,
        filterState = _this$props6.filterState;
      if (filterState && filterState.filterVal) {
        return filterState.filterVal.number;
      }
      if (defaultValue && defaultValue.number) {
        return defaultValue.number;
      }
      return '';
    }
  }, {
    key: "getComparatorOptions",
    value: function getComparatorOptions() {
      var optionTags = [];
      var withoutEmptyComparatorOption = this.props.withoutEmptyComparatorOption;
      if (!withoutEmptyComparatorOption) {
        optionTags.push( /*#__PURE__*/_react["default"].createElement("option", {
          key: "-1"
        }));
      }
      for (var i = 0; i < this.comparators.length; i += 1) {
        optionTags.push( /*#__PURE__*/_react["default"].createElement("option", {
          key: i,
          value: this.comparators[i]
        }, this.comparators[i]));
      }
      return optionTags;
    }
  }, {
    key: "getNumberOptions",
    value: function getNumberOptions() {
      var optionTags = [];
      var _this$props7 = this.props,
        options = _this$props7.options,
        column = _this$props7.column,
        withoutEmptyNumberOption = _this$props7.withoutEmptyNumberOption;
      if (!withoutEmptyNumberOption) {
        optionTags.push( /*#__PURE__*/_react["default"].createElement("option", {
          key: "-1",
          value: ""
        }, this.props.placeholder || "Select ".concat(column.text, "...")));
      }
      for (var i = 0; i < options.length; i += 1) {
        optionTags.push( /*#__PURE__*/_react["default"].createElement("option", {
          key: i,
          value: options[i]
        }, options[i]));
      }
      return optionTags;
    }
  }, {
    key: "applyFilter",
    value: function applyFilter(filterObj) {
      var _this$props8 = this.props,
        column = _this$props8.column,
        onFilter = _this$props8.onFilter;
      var number = filterObj.number,
        comparator = filterObj.comparator;
      this.setState(function () {
        return {
          isSelected: number !== ''
        };
      });
      this.numberFilterComparator.value = comparator;
      this.numberFilter.value = number;
      onFilter(column, _const.FILTER_TYPE.NUMBER)({
        number: number,
        comparator: comparator
      });
    }
  }, {
    key: "cleanFiltered",
    value: function cleanFiltered() {
      var _this$props9 = this.props,
        column = _this$props9.column,
        onFilter = _this$props9.onFilter,
        defaultValue = _this$props9.defaultValue;
      var value = defaultValue ? defaultValue.number : '';
      var comparator = defaultValue ? defaultValue.comparator : '';
      this.setState(function () {
        return {
          isSelected: value !== ''
        };
      });
      this.numberFilterComparator.value = comparator;
      this.numberFilter.value = value;
      onFilter(column, _const.FILTER_TYPE.NUMBER)({
        number: value,
        comparator: comparator
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var isSelected = this.state.isSelected;
      var _this$props10 = this.props,
        id = _this$props10.id,
        column = _this$props10.column,
        options = _this$props10.options,
        style = _this$props10.style,
        className = _this$props10.className,
        numberStyle = _this$props10.numberStyle,
        numberClassName = _this$props10.numberClassName,
        comparatorStyle = _this$props10.comparatorStyle,
        comparatorClassName = _this$props10.comparatorClassName,
        placeholder = _this$props10.placeholder;
      var selectClass = "\n      select-filter \n      number-filter-input \n      form-control \n      ".concat(numberClassName, " \n      ").concat(!isSelected ? 'placeholder-selected' : '', "\n    ");
      var comparatorElmId = "number-filter-comparator-".concat(column.dataField).concat(id ? "-".concat(id) : '');
      var inputElmId = "number-filter-column-".concat(column.dataField).concat(id ? "-".concat(id) : '');
      return /*#__PURE__*/_react["default"].createElement("div", {
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        className: "filter number-filter ".concat(className),
        style: style
      }, /*#__PURE__*/_react["default"].createElement("label", {
        className: "filter-label",
        htmlFor: comparatorElmId
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "sr-only"
      }, "Filter comparator"), /*#__PURE__*/_react["default"].createElement("select", {
        ref: function ref(n) {
          return _this3.numberFilterComparator = n;
        },
        style: comparatorStyle,
        id: comparatorElmId,
        className: "number-filter-comparator form-control ".concat(comparatorClassName),
        onChange: this.onChangeComparator,
        defaultValue: this.getDefaultComparator()
      }, this.getComparatorOptions())), options ? /*#__PURE__*/_react["default"].createElement("label", {
        className: "filter-label",
        htmlFor: inputElmId
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "sr-only"
      }, "Select ".concat(column.text)), /*#__PURE__*/_react["default"].createElement("select", {
        ref: function ref(n) {
          return _this3.numberFilter = n;
        },
        id: inputElmId,
        style: numberStyle,
        className: selectClass,
        onChange: this.onChangeNumberSet,
        defaultValue: this.getDefaultValue()
      }, this.getNumberOptions())) : /*#__PURE__*/_react["default"].createElement("label", {
        htmlFor: inputElmId
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "sr-only"
      }, "Enter ".concat(column.text)), /*#__PURE__*/_react["default"].createElement("input", {
        ref: function ref(n) {
          return _this3.numberFilter = n;
        },
        id: inputElmId,
        type: "number",
        style: numberStyle,
        className: "number-filter-input form-control ".concat(numberClassName),
        placeholder: placeholder || "Enter ".concat(column.text, "..."),
        onChange: this.onChangeNumber,
        defaultValue: this.getDefaultValue()
      })));
    }
  }]);
  return NumberFilter;
}(_react.Component);
NumberFilter.propTypes = {
  onFilter: _propTypes["default"].func.isRequired,
  column: _propTypes["default"].object.isRequired,
  id: _propTypes["default"].string,
  filterState: _propTypes["default"].object,
  options: _propTypes["default"].arrayOf(_propTypes["default"].number),
  defaultValue: _propTypes["default"].shape({
    number: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
    comparator: _propTypes["default"].oneOf([].concat(legalComparators, ['']))
  }),
  delay: _propTypes["default"].number,
  /* eslint consistent-return: 0 */
  comparators: function comparators(props, propName) {
    if (!props[propName]) {
      return;
    }
    for (var i = 0; i < props[propName].length; i += 1) {
      var comparatorIsValid = false;
      for (var j = 0; j < legalComparators.length; j += 1) {
        if (legalComparators[j] === props[propName][i] || props[propName][i] === '') {
          comparatorIsValid = true;
          break;
        }
      }
      if (!comparatorIsValid) {
        return new Error("Number comparator provided is not supported.\n          Use only ".concat(legalComparators));
      }
    }
  },
  placeholder: _propTypes["default"].string,
  withoutEmptyComparatorOption: _propTypes["default"].bool,
  withoutEmptyNumberOption: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  className: _propTypes["default"].string,
  comparatorStyle: _propTypes["default"].object,
  comparatorClassName: _propTypes["default"].string,
  numberStyle: _propTypes["default"].object,
  numberClassName: _propTypes["default"].string,
  getFilter: _propTypes["default"].func
};
NumberFilter.defaultProps = {
  delay: _const.FILTER_DELAY,
  options: undefined,
  defaultValue: {
    number: undefined,
    comparator: ''
  },
  filterState: {},
  withoutEmptyComparatorOption: false,
  withoutEmptyNumberOption: false,
  comparators: legalComparators,
  placeholder: undefined,
  style: undefined,
  className: '',
  comparatorStyle: undefined,
  comparatorClassName: '',
  numberStyle: undefined,
  numberClassName: '',
  id: null
};
var _default = NumberFilter;
exports["default"] = _default;