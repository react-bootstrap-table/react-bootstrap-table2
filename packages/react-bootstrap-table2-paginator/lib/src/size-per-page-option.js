"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SizePerPageOption = function SizePerPageOption(_ref) {
  var text = _ref.text,
      page = _ref.page,
      onSizePerPageChange = _ref.onSizePerPageChange,
      bootstrap4 = _ref.bootstrap4;
  return bootstrap4 ? /*#__PURE__*/_react["default"].createElement("a", {
    href: "#",
    tabIndex: "-1",
    role: "menuitem",
    className: "dropdown-item",
    "data-page": page,
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
      onSizePerPageChange(page);
    }
  }, text) : /*#__PURE__*/_react["default"].createElement("li", {
    key: text,
    role: "presentation",
    className: "dropdown-item"
  }, /*#__PURE__*/_react["default"].createElement("a", {
    href: "#",
    tabIndex: "-1",
    role: "menuitem",
    "data-page": page,
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();
      onSizePerPageChange(page);
    }
  }, text));
};

SizePerPageOption.propTypes = {
  text: _propTypes["default"].string.isRequired,
  page: _propTypes["default"].number.isRequired,
  onSizePerPageChange: _propTypes["default"].func.isRequired,
  bootstrap4: _propTypes["default"].bool
};
SizePerPageOption.defaultProps = {
  bootstrap4: false
};
var _default = SizePerPageOption;
exports["default"] = _default;