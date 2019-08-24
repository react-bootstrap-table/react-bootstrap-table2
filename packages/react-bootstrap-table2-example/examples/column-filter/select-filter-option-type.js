import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsQualityGenerator } from 'utils/common';

const products = productsQualityGenerator(6);

const selectOptions = {
  0: 'good',
  1: 'Bad',
  2: 'unknown'
};

const selectOptionsArr = [{
  value: 0,
  label: 'good'
}, {
  value: 1,
  label: 'Bad'
}, {
  value: 2,
  label: 'unknown'
}];

const columns1 = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions
  })
}];

const columns2 = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptionsArr.filter(opt => opt.value === cell)[0].label || '',
  filter: selectFilter({
    options: selectOptionsArr
  })
}];

const columns3 = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptionsArr.filter(opt => opt.value === cell)[0].label || '',
  filter: selectFilter({
    options: () => selectOptionsArr
  })
}];

const sourceCode = `\
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';

// Object map options
const selectOptions = {
  0: 'good',
  1: 'Bad',
  2: 'unknown'
};

// Array options
const selectOptionsArr = [{
  value: 0,
  label: 'good'
}, {
  value: 1,
  label: 'Bad'
}, {
  value: 2,
  label: 'unknown'
}];

const columns1 = [..., {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptions[cell],
  filter: selectFilter({
    options: selectOptions
  })
}];
<BootstrapTable keyField='id' data={ products } columns={ columns1 } filter={ filterFactory() } />

const columns2 = [..., {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptionsArr.filter(opt => opt.value === cell)[0].label || '',
  filter: selectFilter({
    options: selectOptionsArr
  })
}];
<BootstrapTable keyField='id' data={ products } columns={ columns2 } filter={ filterFactory() } />

const columns3 = [..., {
  dataField: 'quality',
  text: 'Product Quailty',
  formatter: cell => selectOptionsArr.filter(opt => opt.value === cell)[0].label || '',
  filter: selectFilter({
    options: () => selectOptionsArr
  })
}];
<BootstrapTable keyField='id' data={ products } columns={ columns3 } filter={ filterFactory() } />
`;

export default () => (
  <div>
    <h2>Options as an object</h2>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns1 }
      filter={ filterFactory() }
    />
    <h2>Options as an array</h2>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns2 }
      filter={ filterFactory() }
    />
    <h2>Options as a function which return an array</h2>
    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns3 }
      filter={ filterFactory() }
    />
    <Code>{ sourceCode }</Code>
  </div>
);
