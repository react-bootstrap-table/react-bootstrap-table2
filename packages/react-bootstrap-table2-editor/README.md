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

## Validation

[column.validator](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columnvalidator-function) will help you to work on it!
## Customize Style/Class
### Editing Cell

* Customize the editing cell style via [column.editCellStyle](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditcellstyle-object-function)
* Customize the editing cell classname via [column.editCellClasses](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditcellclasses-string-function)

### Editor
* Customize the editor style via [column.editorStyle](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditorstyle-object-function)
* Customize the editor classname via [column.editoClasses](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditorclasses-string-function)

## Rich Editors
`react-bootstrap-table2` have following predefined editor:

* Text(Default)
* Dropdown
* Date
* Textarea
* Checkbox

In a nutshell, you just only give a [column.editor](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditor-object) and define the `type`:

```js
import { Type } from 'react-bootstrap-table2-editor';
const columns = [
  ..., {
    dataField: 'done',
    text: 'Done',
    editor: {
      type: Type.SELECT | Type.TEXTAREA | Type.CHECKBOX | Type.DATE,
      ... // The rest properties will be rendered into the editor's DOM element
    }
  }
]
```

In the following, we go though all the predefined editors:

### Dropdown Editor
Dropdown editor give a select menu to choose a data from a list, the `editor.options` is required property for dropdown editor.

```js
import { Type } from 'react-bootstrap-table2-editor';
const columns = [
  ..., {
  dataField: 'type',
  text: 'Job Type',
  editor: {
    type: Type.SELECT,
    options: [{
      value: 'A',
      label: 'A'
    }, {
      value: 'B',
      label: 'B'
    }, {
      value: 'C',
      label: 'C'
    }, {
      value: 'D',
      label: 'D'
    }, {
      value: 'E',
      label: 'E'
    }]
  }
}];
```

### Date Editor
Date editor is use `<input type="date">`, the configuration is very simple:

```js
const columns = [
  ..., {
  dataField: 'inStockDate',
  text: 'Stock Date',
  formatter: (cell) => {
    let dateObj = cell;
    if (typeof cell !== 'object') {
      dateObj = new Date(cell);
    }
    return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
  },
  editor: {
    type: Type.DATE
  }
}];
```

### Textarea Editor
Textarea editor is use `<input type="textarea">`, user can press `ENTER` to change line and in the `react-bootstrap-table2`, user allow to save result via press `SHIFT` + `ENTER`.

```js
const columns = [
  ..., {
  dataField: 'comment',
  text: 'Product Comments',
  editor: {
    type: Type.TEXTAREA
  }
}];
```
### Checkbox Editor
Checkbox editor allow you to have a pair value choice, the `editor.value` is required value to represent the actual value for check and uncheck.

```js
const columns = [
  ..., {
  dataField: 'comment',
  text: 'Product Comments',
  editor: {
    type: Type.CHECKBOX,
    value: 'Y:N'
  }
}];
```

## Customize Editor
If you feel above predefined editors are not satisfied to your requirement, you can certainly custom the editor via [column.editorRenderer](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditorrenderer-function). It accept a function and pass following arguments when function called:

* `editorProps`: Some useful attributes you can use on DOM editor, like class, style etc.
* `value`: Current cell value
* `row`: Current row data 
* `column`: Current column definition 
* `rowIndex`: Current row index 
* `columnIndex`: Current column index

> Note when implement a custom React editor component, this component should have a **getValue** function which return current value on editor

> Note when you want to save value, you can call **editorProps.onUpdate** function

Following is a short example: 

```js
class QualityRanger extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onUpdate: PropTypes.func.isRequired
  }
  static defaultProps = {
    value: 0
  }
  getValue() {
    return parseInt(this.range.value, 10);
  }
  render() {
    const { value, onUpdate, ...rest } = this.props;
    return [
      <input
        { ...rest }
        key="range"
        ref={ node => this.range = node }
        type="range"
        min="0"
        max="100"
      />,
      <button
        key="submit"
        className="btn btn-default"
        onClick={ () => onUpdate(this.getValue()) }
      >
        done
      </button>
    ];
  }
}

const columns = [
  ..., {
  dataField: 'quality',
  text: 'Product Quality',
  editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
    <QualityRanger { ...editorProps } value={ value } />
  )
}];
```
