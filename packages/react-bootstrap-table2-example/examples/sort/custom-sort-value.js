/* eslint no-unused-vars: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import Code from 'components/common/code-block';
import { jobsGenerator1 } from 'utils/common';

const jobs = jobsGenerator1(8);

const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];

const columns = [{
  dataField: 'id',
  text: 'Job ID'
}, {
  dataField: 'name',
  text: 'Job Name'
}, {
  dataField: 'owner',
  text: 'Job Owner'
}, {
  dataField: 'type',
  text: 'Job Type',
  sort: true,
  formatter: (cell, row) => types[cell],
  sortValue: (cell, row) => types[cell]
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';

const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];

const columns = [{
  dataField: 'id',
  text: 'Job ID'
}, {
  dataField: 'name',
  text: 'Job Name'
}, {
  dataField: 'owner',
  text: 'Job Owner'
}, {
  dataField: 'type',
  text: 'Job Type',
  sort: true,
  formatter: (cell, row) => types[cell],
  sortValue: (cell, row) => types[cell]
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } />
`;

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: jobs };
  }

  handleClick = () => {
    this.setState(() => {
      const newProducts = jobsGenerator1(21);
      return {
        data: newProducts
      };
    });
  }

  render() {
    return (
      <div>
        <button className="btn btn-default" onClick={ this.handleClick }>Change Data</button>
        <BootstrapTable keyField="id" data={ this.state.data } columns={ columns } />
        <Code>{ sourceCode }</Code>
      </div>
    );
  }
}
