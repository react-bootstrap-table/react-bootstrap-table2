"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
var _default = function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    searchFormatted: false,
    afterSearch: null,
    onColumnMatch: null
  };
  return function (_, isRemoteSearch, handleRemoteSearchChange) {
    var SearchContext = /*#__PURE__*/_react["default"].createContext();
    var SearchProvider = /*#__PURE__*/function (_React$Component) {
      _inherits(SearchProvider, _React$Component);
      var _super = _createSuper(SearchProvider);
      function SearchProvider(props) {
        var _this;
        _classCallCheck(this, SearchProvider);
        _this = _super.call(this, props);
        var initialData = props.data;
        if (isRemoteSearch() && _this.props.searchText !== '') {
          handleRemoteSearchChange(_this.props.searchText);
        } else {
          initialData = _this.search(props);
          _this.triggerListener(initialData, true);
        }
        _this.state = {
          data: initialData
        };
        return _this;
      }
      _createClass(SearchProvider, [{
        key: "getSearched",
        value: function getSearched() {
          return this.state.data;
        }
      }, {
        key: "triggerListener",
        value: function triggerListener(result, skipInit) {
          if (options.afterSearch && !skipInit) {
            options.afterSearch(result);
          }
          if (this.props.dataChangeListener) {
            this.props.dataChangeListener.emit('filterChanged', result.length);
          }
        }
      }, {
        key: "UNSAFE_componentWillReceiveProps",
        value: function UNSAFE_componentWillReceiveProps(nextProps) {
          if (nextProps.searchText !== this.props.searchText) {
            if (isRemoteSearch()) {
              handleRemoteSearchChange(nextProps.searchText);
            } else {
              var result = this.search(nextProps);
              this.triggerListener(result);
              this.setState({
                data: result
              });
            }
          } else {
            if (isRemoteSearch()) {
              this.setState({
                data: nextProps.data
              });
            } else if (!_.isEqual(nextProps.data, this.props.data)) {
              var _result = this.search(nextProps);
              this.triggerListener(_result);
              this.setState({
                data: _result
              });
            }
          }
        }
      }, {
        key: "search",
        value: function search(props) {
          var data = props.data,
            columns = props.columns;
          var searchText = props.searchText.toLowerCase();
          return data.filter(function (row, ridx) {
            for (var cidx = 0; cidx < columns.length; cidx += 1) {
              var column = columns[cidx];
              if (column.searchable === false) continue;
              var targetValue = _.get(row, column.dataField);
              if (column.formatter && options.searchFormatted) {
                targetValue = column.formatter(targetValue, row, ridx, column.formatExtraData);
              } else if (column.filterValue) {
                targetValue = column.filterValue(targetValue, row);
              }
              if (options.onColumnMatch) {
                if (options.onColumnMatch({
                  searchText: searchText,
                  value: targetValue,
                  column: column,
                  row: row
                })) {
                  return true;
                }
              } else {
                if (targetValue !== null && typeof targetValue !== 'undefined') {
                  targetValue = targetValue.toString().toLowerCase();
                  if (targetValue.indexOf(searchText) > -1) {
                    return true;
                  }
                }
              }
            }
            return false;
          });
        }
      }, {
        key: "render",
        value: function render() {
          return /*#__PURE__*/_react["default"].createElement(SearchContext.Provider, {
            value: {
              data: this.state.data
            }
          }, this.props.children);
        }
      }]);
      return SearchProvider;
    }(_react["default"].Component);
    _defineProperty(SearchProvider, "propTypes", {
      data: _propTypes["default"].array.isRequired,
      columns: _propTypes["default"].array.isRequired,
      searchText: _propTypes["default"].string,
      dataChangeListener: _propTypes["default"].object
    });
    return {
      Provider: SearchProvider,
      Consumer: SearchContext.Consumer
    };
  };
};
exports["default"] = _default;