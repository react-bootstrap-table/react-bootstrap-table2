# react-bootstrap-table2-drag

**[Live Demo for Drag](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Drag%20and%20Drop)**

-----

## Install

```sh
$ npm install react-bootstrap-table2-drag --save
$ npm install react-dnd react-dnd-html5-backend --save
```

## How

### Provide drag context to entire App

You must set up the [DragDropContext](http://react-dnd.github.io/react-dnd/docs/api/drag-drop-context) at your application root:

```js
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

class YourApp {
	/* ... */
}

export default DragDropContext(HTML5Backend)(YourApp)
```

### Add drag to table

```js
import dragFactory, { dragFormatter } from 'react-bootstrap-table2-drag';

const drag = dragFactory({
  afterDragDrop: (fromIndex, toIndex) => console.log(`Move row index ${fromIndex} to index ${toIndex}`)
});

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'drag',
  text: 'Order rows',
  isDummyField: true,
  formatter: dragFormatter
}];

<BootstrapTable keyField="id" data={ products } columns={ columns } drag={drag} />
```


