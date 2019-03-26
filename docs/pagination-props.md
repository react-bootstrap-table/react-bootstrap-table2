---
id: pagination-props
title: Pagination Props
---

Following we list all props for `paginationFactory` from [`react-bootstrap-table2-paginator`](https://www.npmjs.com/package/react-bootstrap-table2-paginator).

```js
import paginationFactory from 'react-bootstrap-table2-paginator';

const pagination = paginationFactory({
  page: 2,
  ...
});

<BootstrapTable pagination={ pagination } ... />
```

## Required
**NONE**

## Optional
* [custom](#paginationcustom-bool)
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
* [showTotal](#paginationshowtotal-bool)
* [pageButtonRenderer](#paginationpagebuttonrenderer-function)
* [pageListRenderer](#paginationpagelistrenderer-function)
* [sizePerPageRenderer](#paginationsizeperpagerenderer-function)
* [sizePerPageOptionRenderer](#paginationsizeperpageoptionrenderer-function)
* [paginationTotalRenderer](#paginationpaginationtotalrenderer-function)
-----

## pagination.custom - [Bool]
Default is false, you will enable it only when you need to implement a [customization completely](./basic-pagination.html#completely-customization).


## pagination.page - [Number]
Use `pagination.page` specify the current page when table render.

> It's necessary value when [remote](./table-props.html#remote-bool-object) pagination is enabled.

## pagination.sizePerPage - [Number]
Use `pagination.sizePerPage` specify the current size per page when table render.

> It's necessary value when [remote](./table-props.html#remote-bool-object) pagination is enabled.

## pagination.totalSize - [Number]
This props will be necessary value for below two cases:

### remote mode

Because `react-bootstrap-table2` will never know the totally data size actually. Remeber to assign `totalSize` when you enable the remote pagination.

### Customization
When you need to implement a [customization completely](./basic-pagination.html#completely-customization). You have to give props.


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
If you also enable `withFirstAndLast`, this prop also keep to show first and last page when you enable it.

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
You can hide the size per page dropdown.

## pagination.hidePageListOnlyOnePage - [Bool]
You can hide the pagination when there's only one page in table. Default is `false`.

## pagination.showTotal - [Bool]
Default is `false`, if enable will display a text to indicate the row range of current page.

## pagination.pageButtonRenderer - [Function]
Custom the page button inside the pagination list. This callback function have one argument which is an object and contain following props:

* `page`: Page number
* `active`: If this page is current page or not.
* `disabled`: If this page is disabled or not.
* `title`: Page title
* `onPageChange`: Call it when you need to change page

Following is a minimal example:
```js
const pageButtonRenderer = ({
  page,
  active,
  disabled,
  title,
  onPageChange
}) => {
  const handleClick = (e) => {
    e.preventDefault();
    onPageChange(page);
  };
  // ....
  return (
    <li className="page-item">
      <a href="#" onClick={ handleClick } ....>{ page }</a>
    </li>
  );
};

const options = {
  pageButtonRenderer
};

<BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
```


## pagination.pageListRenderer - [Function]
Custom the pagination list component, this callback function have one argument which is an object and contain following props:

* `pages`: Current page
* `onPageChange`: Call it when you need to change page

Below is a minimal example: 
```js
const pageListRenderer = ({
  pages,
  onPageChange
}) => {
  // just exclude <, <<, >>, >
  const pageWithoutIndication = pages.filter(p => typeof p.page !== 'string');
  return (
    <div>
      {
        pageWithoutIndication.map(p => (
          <button className="btn btn-success" onClick={ () => onPageChange(p.page) }>{ p.page }</button>
        ))
      }
    </div>
  );
};

const options = {
  pageListRenderer
};

<BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
```

## pagination.sizePerPageRenderer - [Function]
Custom the size per page dropdown component, this callback function have one argument which is an object and contain following props:

* `options`: Dropdown option.
* `currSizePerPage`: Current size per page.
* `onSizePerPageChange`: Call it when you need to change size per page.


Below is a minimal example: 
```js
const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange
}) => (
  <div className="btn-group" role="group">
    {
      options.map(option => (
        <button
          key={ option.text }
          type="button"
          onClick={ () => onSizePerPageChange(option.page) }
          className={ `btn ${currSizePerPage === `${option.page}` ? 'btn-secondary' : 'btn-warning'}` }
        >
          { option.text }
        </button>
      ))
    }
  </div>
);

const options = {
  sizePerPageRenderer
};

<BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
```

## pagination.sizePerPageOptionRenderer - [Function]
Custom the option of size per page dropdown component, this callback function have one argument which is an object and contain following props:

* `text`: The text of option.
* `page`: The size per page of option.
* `onSizePerPageChange`: Call it when you need to change size per page.

Below is a minimal example: 
```js
const sizePerPageOptionRenderer = ({
  text,
  page,
  onSizePerPageChange
}) => (
  <li
    key={ text }
    role="presentation"
    className="dropdown-item"
  >
    <a
      href="#"
      tabIndex="-1"
      role="menuitem"
      data-page={ page }
      onMouseDown={ (e) => {
        e.preventDefault();
        onSizePerPageChange(page);
      } }
      style={ { color: 'red' } }
    >
      { text }
    </a>
  </li>
);

const options = {
  sizePerPageOptionRenderer
};

<BootstrapTable keyField="id" data={ products } columns={ columns } pagination={ paginationFactory(options) } />
```

## pagination.paginationTotalRenderer - [Function]
Custom the total information, this callbacok function have three arguments: `from`, `to` and `size`. Following is an example:

```js
const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing { from } to { to } of { size } Results
  </span>
);
```

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