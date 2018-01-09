---
id: pagination-props
title: Pagination Props
---

## Required
**NONE**

## Optional
* [page](#paginationpage-number)
* [sizePerPage](#paginationsizeperpage-number)
* [totalSize](#paginationtotalsize-number)
* [pageStartIndex](#paginationpagestartindex-number)
* [paginationSize](#paginationpaginationsize-number)
* [sizePerPageList](#paginationsizeperpagelist-array)
* [withFirstAndLast](#paginationwithfirstandlast-bool)
* [alwaysShowAllBtns](#paginationalwaysshowallbtns-bool)
* [firstPageText](#paginationfirstpagetext-any)
* [prePageText](#paginationprepagetext-any)
* [nextPageText](#paginationnextpagetext-any)
* [lastPageText](#paginationlastpagetext-any)
* [firstPageTitle](#paginationfirstpagetitle-any)
* [prePageTitle](#paginationprepagetitle-any)
* [nextPageTitle](#paginationnextpagetitle-any)
* [lastPageTitle](#paginationlastpagetitle-any)
* [hideSizePerPage](#paginationhidesizeperpage-bool)
* [hidePageListOnlyOnePage](#paginationhidepagelistonlyonepage-bool)
* [onPageChange](#paginationonpagechange-function)
* [onSizePerPageChange](#paginationonsizeperpagechange-function)
-----

## pagination.page - [Number]
Use `pagination.page` specify the current page when table render.

> It's necessary value when [remote](./table-props.html#remote-bool-object) pagination is enabled.

## pagination.sizePerPage - [Number]
Use `pagination.sizePerPage` specify the current size per page when table render.

> It's necessary value when [remote](./table-props.html#remote-bool-object) pagination is enabled.

## pagination.totalSize - [Number]
It's only work for [remote](./table-props.html#remote-bool-object) mode, because `react-bootstrap-table2` will never know the totally data size actually. Remeber to assign `totalSize` when you enable the remote pagination.

## pagination.pageStartIndex - [Number]
Default is **1**, which means the first page index is start from 1. If your first page want to start from **0**, you can control it via `pageStartIndex`.

## pagination.paginationSize - [Number]
Default is **5**, which means the size of pagination.

## pagination.sizePerPageList - [Array]
Default size per page have **10**, **25**, **30**, **50**. You can assign a number of array to replace this default list. However, `sizePerPageList` is flexible to let you decide the text display on the dropdown list:

```js
[ {
  text: '5th', value: 5
}, {
  text: '10th', value: 10
}, {
  text: 'All', value: data.length
} ]
```

## pagination.withFirstAndLast - [Bool]
Default is `true`, you can disable it if you don't want to show the **"Go to first"** and **"Go to last"** page buttons.

## pagination.alwaysShowAllBtns - [Bool]
Default is `false`, which means `react-bootstrap-table2` will hide the next or previouse page button if unnecessary. Anyway, you can still show them always via `alwaysShowAllBtns` prop.

## pagination.firstPageText - [Any]
A quick way to specify the text on the first page button.

## pagination.prePageText - [Any]
A quick way to specify the text on the previous page button.

## pagination.nextPageText - [Any]
A quick way to specify the text on the next page button.

## pagination.lastPageText - [Any]
A quick way to specify the text on the last page button.

## pagination.firstPageTitle - [Any]
A quick way to specify the title on the first page button.

## pagination.prePageTitle - [Any]
A quick way to specify the title on the previous page button.

## pagination.nextPageTitle - [Any]
A quick way to specify the title on the next page button.

## pagination.lastPageTitle - [Any]
A quick way to specify the title on the last page button.

## pagination.hideSizePerPage - [Bool]
You can hide it :)

## pagination.hidePageListOnlyOnePage - [Bool]
You can hide the pagination when there's only one page in table. Default is `false`.

## pagination.onPageChange - [Function]
Accept a callback function and will be called when page changed. This callback function get below arguments:

**Arguments**
* page
* sizePerPage

## pagination.onSizePerPageChange - [Function]
Accept a callback function and will be called when size per page changed. This callback function get below arguments:

**Arguments**
* page
* sizePerPage