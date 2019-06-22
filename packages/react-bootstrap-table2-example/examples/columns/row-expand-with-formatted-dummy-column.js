/* eslint no-param-reassign: 0 */
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

class DummyColumnWithRowExpand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverIdx: null
    };
  }

  expandRow = {
    renderer: () => (
      <div style={ { width: '100%', height: '20px' } }>Content</div>
    ),
    showExpandColumn: true,
    expandByColumnOnly: true
  };

  actionFormater = (cell, row, rowIndex, { hoverIdx }) => {
    if ((hoverIdx !== null || hoverIdx !== undefined) && hoverIdx === rowIndex) {
      return (
        <div
          style={ { width: '20px', height: '20px', backgroundColor: 'orange' } }
        />
      );
    }
    return (
      <div
        style={ { width: '20px', height: '20px' } }
      />
    );
  }

  rowEvents = {
    onMouseEnter: (e, row, rowIndex) => {
      this.setState({ hoverIdx: rowIndex });
    },
    onMouseLeave: () => {
      this.setState({ hoverIdx: null });
    }
  }

  rowStyle = (row, rowIndex) => {
    row.index = rowIndex;
    const style = {};
    if (rowIndex % 2 === 0) {
      style.backgroundColor = 'transparent';
    } else {
      style.backgroundColor = 'rgba(54, 163, 173, .10)';
    }
    style.borderTop = 'none';

    return style;
  }

  render() {
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }, {
      text: '',
      isDummyField: true,
      formatter: this.actionFormater,
      formatExtraData: { hoverIdx: this.state.hoverIdx },
      headerStyle: { width: '50px' },
      style: { height: '30px' }
    }];
    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ products }
          columns={ columns }
          noDataIndication="There is no data"
          classes="table"
          rowStyle={ this.rowStyle }
          rowEvents={ this.rowEvents }
          expandRow={ this.expandRow }
        />
      </div>
    );
  }
}
`;

export default class DummyColumnWithRowExpand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverIdx: null
    };
  }

  expandRow = {
    renderer: () => (
      <div style={ { width: '100%', height: '20px' } }>Content</div>
    ),
    showExpandColumn: true,
    expandByColumnOnly: true
  };

  actionFormater = (cell, row, rowIndex, { hoverIdx }) => {
    if ((hoverIdx !== null || hoverIdx !== undefined) && hoverIdx === rowIndex) {
      return (
        <div
          style={ { width: '20px', height: '20px', backgroundColor: 'orange' } }
        />
      );
    }
    return (
      <div
        style={ { width: '20px', height: '20px' } }
      />
    );
  }

  rowEvents = {
    onMouseEnter: (e, row, rowIndex) => {
      this.setState({ hoverIdx: rowIndex });
    },
    onMouseLeave: () => {
      this.setState({ hoverIdx: null });
    }
  }

  rowStyle = (row, rowIndex) => {
    row.index = rowIndex;
    const style = {};
    if (rowIndex % 2 === 0) {
      style.backgroundColor = 'transparent';
    } else {
      style.backgroundColor = 'rgba(54, 163, 173, .10)';
    }
    style.borderTop = 'none';

    return style;
  }

  render() {
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }, {
      isDummyField: true,
      text: '',
      formatter: this.actionFormater,
      formatExtraData: { hoverIdx: this.state.hoverIdx },
      headerStyle: { width: '50px' },
      style: { height: '30px' }
    }];
    return (
      <div>
        <BootstrapTable
          keyField="id"
          data={ products }
          columns={ columns }
          rowStyle={ this.rowStyle }
          rowEvents={ this.rowEvents }
          expandRow={ this.expandRow }
        />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
