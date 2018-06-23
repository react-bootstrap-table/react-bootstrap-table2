# react-bootstrap-table2-toolkit

`react-bootstrap-table2` support some additional features in [`react-bootstrap-table2-toolkit`](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/develop/packages/react-bootstrap-table2-toolkit).

In the future, this toolkit will support other feature like row delete, insert and export csv etc. Right now we only support Table Search.   

**[Live Demo For Table Search](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Table%20Search)**

**[API&Props Definitation](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html)**

-----

## Install

```sh
$ npm install react-bootstrap-table2-toolkit --save
```

## Table Search

```js
import ToolkitContext, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar, searchFactory } = Search;
//...

<ToolkitContext.Provider>
  <ToolkitContext.Consumer>
    {
      props => (
        <div>
          <h3>Input something at below input field:</h3>
          <SearchBar { ...props.searchProps } />
          <hr />
          <BootstrapTable
            keyField="id"
            data={ products }
            columns={ columns }
            search={ searchFactory({
              ...props.searchProps
            }) }
          />
        </div>
      )
    }
  </ToolkitContext.Consumer>
</ToolkitContext.Provider>
```

1. You need to enable the search functionality via `search` prop on `BootstrapTable` and pass the result of calling `searchFactory` with custom option and default `searchProps` provided by `ToolkitContext.Provider`

2. `ToolkitContext` is a react context, you are supposed to wrap the `BootstrapTable` and `SearchBar` as the child of `ToolkitContext.Consumer`

3. You should render `SearchBar` with `searchProps` as well.

### Options

# searchFormatted - [bool]
If you want to search on the formatted data, you are supposed to enable it. `react-bootstrap-table2` will check if you define the `column.formatter` when doing search.

```js
<BootstrapTable
  keyField="id"
  data={ products }
  columns={ columns }
  search={ searchFactory({
    ...props.searchProps,
    searchFormatted: true
  }) }
/>
```