"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PaginationListStandalone", {
  enumerable: true,
  get: function get() {
    return _paginationListStandalone["default"];
  }
});
exports.PaginationProvider = void 0;
Object.defineProperty(exports, "PaginationTotalStandalone", {
  enumerable: true,
  get: function get() {
    return _paginationTotalStandalone["default"];
  }
});
Object.defineProperty(exports, "SizePerPageDropdownStandalone", {
  enumerable: true,
  get: function get() {
    return _sizePerPageDropdownStandalone["default"];
  }
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _stateContext = _interopRequireDefault(require("./src/state-context"));
var _dataContext = _interopRequireDefault(require("./src/data-context"));
var _paginationListStandalone = _interopRequireDefault(require("./src/pagination-list-standalone"));
var _sizePerPageDropdownStandalone = _interopRequireDefault(require("./src/size-per-page-dropdown-standalone"));
var _paginationTotalStandalone = _interopRequireDefault(require("./src/pagination-total-standalone"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    createContext: _dataContext["default"],
    options: options
  };
};
exports["default"] = _default;
var _createBaseContext = (0, _stateContext["default"])(),
  Provider = _createBaseContext.Provider,
  Consumer = _createBaseContext.Consumer;
var CustomizableProvider = function CustomizableProvider(props) {
  return /*#__PURE__*/_react["default"].createElement(Provider, props, /*#__PURE__*/_react["default"].createElement(Consumer, null, function (paginationProps) {
    return props.children(paginationProps);
  }));
};
CustomizableProvider.propTypes = {
  children: _propTypes["default"].func.isRequired
};
var PaginationProvider = CustomizableProvider;
exports.PaginationProvider = PaginationProvider;