/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import Code from 'components/common/code-block';
import { jobsGenerator } from 'utils/common';

const jobs = jobsGenerator();

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
  editor: {
    type: Type.TEXTAREA
  }
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

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
  editor: {
    type: Type.TEXTAREA
  }
}];

<BootstrapTable
  keyField="id"
  data={ jobs }
  columns={ columns }
  cellEdit={
    cellEditFactory({
      mode: 'click',
      autoSelectText: true
    })
  }
/>
`;

export default () => (
  <div>
    <h3>Auto Select Text Input Field When Editing</h3>
    <BootstrapTable
      keyField="id"
      data={ jobs }
      columns={ columns }
      cellEdit={
        cellEditFactory({
          mode: 'click',
          autoSelectText: true
        })
      }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
