import React from 'react';

import { BootstrapTable } from 'react-bootstrap-table2';

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

export default () => (
  <div>
    <BootstrapTable keyField="id" data={ [] } columns={ columns } noDataIndication="Table is Empty" />
    <pre className="prettyprint lang-js"><code className="language-javascript">{`
<BootstrapTable keyField='id' data={ [] } columns={ columns } noDataIndication="Table is Empty" />

// Following is more customizable example

function indication() {
  // return something here
}

<BootstrapTable keyField='id' data={ [] } columns={ columns } noDataIndication={ indication } />
    `}
    </code></pre>
  </div>
);
