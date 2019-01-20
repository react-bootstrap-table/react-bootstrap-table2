# react-bootstrap-table2-toolkit

`react-bootstrap-table2` support some additional features in [`react-bootstrap-table2-toolkit`](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/develop/packages/react-bootstrap-table2-toolkit).

In the future, this toolkit will support other feature like row delete, insert etc. Right now we only support Table Search and CSV export.   

**[Live Demo For Table Search](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Table%20Search)**

**[API&Props Definitation](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html)**

-----

## Install

```sh
$ npm install react-bootstrap-table2-toolkit --save
```

## Add CSS

```js
// es5 
require('react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css');

// es6
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
```

## Table Search

```js
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar } = Search;
//...

  <ToolkitProvider
    keyField="id"
    data={ products }
    columns={ columns }
    search
  >
    {
      props => (
        <div>
          <h3>Input something at below input field:</h3>
          <SearchBar { ...props.searchProps } />
          <hr />
          <BootstrapTable
            { ...props.baseProps }
          />
        </div>
      )
    }
  </ToolkitProvider>
```

1. You have to enable the search functionality via `search` prop on `ToolkitProvider`.

2. `ToolkitProvider` is a wrapper of react context, you are supposed to wrap the `BootstrapTable` and `SearchBar` as the child of `ToolkitProvider`

3. You should render `SearchBar` with `searchProps` as well. The position of `SearchBar` is depends on you.

### Search Options

#### defaultSearch - [string]
Accept a string that will be used for default searching when first time table render.

```js
<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  search={ {
    defaultSearch: 'search something here'
  } }
>
  // ...
</ToolkitProvider>
```

#### searchFormatted - [bool]
If you want to search on the formatted data, you are supposed to enable this props. `react-bootstrap-table2` will check if you define the `column.formatter` when doing search.

```js
<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  search={ {
    searchFormatted: true
  } }
>
  // ...
</ToolkitProvider>
```

### Clear Search Button
We have a built-in clear search function which allow user clear search status via clicking button:

```js
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar, ClearSearchButton } = Search;

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  search
>
  {
    props => (
      <div>
        <SearchBar { ...props.searchProps } />
        <ClearSearchButton { ...props.searchProps } />
        ....
      </div>
    )
  }
</ToolkitProvider>
```

## Export CSV
There are two steps to enable the export CSV functionality:

1. Give `exportCSV` prop as `true` on `ToolkitProvider`.
2. Render `ExportCSVButton` with `csvProps`. The position of `ExportCSVButton` is depends on you.

```js
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

const { ExportCSVButton } = CSVExport;

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  exportCSV
>
  {
    props => (
      <div>
        <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
        <hr />
        <BootstrapTable { ...props.baseProps } />
      </div>
    )
  }
</ToolkitProvider>
```

### Export CSV Options

#### fileName - [String]
Custom the csv file name.

#### separator - [String]
Custom the csv file separator.

#### ignoreHeader - [bool]
Default is `false`. Give true to avoid to attach the csv header.

#### noAutoBOM - [bool]
Default is `true`.

#### exportAll - [bool]
Default is `true`. `false` will only export current data which display on table.

#### onlyExportSelection - [bool]
Default is `false`. `true` will only export the data which is selected.