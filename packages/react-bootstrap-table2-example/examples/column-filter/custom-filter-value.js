/* eslint no-unused-vars: 0 */
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { jobsGenerator } from 'utils/common';

const jobs = jobsGenerator(5);

const owners = ['Allen', 'Bob', 'Cat'];
const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];

const columns = [{
  dataField: 'id',
  text: 'Job ID'
}, {
  dataField: 'name',
  text: 'Job Name',
  filter: textFilter()
}, {
  dataField: 'owner',
  text: 'Job Owner',
  filter: textFilter(),
  formatter: (cell, row) => owners[cell],
  filterValue: (cell, row) => owners[cell]
}, {
  dataField: 'type',
  text: 'Job Type',
  filter: textFilter(),
  formatter: (cell, row) => types[cell],
  filterValue: (cell, row) => types[cell]
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const owners = ['Allen', 'Bob', 'Cat'];
const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];
const columns = [{
  dataField: 'id',
  text: 'Job ID'
}, {
  dataField: 'name',
  text: 'Job Name',
  filter: textFilter()
}, {
  dataField: 'owner',
  text: 'Job Owner',
  filter: textFilter(),
  formatter: (cell, row) => owners[cell],
  filterValue: (cell, row) => owners[cell]
}, {
  dataField: 'type',
  text: 'Job Type',
  filter: textFilter(),
  filterValue: (cell, row) => types[cell]
}];

// shape of job: { id: 0, name: 'Job name 0', owner: 1, type: 3 }

<BootstrapTable keyField='id' data={ jobs } columns={ columns } filter={ filterFactory() } />
`;

export default () => (
  <div>
    <BootstrapTable
      keyField="id"
      data={ jobs }
      columns={ columns }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
