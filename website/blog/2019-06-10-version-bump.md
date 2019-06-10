---
title: New Release (2019-06-10)
author: Allen Fang
authorURL: https://twitter.com/allenfang_tw
---

## Changed Packages

We got following package version bump in this release:

* `react-bootstrap-table-next@3.1.4`
* `react-bootstrap-table2-editor@1.2.4`
* `react-bootstrap-table2-toolkit@2.0.1`


## Changelog

### Bug fixes
* Fixed tabindex on table headers should not be > 0([4ec02b2](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/4ec02b294afa876155088fc7140c2f13ec2b0aa2))


### Features
N/A

### Enhancements
* Allow to override the blob type of CSV([1cd31dc](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/1cd31dc54cdc310bfaf8e1e8fbf1168e8ab663b2))
	* Use `exportCSV.blobType`
* Allow to set the dropdown editor options dynamically((bbf2ef8)[https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/bbf2ef85fd1cd3f897ccfd816663f6d5559758ca])
* Allow to set selection column in the right side of table([db612ea](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/db612eaa99b67b2ee7fc89fa6e8fa720584cd8e0))
	* Use `selectRow.selectColumnPosition`
* Allow to configure the selection column's style([0d0d1a8](https://github.com/react-bootstrap-table/react-bootstrap-table2/commit/0d0d1a891326abb2b6cb19e4d2fba4f1f76e146d))
	* Use `selectRow.selectColumnStyle`