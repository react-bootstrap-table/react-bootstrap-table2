"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _const = _interopRequireDefault(require("../const"));

var _bootstrap = require("../contexts/bootstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SortCaret = function SortCaret(_ref) {
  var order = _ref.order;
  var orderClass = (0, _classnames["default"])('react-bootstrap-table-sort-order', {
    dropup: order === _const["default"].SORT_ASC
  });
  return /*#__PURE__*/_react["default"].createElement(_bootstrap.BootstrapContext.Consumer, null, function (_ref2) {
    var bootstrap4 = _ref2.bootstrap4;
    return bootstrap4 ? /*#__PURE__*/_react["default"].createElement("span", {
      className: "caret-4-".concat(order)
    }) : /*#__PURE__*/_react["default"].createElement("span", {
      className: orderClass
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "caret"
    }));
  });
};

SortCaret.propTypes = {
  order: _propTypes["default"].oneOf([_const["default"].SORT_ASC, _const["default"].SORT_DESC]).isRequired
};
var _default = SortCaret;
exports["default"] = _default;