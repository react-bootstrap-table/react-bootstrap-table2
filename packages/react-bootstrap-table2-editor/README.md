# react-bootstrap-table2-editor

`react-bootstrap-table2` separates the cell editing code base to [`react-bootstrap-table2-editor`](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/develop/packages/react-bootstrap-table2-editor), so it's a little bit different from `react-bootstrap-table` on how you use cell editing. In the following sections, we are going to show you how to enable cell editing.

**[Live Demo For Cell Edit](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Cell%20Editing)**

**[API&Props Definitation](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html)**

-----

## Install

```sh
$ npm install react-bootstrap-table2-editor --save
```

## How

We have [two ways](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html#celleditmode-string) to trigger a editable cell as the editing cell:

* click
* dbclick

Here's how to enable cell editing on the table:

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

How does a user save their new edits? We offer two ways:

* Press ENTER (**default**)
* Blur from current editing cell (you need to enable [cellEdit.blurToSave](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html#celleditblurtosave-bool))

## Editable Cell
`react-bootstrap-table2` supports you to configure the editable cell on three levels:

* Row Level ([cellEdit.nonEditableRows](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/cell-edit-props.html#celleditnoneditablerows-function))
* Column Level (configure [column.editable](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditable-bool-function) as bool value)
* Cell Level (configure [column.editable](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditable-bool-function) as a callback function)

## Validation

[column.validator](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columnvalidator-function) will help you to work on it!
## Customize Style/Class
### Editing Cell

* Customize the editing cell style via [column.editCellStyle](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditcellstyle-object-function)
* Customize the editing cell classname via [column.editCellClasses](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditcellclasses-string-function)

### Editor
* Customize the editor style via [column.editorStyle](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditorstyle-object-function)
* Customize the editor classname via [column.editorClasses](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditorclasses-string-function)

## Rich Editors
`react-bootstrap-table2` has the following predefined editors:

* Text (**default**)
* Dropdown
* Date
* Textarea
* Checkbox

In a nutshell, you just set a [column.editor](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditor-object) and define the `type`:

```js
import { Type } from 'react-bootstrap-table2-editor';
const columns = [
  ..., {
    dataField: 'done',
    text: 'Done',
    editor: {
      type: Type.SELECT | Type.TEXTAREA | Type.CHECKBOX | Type.DATE,
      ... // The rest of the properties will be rendered into the editor's DOM element
    }
  }
]
```

In the following sections, we go though all the predefined editors:

### Dropdown Editor
Dropdown editor gives a select menu to choose data from a list. When using the dropdown editor, either `editor.options` or `editor.getOptions` are required prop.

#### editor.options
This is the most simple way to assign the dropdown options data directly.   

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

#### editor.getOptions
It is more flexible and accepts a function to assign the dropdown options dynamically.

There are two cases for `getOptions`:

* *Synchronous*: Just return the options array from `getOptions` callback function
* *Asynchronous*: Call `setOptions` function argument to get the options from remote. 


```js
// Synchronous

const columns = [
  ..., {
  dataField: 'type',
  text: 'Job Type',
  editor: {
    type: Type.SELECT,
    getOptions: (setOptions, { row, column }) => [.....]
  }
}];

// Asynchronous

const columns = [
  ..., {
  dataField: 'type',
  text: 'Job Type',
  editor: {
    type: Type.SELECT,
    getOptions: (setOptions, { row, column }) => {
      setTimeout(() => setOptions([...]), 1500);
    }
  }
}];

```

[here](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Cell%20Editing&selectedStory=Dropdown%20Editor%20with%20Dynamic%20Options) is an online example.

### Date Editor
Date editor uses `<input type="date">`, the configuration is very simple:

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
    return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
  },
  editor: {
    type: Type.DATE
  }
}];
```

### Textarea Editor
Textarea editor uses `<input type="textarea">`, the user can press `ENTER` to enter a newline and in the `react-bootstrap-table2`, the user can save results pressing `SHIFT` + `ENTER`.

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
Checkbox editor allows you to have a boolean value choice, the `editor.value` is required to represent the actual value for checked and unchecked.

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
If you feel the above predefined editors are not enough for your requirements, you can customize the editor via [column.editorRenderer](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/column-props.html#columneditorrenderer-function). It accepts a function and passes the following arguments to it:

* `editorProps`: Some useful attributes you can use on DOM editor, like class, style etc.
* `value`: Current cell value
* `row`: Current row data
* `column`: Current column definition
* `rowIndex`: Current row index
* `columnIndex`: Current column index

> **Note** when you implement a custom React editor component, this component must have a **getValue** function that returns the inserted value

> **Note** when you want to save the value, you can call the **editorProps.onUpdate** function

Here is a short example:

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
