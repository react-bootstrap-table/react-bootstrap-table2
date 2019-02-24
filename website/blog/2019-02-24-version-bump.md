---
title: New Release (2019-02-24)
author: Allen Fang
authorURL: https://twitter.com/allenfang_tw
---

## Changed Packages

We got following package version bump in this release:

* `react-bootstrap-table-next@3.0.0`
* `react-bootstrap-table2-filter@1.1.5`
* `react-bootstrap-table2-toolkit@1.3.1`

## Changelog

### Bug fixes
* Fixed cell didn't rerender correctly when `column.formatter` defined and use `row` inside the `column.formatter` function.([bf0c5c4](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/818/commits/bf0c5c43a2e88ea1fa38c8d5f3e8fcedae53f528))
* Fixed selection broken when call `setState` in `selectRow.onSelect`([c01f45a](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/818/commits/c01f45a719702ad44a3b22c70291927962e7eee0))
* Fixed search and filter perform a abnormal behavor([#811](https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/811))

### Features
N/A

### Enhancements
* Allow to add custom className on Export CSV and Clear Search button([09f21e8](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/818/commits/09f21e81303e37ae1f1a12aeacaae237ee3fac2c))
* Allow to operate on cell editing context via reacr `refs`([#815](https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/815))