# react-bootstrap-table2-paginator

`react-bootstrap-table2` separate the pagination code base to [`react-bootstrap-table2-paginator`](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/develop/packages/react-bootstrap-table2-paginator), so there's a little bit different when you use pagination. In the following, we are going to show you how to enable and configure the a pagination table

**[Live Demo For Pagination](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination)**

**[API&Props Definitation](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html)**

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

* [paginationSize](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationpaginationsize-number)
* [sizePerPageList](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationsizeperpagelist-array)
* [withFirstAndLast](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationwithfirstandlast-bool)
* [alwaysShowAllBtns](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationalwaysshowallbtns-bool)
* [firstPageText](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationfirstpagetext-any)
* [prePageText](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationprepagetext-any)
* [nextPageText](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationnextpagetext-any)
* [lastPageText](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationlastpagetext-any)
* [firstPageTitle](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationfirstpagetitle-any)
* [prePageTitle](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationprepagetitle-any)
* [nextPageTitle](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationnextpagetitle-any)
* [lastPageTitle](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationlastpagetitle-any)
* [hideSizePerPage](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationhidesizeperpage-bool)
* [hidePageListOnlyOnePage](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationhidepagelistonlyonepage-bool)
* [showTotal](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationshowtotal-bool)

You can check [this online demo](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination&selectedStory=Custom%20Pagination&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel) for above props usage.

### Advance Customization

Sometime, you may feel above props is not satisfied with your requirement, don't worry, we provide following renderer for each part of pagination:

* [pageListRenderer](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationpagelistrenderer-function)
* [pageButtonRenderer](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationpagebuttonrenderer-function)
* [sizePerPageRenderer](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationsizeperpagerenderer-function)
* [sizePerPageOptionRenderer](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationsizeperpageoptionrenderer-function)
* [paginationTotalRenderer](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html#paginationpaginationtotalrenderer-function)

### Professional

If you want to customize the pagination component completely, you may get interesting on following solution:

* Standalone
* Non-standalone

`react-bootstrap-table2-paginator` have a `PaginationProvider` which is a react context and you will be easier to customize the pagination components under the scope of `PaginationProvider`. Let's introduce it step by step:

#### Import PaginationProvider

```js
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';

```

#### Declare custom and totalSize in pagination option:

```js
const paginationOption = {
  custom: true,
  totalSize: products.length
};
```

#### Render PaginationProvider

```js
<PaginationProvider
  pagination={ paginationFactory(options) }
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

`PaginationProvider` actually is a wrapper for the concumser of react context, so that now you have to get the props from context provide then render to your compoennt and `BootstrapTable`:

* `paginationProps`: this include everything about pagination, you will use it when you render standalone component or your custom component.
* `paginationTableProps`: you don't need to know about this, but you have to render this as props to `BootstrapTable`.

So far, your customization pagination is supposed to look like it:
```js
<PaginationProvider
  pagination={ paginationFactory(options) }
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

Now, you have to choose, your built-in standalne components or you customize all of them by yourself:

#### Use Standalone Component
`react-bootstrap-table2-paginator` provider two standalone components:

* Size Per Page Dropdwn Standalone
* Pagination List Standalone

When render each standalone, you just need to pass the `paginationProps` props to standalone component:

```js
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';

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

#### Customization Everything

If you choose to custom the pagination component by yourself, the `paginationProps` will be important for you. Becasue you have to know for example how to change page or what's the current page etc. Hence, following is all the props in `paginationProps` object:

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
onPageChange,
onSizePerPageChange
```

In most of case, `page`, `sizePerPage`, `onPageChange` and `onSizePerPageChange` are most important things for developer.

* `page`: Current page.
* `sizePerPage`: Current size per page.
* `onPageChange`: Call it when you nede to change page. This function accept one number argument which indicate the new page 
* `onSizePerPageChange`: Call it when you nede to change size per page. This function accept two number argument which indicate the new sizePerPage and new page

[Here](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination&selectedStory=Fully%20Custom%20Pagination&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel) is a online example.
