---
title: New Release (2018-02-02)
author: Allen Fang
authorURL: https://twitter.com/allenfang_tw
---

## Changed Packages

This release bump following packages:

* `react-bootstrap-table-next@0.1.2`
* `react-bootstrap-table2-filter@0.1.2`

## Changelog

### Bug fixes
* Fixed call `selectRow.onSelect` twice([#180](https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/180)) 
* Fixed wrong colSpan for `noDataIndication` if there are column is hidden([#185](https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/185))

### Features
* Support Select Filter([#183](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/183))

### Enhancements
* Column filter style improvement([#183](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/183))
  * Remember to add the css of `react-bootstrap-table2-filter`
* Fix key field in cell should not be cell value([#172](https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/172))