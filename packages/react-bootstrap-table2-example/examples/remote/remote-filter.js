/* eslint guard-for-in: 0 */
/* eslint no-restricted-syntax: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table2';
import filterFactory, { textFilter, Comparator } from 'react-bootstrap-table2-filter';
import Code from 'components/common/code-block';
import { productsGenerator } from 'utils/common';

const products = productsGenerator(17);

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

const sourceCode = `\
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const columns = [{
  dataField: 'id',
  text: 'Product ID',
}, {
  dataField: 'name',
  text: 'Product Name',
  filter: textFilter()
}, {
  dataField: 'price',
  text: 'Product Price',
  filter: textFilter()
}];

<BootstrapTable keyField='id' data={ products } columns={ columns } filter={ filterFactory() } />
`;

const RemoteFilter = props => (
  <div>
    <BootstrapTable
      remote={ { filter: true } }
      keyField="id"
      data={ props.data }
      columns={ columns }
      filter={ filterFactory() }
      onTableChange={ props.onTableChange }
    />
    <Code>{ sourceCode }</Code>
  </div>
);

RemoteFilter.propTypes = {
  data: PropTypes.array.isRequired,
  onTableChange: PropTypes.func.isRequired
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: products
    };
  }

  handleTableChange = (type, { filters }) => {
    setTimeout(() => {
      const result = products.filter((row) => {
        let valid = true;
        for (const dataField in filters) {
          const { filterVal, filterType, comparator } = filters[dataField];

          if (filterType === 'TEXT') {
            if (comparator === Comparator.LIKE) {
              valid = row[dataField].toString().indexOf(filterVal) > -1;
            } else {
              valid = row[dataField] === filterVal;
            }
          }
          if (!valid) break;
        }
        return valid;
      });
      this.setState(() => ({
        data: result
      }));
    }, 2000);
  }

  render() {
    return (
      <RemoteFilter
        data={ this.state.data }
        onTableChange={ this.handleTableChange }
      />
    );
  }
}

export default Container;
