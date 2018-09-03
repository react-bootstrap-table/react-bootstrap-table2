/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import Code from 'components/common/code-block';
import { todosGenerator } from 'utils/common';

const todos = todosGenerator();

const columns = [{
  dataField: 'id',
  text: 'Todo ID'
}, {
  dataField: 'todo',
  text: 'Todo Name'
}, {
  dataField: 'done',
  text: 'Done',
  editor: {
    type: Type.CHECKBOX,
    value: 'Y:N'
  }
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

const columns = [{
  dataField: 'id',
  text: 'Todo ID'
}, {
  dataField: 'todo',
  text: 'Todo Name'
}, {
  dataField: 'done',
  text: 'Done',
  editor: {
    type: Type.CHECKBOX,
    value: 'Y:N'
  }
}];

<BootstrapTable
  keyField="id"
  data={ todos }
  columns={ columns }
  cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
/>
`;

export default () => (
  <div>
    <h3>Checkbox Editor</h3>
    <BootstrapTable
      keyField="id"
      data={ todos }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
