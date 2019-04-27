---
title: New Release (2019-04-27)
author: Allen Fang
authorURL: https://twitter.com/allenfang_tw
---

## Changed Packages

We got following package version bump in this release:

* `react-bootstrap-table-next@3.1.2`
* `react-bootstrap-table2-toolkit@1.4.2`


## Changelog

### Bug fixes
* Fix rendering searchbar will throw `tableId` prop type warning([#914](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/914)) 
* Fix `expandRow` does not work with nested `keyField`([36fa9b8](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/36fa9b8630b24f3628113a37be1c6306b5f1018c))
* Fix CSV Export doesn't handle double quotes([737922a](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/737922a5a4b0b613571d30077fb2ac434a2e0b2f))
* Fix `column.onClick` some parameters is `undefined` if `column.editable` is true([6168bd7](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/6168bd7532524edfa8d59b034bbccd5f7328ca55))

### Features
N/A

### Enhancements
* Allow to custom the style on selection header cell via `selectRow.headerColumnStyle`([0f37fae](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/0f37fae23d9c038299de7a1f17b08f91fcabc4da))