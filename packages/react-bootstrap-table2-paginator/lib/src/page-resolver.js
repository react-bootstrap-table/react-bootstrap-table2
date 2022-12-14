"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _const = _interopRequireDefault(require("./const"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
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
var _default = function _default(ExtendBase) {
  return /*#__PURE__*/function (_ExtendBase) {
    _inherits(PageResolver, _ExtendBase);
    var _super = _createSuper(PageResolver);
    function PageResolver() {
      _classCallCheck(this, PageResolver);
      return _super.apply(this, arguments);
    }
    _createClass(PageResolver, [{
      key: "backToPrevPage",
      value: function backToPrevPage() {
        var _this$props = this.props,
          currPage = _this$props.currPage,
          pageStartIndex = _this$props.pageStartIndex;
        return currPage - 1 < pageStartIndex ? pageStartIndex : currPage - 1;
      }
    }, {
      key: "initialState",
      value: function initialState() {
        var totalPages = this.calculateTotalPage();
        var lastPage = this.calculateLastPage(totalPages);
        return {
          totalPages: totalPages,
          lastPage: lastPage
        };
      }
    }, {
      key: "calculateTotalPage",
      value: function calculateTotalPage() {
        var sizePerPage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.currSizePerPage;
        var dataSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.dataSize;
        return Math.ceil(dataSize / sizePerPage);
      }
    }, {
      key: "calculateLastPage",
      value: function calculateLastPage(totalPages) {
        var pageStartIndex = this.props.pageStartIndex;
        return pageStartIndex + totalPages - 1;
      }
    }, {
      key: "calculateFromTo",
      value: function calculateFromTo() {
        var _this$props2 = this.props,
          dataSize = _this$props2.dataSize,
          currPage = _this$props2.currPage,
          currSizePerPage = _this$props2.currSizePerPage,
          pageStartIndex = _this$props2.pageStartIndex;
        var offset = Math.abs(_const["default"].PAGE_START_INDEX - pageStartIndex);
        var from = (currPage - pageStartIndex) * currSizePerPage;
        from = dataSize === 0 ? 0 : from + 1;
        var to = Math.min(currSizePerPage * (currPage + offset), dataSize);
        if (to > dataSize) to = dataSize;
        return [from, to];
      }
    }, {
      key: "calculatePages",
      value: function calculatePages(totalPages, lastPage) {
        var _this$props3 = this.props,
          currPage = _this$props3.currPage,
          paginationSize = _this$props3.paginationSize,
          pageStartIndex = _this$props3.pageStartIndex,
          withFirstAndLast = _this$props3.withFirstAndLast,
          firstPageText = _this$props3.firstPageText,
          prePageText = _this$props3.prePageText,
          nextPageText = _this$props3.nextPageText,
          lastPageText = _this$props3.lastPageText,
          alwaysShowAllBtns = _this$props3.alwaysShowAllBtns;
        var pages = [];
        var endPage = totalPages;
        if (endPage <= 0) return [];
        var startPage = Math.max(currPage - Math.floor(paginationSize / 2), pageStartIndex);
        endPage = startPage + paginationSize - 1;
        if (endPage > lastPage) {
          endPage = lastPage;
          startPage = endPage - paginationSize + 1;
        }
        if (alwaysShowAllBtns) {
          if (withFirstAndLast) {
            pages = [firstPageText, prePageText];
          } else {
            pages = [prePageText];
          }
        }
        if (startPage !== pageStartIndex && totalPages > paginationSize && withFirstAndLast && pages.length === 0) {
          pages = [firstPageText, prePageText];
        } else if (totalPages > 1 && pages.length === 0) {
          pages = [prePageText];
        }
        for (var i = startPage; i <= endPage; i += 1) {
          if (i >= pageStartIndex) pages.push(i);
        }
        if (alwaysShowAllBtns || endPage <= lastPage && pages.length > 1) {
          pages.push(nextPageText);
        }
        if (endPage !== lastPage && withFirstAndLast || withFirstAndLast && alwaysShowAllBtns) {
          pages.push(lastPageText);
        }

        // if ((endPage <= lastPage && pages.length > 1) || alwaysShowAllBtns) {
        //   pages.push(nextPageText);
        // }
        // if (endPage !== lastPage && withFirstAndLast) {
        //   pages.push(lastPageText);
        // }

        return pages;
      }
    }, {
      key: "calculatePageStatus",
      value: function calculatePageStatus() {
        var _this = this;
        var pages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var lastPage = arguments.length > 1 ? arguments[1] : undefined;
        var disablePageTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _this$props4 = this.props,
          currPage = _this$props4.currPage,
          pageStartIndex = _this$props4.pageStartIndex,
          firstPageText = _this$props4.firstPageText,
          prePageText = _this$props4.prePageText,
          nextPageText = _this$props4.nextPageText,
          lastPageText = _this$props4.lastPageText,
          alwaysShowAllBtns = _this$props4.alwaysShowAllBtns;
        var isStart = function isStart(page) {
          return currPage === pageStartIndex && (page === firstPageText || page === prePageText);
        };
        var isEnd = function isEnd(page) {
          return currPage === lastPage && (page === nextPageText || page === lastPageText);
        };
        return pages.filter(function (page) {
          if (alwaysShowAllBtns) {
            return true;
          }
          return !(isStart(page) || isEnd(page));
        }).map(function (page) {
          var title;
          var active = page === currPage;
          var disabled = isStart(page) || isEnd(page);
          if (page === nextPageText) {
            title = _this.props.nextPageTitle;
          } else if (page === prePageText) {
            title = _this.props.prePageTitle;
          } else if (page === firstPageText) {
            title = _this.props.firstPageTitle;
          } else if (page === lastPageText) {
            title = _this.props.lastPageTitle;
          } else {
            title = "".concat(page);
          }
          var pageResult = {
            page: page,
            active: active,
            disabled: disabled
          };
          if (!disablePageTitle) {
            pageResult.title = title;
          }
          return pageResult;
        });
      }
    }, {
      key: "calculateSizePerPageStatus",
      value: function calculateSizePerPageStatus() {
        var sizePerPageList = this.props.sizePerPageList;
        return sizePerPageList.map(function (_sizePerPage) {
          var pageText = typeof _sizePerPage.text !== 'undefined' ? _sizePerPage.text : _sizePerPage;
          var pageNumber = typeof _sizePerPage.value !== 'undefined' ? _sizePerPage.value : _sizePerPage;
          return {
            text: "".concat(pageText),
            page: pageNumber
          };
        });
      }
    }]);
    return PageResolver;
  }(ExtendBase);
};
exports["default"] = _default;