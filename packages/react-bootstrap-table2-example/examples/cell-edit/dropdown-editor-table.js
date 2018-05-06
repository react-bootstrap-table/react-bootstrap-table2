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

<BootstrapTable
  keyField="id"
  data={ jobs }
  columns={ columns }
  cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
/>
`;

export default () => (
  <div>
    <h3>Dropdown Editor</h3>
    <BootstrapTable
      keyField="id"
      data={ jobs }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
