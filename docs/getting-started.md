---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

## Installation

> Due to `react-bootstrap-table2` already taked on npm so that our npm module name is **`react-bootstrap-table-next`**. Anyway, we still use or mention `react-bootstrap-table2` in any our git repository, offical website and documents!!, ony the npm name is different!!!!

```sh
$ npm install react-bootstrap-table-next --save
```

## Add CSS

> `react-bootstrap-table2` need you to add bootstrap css in your application firstly. After **v1.0.0**, we start to suport `bootstrap@4`.

Finish above step, let's add the `react-bootstrap-table2` styles: 

```js
// es5 
require('react-bootstrap-table-next/dist/react-bootstrap-table2.min.css');

// es6
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
```

## Your First Table

```js
import BootstrapTable from 'react-bootstrap-table-next';

const products = [ ... ];
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

export default () =>
  <BootstrapTable keyField='id' data={ products } columns={ columns } />
```
<hr />

## UMD

### Namespace

* The namespace of `react-bootstrap-table-next` is `ReactBootstrapTable2`
* The namespace of `react-bootstrap-table2-editor` is `ReactBootstrapTable2Editor`
* The namespace of `react-bootstrap-table2-filter` is `ReactBootstrapTable2Filter`
* The namespace of `react-bootstrap-table2-paginator` is `ReactBootstrapTable2Paginator`
* The namespace of `react-bootstrap-table2-overlay` is `ReactBootstrapTable2Overlay`
* The namespace of `react-bootstrap-table2-toolkit` is `ReactBootstrapTable2Toolkit`

### npm

After install from npm, your can get UMD module from the `dist`.

### unpkg

* Download`react-bootstrap-table-next` from [here](https://unpkg.com/react-bootstrap-table-next/dist/react-bootstrap-table-next.min.js)
* Download `react-bootstrap-table2-editor` from [here](https://unpkg.com/react-bootstrap-table2-editor/dist/react-bootstrap-table2-editor.min.js)
* Download `react-bootstrap-table2-filter` from [here](https://unpkg.com/react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.js)
* Download `react-bootstrap-table2-paginator` from [here](https://unpkg.com/react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.js)
* Download `react-bootstrap-table2-overlay` from [here](https://unpkg.com/react-bootstrap-table2-overlay/dist/react-bootstrap-table2-overlay.min.js)
* Download `react-bootstrap-table2-toolkit` from [here](https://unpkg.com/react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.js)
