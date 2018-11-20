import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BootstrapTable from 'react-bootstrap-table-next';

import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

import dragFactory, { dragFormatter } from '../../../react-bootstrap-table2-drag';

const products = productsGenerator();

const handleDrag = (fromIndex, toIndex) => {
  // eslint-disable-next-line no-console
  console.log(`Move row index ${fromIndex} to index ${toIndex}`);
};

const drag = dragFactory({
  afterDragDrop: handleDrag
});

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'drag',
  text: 'Order rows',
  isDummyField: true,
  formatter: dragFormatter
}];

const sourceCode = `\
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BootstrapTable from 'react-bootstrap-table-next';
import dragFactory, { dragFormatter } from 'react-bootstrap-table2-drag';

const handleDrag = (fromIndex, toIndex) => {
  // Handle the row drag
};

const drag = dragFactory({
  afterDragDrop: handleDrag
});

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'drag',
  text: 'Order rows',
  isDummyField: true,
  formatter: dragFormatter
}];

const App = () => (
  <BootstrapTable keyField="id" data={ products } columns={ columns } drag={drag} />
);

export default DragDropContext(HTML5Backend)(App);
`;

const App = () => (
  <div>
    <BootstrapTable keyField="id" data={ products } columns={ columns } drag={ drag } />
    <Code>{ sourceCode }</Code>
  </div>
);

export default DragDropContext(HTML5Backend)(App);
