import React from 'react';
import ReactDom from 'react-dom';

import { BootstrapTable } from 'react-bootstrap-table2';

const data = [1, 2, 3, 4];

ReactDom.render(
  <BootstrapTable data={ data } />,
  document.getElementById('example'));
