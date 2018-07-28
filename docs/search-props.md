---
id: search-props
title: Search Props
---
Table search in one of features supported by `react-bootstrap-table2-toolkit`. By passing `search` prop to `ToolkitProvider` for enabling this functionality. 


## Required
**N/A**

## Optional
* [searchFormatted](#searchsearchformatted-bool)

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
