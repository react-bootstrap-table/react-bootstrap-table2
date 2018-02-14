---
title: New Release (2018-02-14)
author: Allen Fang
authorURL: https://twitter.com/allenfang_tw
---

## Changed Packages

This release bump following packages:

* `react-bootstrap-table-next@0.1.3`
* `react-bootstrap-table-filter@0.1.3`

## Changelog

### Bug fixes
* Fixed TextFilter contains an input of type text with both value and defaultValue props([a0af964](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/a0af964d76c3643c212a81c68e91970afd16d536))

### Features
* Support Number Filter([#200](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/200))
* Support `caseSensitive` on Text and Select filter([#201](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/201))
* Support sort event listener([#202](https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/202))

### Enhancements
* Text Filter right now is case insensitive which same as `react-bootstrap-table`[#201](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/201)
* `rowEvents.onClick` will be wrapped so that funcation can recieve additional informatnion like: `row` and `rowIndex`([#187](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/187))