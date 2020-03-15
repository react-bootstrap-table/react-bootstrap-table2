---
id: basic-pagination
title: Pagination
sidebar_label: Pagination
---

`react-bootstrap-table2` separate the pagination code base to [`react-bootstrap-table2-pagination`](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/develop/packages/react-bootstrap-table2-paginator), so there's a little bit different when you use pagination. In the following, we are going to show you how to enable and configure the a pagination table

**[Live Demo For Pagination](../storybook/index.html?selectedKind=Pagination)**   
**[API & Props Definition](./pagination-props.html)**

-----

## Install

```sh
$ npm install react-bootstrap-table2-paginator --save
```
## Add CSS

```js
// es5 
require('react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css');

// es6
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
```

## How

Let's enable a pagination on your table:

```js
import paginationFactory from 'react-bootstrap-table2-paginator';
// omit...

<BootstrapTable keyField='id' data={ products } columns={ columns } pagination={ paginationFactory() } />
```

## Customization

### Basic Customization

`react-bootstrap-table2` give some simple ways to customize something like text, styling etc, following is all the props we support for basic customization:

* [paginationSize](./pagination-props.html#paginationpaginationsize-number)
* [sizePerPageList](./pagination-props.html#paginationsizeperpagelist-array)
* [withFirstAndLast](./pagination-props.html#paginationwithfirstandlast-bool)
* [alwaysShowAllBtns](./pagination-props.html#paginationalwaysshowallbtns-bool)
* [firstPageText](./pagination-props.html#paginationfirstpagetext-any)
* [prePageText](./pagination-props.html#paginationprepagetext-any)
* [nextPageText](./pagination-props.html#paginationnextpagetext-any)
* [lastPageText](./pagination-props.html#paginationlastpagetext-any)
* [firstPageTitle](./pagination-props.html#paginationfirstpagetitle-any)
* [prePageTitle](./pagination-props.html#paginationprepagetitle-any)
* [nextPageTitle](./pagination-props.html#paginationnextpagetitle-any)
* [lastPageTitle](./pagination-props.html#paginationlastpagetitle-any)
* [hideSizePerPage](./pagination-props.html#paginationhidesizeperpage-bool)
* [hidePageListOnlyOnePage](./pagination-props.html#paginationhidepagelistonlyonepage-bool)
* [showTotal](./pagination-props.html#paginationshowtotal-bool)
* [disablePageTitle](./pagination-props.html#paginationdisablepagetitle-bool)

You can check [this online demo](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination&selectedStory=Custom%20Pagination&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel) for above props usage.

### Advance Customization

Sometime, you may feel above props is not satisfied with your requirement, don't worry, we provide following renderer for each part of pagination:

* [pageListRenderer](./pagination-props.html#paginationpagelistrenderer-function)
* [pageButtonRenderer](./pagination-props.html#paginationpagebuttonrenderer-function)
* [sizePerPageRenderer](./pagination-props.html#paginationsizeperpagerenderer-function)
* [sizePerPageOptionRenderer](./pagination-props.html#paginationsizeperpageoptionrenderer-function)
* [paginationTotalRenderer](./pagination-props.html#paginationpaginationtotalrenderer-function)

### Completely Customization

If you want to customize the pagination component completely, you may get interesting on following solution:

* Standalone
* Non-standalone

`react-bootstrap-table2-paginator` have a `PaginationProvider` which is a react context and you will be easier to customize the pagination components under the scope of `PaginationProvider`. Let's introduce it step by step:

#### 1. Import PaginationProvider

```js
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';

```

#### 2. Declare custom and totalSize in pagination option:

```js
const paginationOption = {
  custom: true,
  totalSize: products.length
};
```

#### 3. Render PaginationProvider

```js
<PaginationProvider
  pagination={ paginationFactory(paginationOption) }
>
  {
    ({
      paginationProps,
      paginationTableProps
    }) => (
      .....
    ) 
  }
</PaginationProvider>
```

`PaginationProvider` actually is a wrapper for the consumer of react context so that you are able to get the props from context then render to your compoennt and `BootstrapTable`:

* `paginationProps`: this include everything about pagination, you will use it when you render standalone component or your custom component.
* `paginationTableProps`: you don't need to know about this, but you have to give it as props when render `BootstrapTable`.

So far, your customization pagination should look like it:
```js
<PaginationProvider
  pagination={ paginationFactory(paginationOption) }
>
  {
    ({
      paginationProps,
      paginationTableProps
    }) => (
      <div>
        <BootstrapTable
          keyField="id"
          data={ products }
          columns={ columns }
          { ...paginationTableProps }
        />
      </div>
    )
  }
</PaginationProvider>
```

Now, you have two choices
* Use Standalone Component
* Customize everything by yourself

#### 4.1 Use Standalone Component
`react-bootstrap-table2-paginator` provider three standalone components:

* Size Per Page Dropdown Standalone
* Pagination List Standalone
* Pagination Total Standalone

When render each standalone, you just need to pass the `paginationProps` props to standalone component:

```js
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
  SizePerPageDropdownStandalone
} from 'react-bootstrap-table2-paginator';

<PaginationProvider
  pagination={ paginationFactory(options) }
>
  {
    ({
      paginationProps,
      paginationTableProps
    }) => (
      <div>
        <SizePerPageDropdownStandalone
          { ...paginationProps }
        />
        <PaginationTotalStandalone
          { ...paginationProps }
        />
        <BootstrapTable
          keyField="id"
          data={ products }
          columns={ columns }
          { ...paginationTableProps }
        />
        <PaginationListStandalone
          { ...paginationProps }
        />
      </div>
    )
  }
</PaginationProvider>
```

That's it!!  The benifit for using standalone is you can much easier to render the standalone component in any posistion. In the future, we will implement more featue like applying `style`, `className` etc on standalone components.    


<h5><b>Customizable props on `PaginationListStandalone`</b></h5>
* N/A

<h5><b>Customizable props on `SizePerPageDropdownStandalone`</b></h5>
* `open`: <b>true</b> to make dropdown show.
* `hidden`: <b>true</b> to hide the size per page dropdown.
* `btnContextual`: Set the button contextual.
* `variation`: Variation for dropdown, available value is `dropdown` and `dropup`.
* `className`: Custom the class on size per page dropdown

<h5><b>Customizable props on `SizePerPageDropdownStandalone`</b></h5>
* N/A


#### 4.2 Customization Everything

If you choose to custom the pagination component by yourself, the `paginationProps` will be important for you. Becasue you have to know for example how to change page or what's the current page etc. Therefore, following is all the props in `paginationProps` object:

```js
page,
sizePerPage,
pageStartIndex,
hidePageListOnlyOnePage,
hideSizePerPage,
alwaysShowAllBtns,
withFirstAndLast,
dataSize,
sizePerPageList,
paginationSize,
showTotal,
pageListRenderer,
pageButtonRenderer,
sizePerPageRenderer,
paginationTotalRenderer,
sizePerPageOptionRenderer,
firstPageText,
prePageText,
nextPageText,
lastPageText,
prePageTitle,
nextPageTitle,
firstPageTitle,
lastPageTitle,
disablePageTitle,
onPageChange,
onSizePerPageChange
```

In most of case, `page`, `sizePerPage`, `onPageChange` and `onSizePerPageChange` are most important properties for you:

* `page`: Current page.
* `sizePerPage`: Current size per page.
* `onPageChange`: Call it when you nede to change page. This function accept one number argument which indicate the new page 
* `onSizePerPageChange`: Call it when you nede to change size per page. This function accept two number argument which indicate the new sizePerPage and new page

[This](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination&selectedStory=Fully%20Custom%20Pagination&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel) is a online example for showing how to custom pagination completely.