---
id: toolkits-getting-started
title: Getting Started
sidebar_label: Getting Started
---

## Introduction

`react-bootstrap-table2` support following features in `react-bootstrap-table2-toolkit` package:

* Export CSV
* Table Search


## Installation

```sh
$ npm install react-bootstrap-table2-toolkit --save
```

## Add CSS

```js
// es5 
require('react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css');

// es6
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
```

## Usage

`react-bootstrap-table2-toolkit` default give you a react context wrapper: `ToolkitProvider`. When you use any toolkit functionalities, you are supposed to render toolkit component and `BootstrapTable` as the children of `ToolkitProvider`:

```js
import ToolkitProvider from 'react-bootstrap-table2-toolkit';


<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
>
  {
    props =>
      <BootstrapTable { ...props.baseProps } />
  }
</ToolkitProvider>
```

In addition, You have to move following required props from `BootstraTable` to `ToolkitProvider` and inject them to `BootstrapTable` from the `baseProps` provided by `ToolkitProvider`:

* [keyField](./table-props.html#keyfield-required-string)
* [data](./table-props.html#data-required-array)
* [columns](./table-props.html#columns-required-object)

### Additional props on ToolkitProvider

* [search](./search-props.html): For enabling search.
* [exportCSV](./export-csv-props.html): For enableing export CSV.

## Available children props

`ToolkitProvider` will pass following props to the childrens:

* `baseProps`: It have the basic props from `ToolkitProvider` and also contain few internal data.
* `searchProps`: props for search component.
* `csvProps`: props for export csv component.
