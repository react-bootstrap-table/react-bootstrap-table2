"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _rowExpandContext = _interopRequireDefault(require("../contexts/row-expand-context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = function _default(Component) {
  return function () {
    return /*#__PURE__*/_react["default"].createElement(_rowExpandContext["default"].Consumer, null, function (expandRow) {
      return /*#__PURE__*/_react["default"].createElement(Component, expandRow);
    });
  };
};

exports["default"] = _default;