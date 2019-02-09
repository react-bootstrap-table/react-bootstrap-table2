---
title: New Release (2019-02-09)
author: Allen Fang
authorURL: https://twitter.com/allenfang_tw
---

## Changed Packages

We got following package version bump in this release:

* `react-bootstrap-table-next@2.1.1`
* `react-bootstrap-table2-filter@1.1.3`
* `react-bootstrap-table2-toolkit@1.2.1`
* `react-bootstrap-table2-paginator@2.0.2`

## Changelog

### Bug fixes
* Fixed Standalone Pagination render wrong page list when user do the filter or search([cf043c6](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/790/commits/ecea3efdaa1757d85596cdde64d6827fbcf043c6), [63c2630](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/790/commits/63c2630f46959df7d867ad8d9f62331aa52e4fb4), [cacc28e](https://github.com/react-bootstrap-table/react-bootstrap-table2/pull/790/commits/cacc28e1bc6c8e96dfaf38c40874278fba5abf21))
* Fixed Controlled input element lose focus on re-render inside expanded rows([8bef7eb](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/8bef7eb34861ca6ef0bc37c5774239f237a922fc))

### Features
N/A

### Enhancements
* Allow to return a custom filter results from `onFilter`([aafbc7e](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/8b89b3de0e1e8554db7b1c3d9d115af0daafbc7e))