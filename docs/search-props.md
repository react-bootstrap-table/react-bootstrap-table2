---
id: search-props
title: Search Props
---
Table search in one of features supported by `react-bootstrap-table2-toolkit`. By passing `search` prop to `ToolkitProvider` for enabling this functionality. 


## Required
**N/A**

## Optional
* [searchFormatted](#searchsearchformatted-bool)
* [defaultSearch](#searchdefaultSearch-string)
* [onColumnMatch](#searchoncolumnmatch-function)

-----

## search.searchFormatted - [Bool]

If you want to search on the formatted data, you are supposed to enable this prop. `react-bootstrap-table2` will check if you define the [column.formatter](./column-props.html#columnformatter-function) when doing search.

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

## search.defaultSearch - [String]
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

## search.onColumnMatch - [Function]
Acccpt a function which will be called when table try to match every cells when search happening. This function accept an object like below example:

```js
function onColumnMatch({
  searchText,
  value,
  column,
  row
}) {
  // implement your custom match logic on every cell value
}
 <ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  search={ {
    onColumnMatch
  } }
>
  // ...
</ToolkitProvider>
```

> Notes: You have to return `true` when your match logic is positive and vice versa.

