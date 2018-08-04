---
id: basic-search
title: Table Search
sidebar_label: Table Search
---

`react-bootstrap-table2` support a table search function just like legacy search in `react-bootstrap-table`. However, new way will be more easier to custom.

**[Live Demo For Table Search](../storybook/index.html?selectedKind=Table%20Search)**  
**[API & Props Definition](./search-props.html)**   

-----

## Prepare

Please check [How to start with table toolkit](./toolkits-getting-started.html)


## Enable Search

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

* Enable search via [`search`](./search-props.html) prop on `ToolkitProvider`.

* `ToolkitProvider` is a wrapper of react context, you are supposed to wrap the `BootstrapTable` and `SearchBar` as the child of `ToolkitProvider`.

* You should render `SearchBar` with `searchProps` as well. The `SearchBar` position is depends on you.


## Customize Search Component

`SearchBar` is a independent component, it's free to place this component in anywhere, just make sure it is inside of the `ToolkitProvider`.   
You can add any `style` and `className` prop on `SearchBar` for component styling

In addition, following is some valid props on `SearchBar` component:

* `delay`: How long should trigger search after user enter the search text, default is `250` ms.
* placeholder: The placeholder on the input field, default is `Search`.

However, if you feel `SearchBar` can not fit your requirement or you want more customization, you can create your own search bar like following:

```js
// This is my custom search component
const MySearch = (props) => {
  let input;
  const handleClick = () => {
    props.onSearch(input.value);
  };
  return (
    <div>
      <input
        className="form-control"
        style={ { backgroundColor: 'pink' } }
        ref={ n => input = n }
        type="text"
      />
      <button className="btn btn-warning" onClick={ handleClick }>Click to Search!!</button>
    </div>
  );
};

export const MyTable = () => (
    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      search
    >
      {
        props => (
          <div>
            <BootstrapTable
              { ...props.baseProps }
            />
            <MySearch { ...props.searchProps } />
            <br />
          </div>
        )
      }
    </ToolkitProvider>
);
```

Following, we just explain how it work:   

`ToolkitProvider` will pass a props which have a property called `searchProps`. `searchProps` have following properties: 

* `onSearch`: Call this method with search text when you want to do the search.


In the customization case, you just need to pass `searchProps` to your component and call `searchProps.onSearch` when search trigger.


## Search on Formatted Data

`react-bootstrap-table2` default is search on your raw data. If you define a [`column.formatter`](./column-props.html#columnformatter-function) on a column, sometime that will cause
the search can't be performed accurately.

Therefore, we support [`searchFormatted`](./search-props.html#searchsearchformatted-bool) to let search can work on the formatted data.

## Customize the Search Value

Sometime, you hope `react-bootstrap-table2` to search another value instead of raw data, you can use [`column.filterValue`](./column-props.html#columnfiltervalue-function).
When table search on a specified column, will use the return value from `column.filterValue` for searching.


```js
..., {
  dataField: 'type',
  text: 'Job Type',
  formatter: (cell, row) => types[cell],
  filterValue: (cell, row) => types[cell] // we will search the value after filterValue called
}
```
