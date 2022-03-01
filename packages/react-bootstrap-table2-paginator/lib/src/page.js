"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getByCurrPage = exports.alignPage = void 0;

var _const = _interopRequireDefault(require("./const"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getNormalizedPage = function getNormalizedPage(page, pageStartIndex) {
  var offset = Math.abs(1 - pageStartIndex);
  return page + offset;
};

var endIndex = function endIndex(page, sizePerPage, pageStartIndex) {
  return getNormalizedPage(page, pageStartIndex) * sizePerPage - 1;
};

var startIndex = function startIndex(end, sizePerPage) {
  return end - (sizePerPage - 1);
};

var alignPage = function alignPage(dataSize, prevDataSize, page, sizePerPage, pageStartIndex) {
  if (prevDataSize < dataSize) return page;
  if (page < pageStartIndex) return pageStartIndex;
  if (dataSize <= 0) return pageStartIndex;

  if (page >= Math.floor(dataSize / sizePerPage) + pageStartIndex && pageStartIndex === 1) {
    return Math.ceil(dataSize / sizePerPage);
  }

  if (page >= Math.floor(dataSize / sizePerPage) && pageStartIndex === 0) {
    var newPage = Math.ceil(dataSize / sizePerPage);
    return newPage - Math.abs(_const["default"].PAGE_START_INDEX - pageStartIndex);
  }

  return page;
};

exports.alignPage = alignPage;

var getByCurrPage = function getByCurrPage(data, page, sizePerPage, pageStartIndex) {
  var dataSize = data.length;
  if (!dataSize) return [];
  var end = endIndex(page, sizePerPage, pageStartIndex);
  var start = startIndex(end, sizePerPage);
  var result = [];

  for (var i = start; i <= end; i += 1) {
    result.push(data[i]);
    if (i + 1 === dataSize) break;
  }

  return result;
};

exports.getByCurrPage = getByCurrPage;