"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _pageResolver2 = _interopRequireDefault(require("./page-resolver"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
var _default = function _default(WrappedComponent) {
  return /*#__PURE__*/function (_pageResolver) {
    _inherits(PaginationHandler, _pageResolver);
    var _super = _createSuper(PaginationHandler);
    function PaginationHandler(props) {
      var _this;
      _classCallCheck(this, PaginationHandler);
      _this = _super.call(this, props);
      _this.handleChangePage = _this.handleChangePage.bind(_assertThisInitialized(_this));
      _this.handleChangeSizePerPage = _this.handleChangeSizePerPage.bind(_assertThisInitialized(_this));
      _this.state = _this.initialState();
      return _this;
    }
    _createClass(PaginationHandler, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        var dataSize = nextProps.dataSize,
          currSizePerPage = nextProps.currSizePerPage;
        if (currSizePerPage !== this.props.currSizePerPage || dataSize !== this.props.dataSize) {
          var totalPages = this.calculateTotalPage(currSizePerPage, dataSize);
          var lastPage = this.calculateLastPage(totalPages);
          this.setState({
            totalPages: totalPages,
            lastPage: lastPage
          });
        }
      }
    }, {
      key: "handleChangeSizePerPage",
      value: function handleChangeSizePerPage(sizePerPage) {
        var _this$props = this.props,
          currSizePerPage = _this$props.currSizePerPage,
          onSizePerPageChange = _this$props.onSizePerPageChange;
        var selectedSize = typeof sizePerPage === 'string' ? parseInt(sizePerPage, 10) : sizePerPage;
        var currPage = this.props.currPage;
        if (selectedSize !== currSizePerPage) {
          var newTotalPages = this.calculateTotalPage(selectedSize);
          var newLastPage = this.calculateLastPage(newTotalPages);
          if (currPage > newLastPage) currPage = newLastPage;
          onSizePerPageChange(selectedSize, currPage);
        }
      }
    }, {
      key: "handleChangePage",
      value: function handleChangePage(newPage) {
        var page;
        var _this$props2 = this.props,
          currPage = _this$props2.currPage,
          pageStartIndex = _this$props2.pageStartIndex,
          prePageText = _this$props2.prePageText,
          nextPageText = _this$props2.nextPageText,
          lastPageText = _this$props2.lastPageText,
          firstPageText = _this$props2.firstPageText,
          onPageChange = _this$props2.onPageChange;
        var lastPage = this.state.lastPage;
        if (newPage === prePageText) {
          page = this.backToPrevPage();
        } else if (newPage === nextPageText) {
          page = currPage + 1 > lastPage ? lastPage : currPage + 1;
        } else if (newPage === lastPageText) {
          page = lastPage;
        } else if (newPage === firstPageText) {
          page = pageStartIndex;
        } else {
          page = parseInt(newPage, 10);
        }
        if (page !== currPage) {
          onPageChange(page);
        }
      }
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react["default"].createElement(WrappedComponent, _extends({}, this.props, {
          lastPage: this.state.lastPage,
          totalPages: this.state.totalPages,
          onPageChange: this.handleChangePage,
          onSizePerPageChange: this.handleChangeSizePerPage
        }));
      }
    }]);
    return PaginationHandler;
  }((0, _pageResolver2["default"])(_react.Component));
};
exports["default"] = _default;