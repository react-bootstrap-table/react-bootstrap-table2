# react-bootstrap-table2-paginator

`react-bootstrap-table2` separate the pagination code base to [`react-bootstrap-table2-paginator`](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/develop/packages/react-bootstrap-table2-paginator), so there's a little bit different when you use pagination. In the following, we are going to show you how to enable and configure the a pagination table

**[Live Demo For Pagination](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Pagination)**

**[API&Props Definitation](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html)**

-----

## Install

```sh
$ npm install react-bootstrap-table2-paginator --save
```

## Add CSS

```js
// es5 
require('react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css');

// es6
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
```

## How

Let's enable a pagination on your table:

```js
import paginationFactory from 'react-bootstrap-table2-paginator';
// omit...

<BootstrapTable keyField='id' data={ products } columns={ columns } pagination={ paginationFactory() } />
```

## Customization

See [pagination props](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html)