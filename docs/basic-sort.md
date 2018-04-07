---
id: basic-sort
title: Table Sort
sidebar_label: Table Sort
---

`react-bootstrap-table2` allow you to configure columns to be sortable. Currently, we don't support the multi-column sort, but it will be implemented in the future.

**[Live Demo For Table Sort](../storybook/index.html?selectedKind=Sort%20Table)**

-----

## Enable Sort on Column
Firstly, you need to know what column you allow user to sort and give the [`sort`](./column-props.html#columnsort-bool) as `true` in the column definition.

```js
const columns = [{
  dataField: 'id',
  text: 'Product ID',
  sort: true
}, {
  dataField: 'name',
  text: 'Product Name',
  sort: true
}, {
  dataField: 'price',
  text: 'Product Price'
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
```

After table rendered, you can see the Product ID and Product Name will have a caret icon beside the column name:
![sort caret](/react-bootstrap-table2/img/docs/basic-sort-caret.png)

## Control Sorting
### Default Sort
`react-bootstrap-table2` will only apply the default sort at first time rendering, you can achieve the default sorting on table easily via [`defaultSorted`](./table-props.html#defaultsorted-array).

### Sort Event Listener
Defined [`onSort`](./column-props.html#columnonsort-function) on target column:

```js
{
  dataField: 'id',
  text: 'Product ID',
  sort: true,
  onSort: (field, order) => {
    // ...
  }
}
```

### Manage Sorting Externally

**Coming Soon!**

## Custom the Sorting Algorithm

It's simple!! configure [`sortFunc`](./column-props.html#columnsortfunc-function) on column definition.

```js
{
  dataField: 'id',
  text: 'Product ID',
  sort: true
  // Perform a reverse sorting here
  sortFunc: (a, b, order, dataField) => {
    if (order === 'asc') {
      return b - a;
    }
    return a - b; // desc
  }
}
```

## Custom the Sorting Style
There're two way you can change or prettify the header when sorting: [`headerSortingClasses`](./column-props.html#headersortingclasses-string-function) and [`headerSortingStyle`](./column-props.html#headersortingstyle-object-function) 

## Custom the Sort Caret

**Coming Soon!**