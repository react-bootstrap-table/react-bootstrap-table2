---
id: basic-row
title: Work on Row
sidebar_label: Work on Row
---

`react-bootstrap-table2` allow you to custom the row style/class/attributes and event on row(`tr`)

**[Live Demo For Rows](../storybook/index.html?selectedKind=Work%20on%20Rows)**   

-----

## Row Style/Class

* [rowStyle](./table-props.html#rowstyle-object-function)
* [rowClasses](./table-props.html#rowclasses-string-function)

## Row Events

* [rowEvents](./table-props.html#rowevents-object)

Currently, `react-bootstrap-table2` only wrapped up the following events to allow its callback to receive `row` and `rowIndex`, for example:

* `onClick`
* `onMouseEnter`
* `onMouseLeave`

```js
const rowEvents = {
  onClick: (e, row, rowIndex) => {
    ....
  }
};
<BootstrapTable data={ data } columns={ columns } rowEvents={ rowEvents } />
```

Anyway, it's welcome to ask us to add more wrapped on events. 

## Row Attributes

**Coming Soon!**