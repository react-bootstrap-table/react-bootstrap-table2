---
title: New Release (2018-09-03)
author: Allen Fang
authorURL: https://twitter.com/allenfang_tw
---

## Changed Packages

This release bump following packages:

* `react-bootstrap-table-next@1.1.4`
* `react-bootstrap-table2-editor@1.0.1`
* `react-bootstrap-table2-toolkit@1.0.3`


## Changelog

### Bug fixes
* Fixed `selectRow.onSelectAll` will return `undefined` value after search([#509](https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/509))

### Features
* Support dummy column([#520](https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/520))
	* Enable it via `column.isDummyField`
* Able to export csv by current selected rows([#522](https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/522))

### Enhancements
* Add `onStartEdit` callback which will be called when cell editor is trigger([#523](https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/523))
