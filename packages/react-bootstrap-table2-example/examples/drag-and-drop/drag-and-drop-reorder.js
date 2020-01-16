import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import BootstrapTable from 'react-bootstrap-table-next';

import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

import dragFactory, { dragFormatter } from 'react-bootstrap-table2-drag';

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

  class Container extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products: productsGenerator()
      };
      this.handleDrag = this.handleDrag.bind(this);
    }
  
    handleDrag(fromIndex, toIndex) {
      // Create a copy of the current products before mutating it
      const products = [...this.state.products];
  
      // Take the element out of the array
      const productToMove = products.splice(fromIndex, 1)[0];
  
      // Add it back at the new index
      products.splice(toIndex, 0, productToMove);
  
      // Set the new rearranged products
      this.setState({ products });
    }
  
    render() {
      return (
        <div>
          <BootstrapTable
            keyField="id"
            data={ this.state.products }
            columns={ columns }
            drag={ dragFactory({ afterDragDrop: this.handleDrag }) }
          />
          <Code>{ sourceCode }</Code>
        </div>
      );
    }
  }
  
  export default DragDropContext(HTML5Backend)(Container);
`;

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: productsGenerator()
    };
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDrag(fromIndex, toIndex) {
    // Create a copy of the current products before mutating it
    const products = [...this.state.products];

    // Take the element out of the array
    const productToMove = products.splice(fromIndex, 1)[0];

    // Add it back at the new index
    products.splice(toIndex, 0, productToMove);

    // Set the new rearranged products
    this.setState({ products });
  }

  render() {
    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ this.state.products }
          columns={ columns }
          drag={ dragFactory({ afterDragDrop: this.handleDrag }) }
        />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
