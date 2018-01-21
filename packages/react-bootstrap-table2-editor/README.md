# react-bootstrap-table2-editor

`react-bootstrap-table2` separate the cell edit code base to [`react-bootstrap-table2-editor`](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/develop/packages/react-bootstrap-table2-editor), so there's a little bit different when you use cell edit than `react-bootstrap-table`. In the following, we are going to show you how to enable the cell edit

**[Live Demo For Cell Edit](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Cell%20Editing)**

**[API&Props Definitation](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html)**

-----

## Install

```sh
$ npm install react-bootstrap-table2-editor --save
```

## How

We have [two ways](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html#celleditmode-string) to trigger a editable cell as editing cell:

* click
* dbclick

That's look into how we enable the cell edit on tabe:

```js
import cellEditFactory from 'react-bootstrap-table2-editor';

// omit

<BootstrapTable
  keyField="id"
  data={ products }
  columns={ columns }
  cellEdit={ cellEditFactory({ mode: 'click' }) }
/>
```

How user save their new editings? We offer two ways:

* Press ENTER(**default**)
* Blur from current editing cell(Need to enable the [cellEdit.blurToSave](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html#celleditblurtosave-bool))

## Editable Cell
`react-bootstrap-table2` support you to configure the cell editable on three level:

* Row Level ([cellEdit.nonEditableRows](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html#celleditnoneditablerows-function))
* Column Level (Configure [column.editable](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditable-bool-function) as bool value)
* Cell Level (Configure [column.editable](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditable-bool-function) as a callback function)

## Customize Style/Class
Currently, we only support the editing cell style/class customization, in the future, we will offer more customizations.

### Editing Cell

* Customize the editing cell style via [column.editCellStyle](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditcellstyle-object-function)
* Customize the editing cell classname via [column.editCellClasses](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditcellclasses-string-function)

## Validation

[`column.validator`](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columnvalidator-function) will help you to work on it!