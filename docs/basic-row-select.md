---
id: basic-row-select
title: Row Selection
sidebar_label: Row Selection
---

For the table row selection functionality, the usage is almost same as `react-bootstrap-table`. If you are a user from legacy `react-bootstrap-table`, you can consider to skip this part.

**[Live Demo For Row Selection](../storybook/index.html?selectedKind=Row%20Selection)**

-----

## Selection Mode

We support the single and multiple selection on table, config the [`selectRow.mode`](./row-select-props.html#selectrowmode-string) on `BootstrapTable` will enable the selection on the table.

By default behavior, user need to click on the selection column or the checkbox/radio to select/unselect a row, for a user experience perspective, we have [`selectoRow.clickToSelect`](./row-select-props.html#selectrowclicktoselect-bool) to allow user to select/unselect row by clicking on the row.

## Customization

### Style/Class
Like column, we support to custom the style, class on the selecting row easily via following `selectRow` props:

* [`selectRow.bgColor`](row-select-props.html#selectrowbgcolor-string-function)
* [`selectRow.style`](./row-select-props.html#selectrowstyle-object-function)
* [`selectRow.classes`](./row-select-props.html#selectrowclasses-string-function)

### Selection Column
`react-bootstrap-table2` offer a [`selectRow.hideSelectColumn`](./row-select-props.html#selectrowhideselectcolumn-bool) to let you hide the selection column. But for the customization on selection column or checkbox/radio button, we will support it ine next couple release.
**Coming Soon!**

## Event Listening

[`selectRow.onSelect`](./row-select-props.html#selectrowonselect-function) allow you to listen a row is select or unselect. For the multiple selection, we also have [`selectRow.onSelectAll`](./selectrowonselectall-function) to listen the select/unselect all event.
