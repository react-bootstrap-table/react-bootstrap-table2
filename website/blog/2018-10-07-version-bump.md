---
title: New Release (2018-10-07)
author: Allen Fang
authorURL: https://twitter.com/allenfang_tw
---

## Changed Packages

This release bump following packages:

* `react-bootstrap-table-next@1.2.1`
* `react-bootstrap-table2-paginator@1.0.3`
* `react-bootstrap-table2-toolkit@1.1.1`


## Changelog

### Bug fixes
* Fixed remote search bug([#591](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/591))
* Fixed wrong calculation for `from` and `to` in pagination when remote search/filter enable and data is shrink below the current page([#594](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/594))

### Features
* Implement `column.sortCaret`([#593](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/593)) for customing the sort caret

### Enhancements
* Easy to access the exposed API from react `ref`([#592](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/592))
