/* eslint react/prop-types: 0 */
/* eslint no-return-assign: 0 */
import React from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator();

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

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

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

const MySearch = (props) => {
  let input;
  const handleClick = () => {
    props.onSearch(input.value);
  };
  return (
    <div>
      <input
        className="form-control"
        style={ { backgroundColor: 'pink' } }
        ref={ n => input = n }
        type="text"
      />
      <button className="btn btn-warning" onClick={ handleClick }>Click to Search!!</button>
    </div>
  );
};

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  search
>
  {
    props => (
      <div>
        <BootstrapTable
          { ...props.baseProps }
        />
        <MySearch { ...props.searchProps } />
        <br />
      </div>
    )
  }
</ToolkitProvider>
`;

const MySearch = (props) => {
  let input;
  const handleClick = () => {
    props.onSearch(input.value);
  };
  return (
    <div>
      <input
        className="form-control"
        style={ { backgroundColor: 'pink' } }
        ref={ n => input = n }
        type="text"
      />
      <button className="btn btn-warning" onClick={ handleClick }>Click to Search!!</button>
    </div>
  );
};

export default () => (
  <div>
    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      search
    >
      {
        props => (
          <div>
            <BootstrapTable
              { ...props.baseProps }
            />
            <MySearch { ...props.searchProps } />
            <br />
          </div>
        )
      }
    </ToolkitProvider>
    <Code>{ sourceCode }</Code>
  </div>
);
