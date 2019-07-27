/* eslint no-console: 0 */
/* eslint react/prefer-stateless-function: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import Code from 'components/common/code-block';
import { jobsGenerator } from 'utils/common';

const jobs = jobsGenerator().map(j => ({
  ...j,
  type2: j.type
}));

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
  text: 'Job Type1',
  editor: {
    type: Type.SELECT,
    getOptions: (setOptions, { row, column }) => {
      console.log(`current editing row id: ${row.id}`);
      console.log(`current editing column: ${column.dataField}`);
      return [{
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
      }];
    }
  }
}, {
  dataField: 'type2',
  text: 'Job Type2',
  editor: {
    type: Type.SELECT,
    getOptions: (setOptions) => {
      setTimeout(() => {
        setOptions([{
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
        }]);
      }, 2000);
    }
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
  text: 'Job Type1',
  editor: {
    type: Type.SELECT,
    getOptions: (setOptions, { row, column }) => {
      console.log(\`current editing row id: $\{row.id}\`);
      console.log(\`current editing column: $\{column.dataField}\`);
      return [{
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
      }];
    }
  }
}, {
  dataField: 'type2',
  text: 'Job Type2',
  editor: {
    type: Type.SELECT,
    getOptions: (setOptions) => {
      setTimeout(() => {
        setOptions([{
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
        }]);
      }, 2000);
    }
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
    <h3>Dropdown Editor with Dynamic Options</h3>
    <BootstrapTable
      keyField="id"
      data={ jobs }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
