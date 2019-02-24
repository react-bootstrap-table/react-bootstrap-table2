---
id: exposed-api
title: Introduction Exposed API
sidebar_label: Introduction
---

`react-bootstrap-table2` support some hooks function that you can use to know what state changes, for example: a row is select or unselect.
In addition, we also allow you use `React` `Refs` to directly access the components so that you can easier to get some table states.

**[Live Demo](../storybook/index.html?selectedKind=Basic%20Table&selectedStory=Exposed%20API)**   

## Add a Refs on `BootstrapTable`

```js
<BootstrapTable
  ref={ n => this.node = n }
  ...
/>
```

## Get Current Display Rows

`this.node.table.props.data`

## Get Current Selected Rows

`this.node.selectionContext.selected`

## Get Current Expanded Rows

`this.node.rowExpandContext.state.expanded`

## Get Current Page

`this.node.paginationContext.currPage`

## Get Current Size Per Page

`this.node.paginationContext.currSizePerPage`

## Get Current Sorting Column

`this.node.sortContext.state.sortColumn`

## Get Current Sorting Order

`this.node.sortContext.state.sortOrder`

## Get Current Filters

`this.node.filterContext.currFilters`

## Trigger Cell Editing:

`this.node.cellEditContext.startEditing(0, 1);  // rowindex, columnindex`