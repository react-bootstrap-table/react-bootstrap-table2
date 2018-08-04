---
id: basic-row-expand
title: Expandable Row
sidebar_label: Expandable Row
---

**[Live Demo For Row Expand](../storybook/index.html?selectedKind=Row%20Expand)**   
**[API & Props Definition](./row-expand-props.html)**

-----

## Expand Mode

`react-bootstrap-table2` allow support click to expand or collapse a row. When you enable row expandable functionality, you have to give [`expandRow.renderer`](./row-expand-props.html#expandrowrenderer-function) to tell what kind of context you want to render in the expanding content, for example: 

```js
const expandRow = {
  renderer: row => (
    <div>....</div>
  )
};

// omit...

<BootstrapTable
  keyField='id'
  data={ products }
  columns={ columns }
  expandRow={ expandRow }
/>

```

## Expand Management
Please check [`expandRow.expanded`](./row-expand-props.html#expandrowexpanded-array), it's used for default expanding usually but also can be used as a external expandation control.   

This is an example for [manage on expands](../storybook/index.html?selectedKind=Row%20Expand&selectedStory=Expand%20Management)

## Customization

### Style/Class
`expandRow.renderer` allow you to render everything in the content of expanding row. You can control the style or class by yourself. However, a expand row is wrapped by a HTML `tr` element. Currently, we don't support any ways to custom the style or class on the expanding `tr` elemnt.

### Expand Column
`react-bootstrap-table2` default doesn't render a additional indicator column, just like row selection. But if you want it, you can enable it via [`expandRow.showExpandColumn`](./row-expand-props.html#expandrowshowexpandcolumn-bool)

In addition, we allow you to custom the expand columns:

* For header cell: [`expandRow.expandHeaderColumnRenderer`](row-expand-props.html#expandrowexpandheadercolumnrenderer-function)
* For normal cell: [`expandRow.expandColumnRenderer`](./row-expand-props.html#expandrowexpandcolumnrenderer-function)


## Event Listening

* [`expandRow.onExpand`](./row-expand-props.html#expandrowonexpand-function) allow you to listen a row is expand or collapse. 
* [`expandRow.onExpandAll`](./row-expand-props.html#expandrowonexpandall-function) for listening the expand/collapse all event.
