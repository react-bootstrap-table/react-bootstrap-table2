---
title: New Release (2019-01-06)
author: Allen Fang
authorURL: https://twitter.com/allenfang_tw
---

## Changed Packages

We got following package version bump in this release:

* `react-bootstrap-table-next@2.0.1`
* `react-bootstrap-table2-filter@1.1.1`
* `react-bootstrap-table2-paginator@2.0.1`
* `react-bootstrap-table2-toolkit@1.1.2`

## Changelog

### Bug fixes
* Fixed export csv error (TypeError: this.visibleRows is not a function)([#745](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/745))
* Fixed typeError happened on export CSV after js file compression([#745](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/745))
* Fixed column header hides but not columnBody or columnData([#741](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/741))
* Fixed props type mismatch for SizePerPageOption component([#742](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/742))

### Features
N/A

### Enhancements
* Support render expand column at the right side([#746](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/746))
* Support `column.onFilter` hook function([#743](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/743))