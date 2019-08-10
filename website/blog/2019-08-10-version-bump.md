---
title: New Release (2019-08-10)
author: Allen Fang
authorURL: https://twitter.com/allenfang_tw
---

## Changed Packages

We got following packages version bump in this release:

* `react-bootstrap-table-next@3.1.8`
* `react-bootstrap-table2-editor@1.3.2`
* `react-bootstrap-table2-filter@1.1.11`
* `react-bootstrap-table2-paginator@2.0.9`


## Changelog

### Bug fixes
* Fixed inconsistence filter logic in custom filtering([423769c](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/423769c1349034a5988e8a94b0b5b8831fd7cc2d))
* Fixed column toggle will cancel the filter state([4de565b](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/4de565b75974eeaed581c692852bdefeb202ea0e))
* Fixed wrong type convert when column didn't have specified type([08ec8a9](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/08ec8a9f65c2a7dbb00fc54b62359472b864e00c))
* Fixed pagination elements not on same row/line([1a44ce0](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/1a44ce0ea61d90d140910b5464ae4bb9140c479c))


### Features
N/A

### Enhancements
* `column.editor.getOptions` recieve the second argument which contain `row` and `column`([856e63d](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/856e63d524736de350bd219c6c818d259cd3fed0))