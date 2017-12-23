import React from 'react';
import { shallow } from 'enzyme';

import _ from 'react-bootstrap-table2/src/utils';
import BootstrapTable from 'react-bootstrap-table2/src/bootstrap-table';
import Store from 'react-bootstrap-table2/src/store';
import filter, { textFilter } from '../src';
import FilterWrapper from '../src/wrapper';
import { FILTER_TYPE } from '../src/const';

const data = [];
for (let i = 0; i < 20; i += 1) {
  data.push({
    id: i,
    name: `itme name ${i}`,
    price: 200 + i
  });
}

describe('Wrapper', () => {
  let wrapper;
  let instance;


  const createTableProps = () => {
    const tableProps = {
      keyField: 'id',
      columns: [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name',
        filter: textFilter()
      }, {
        dataField: 'price',
        text: 'Price',
        filter: textFilter()
      }],
      data,
      filter: filter(),
      _,
      store: new Store('id')
    };
    tableProps.store.data = data;
    return tableProps;
  };

  const pureTable = props => (<BootstrapTable { ...props } />);

  const createFilterWrapper = (props, renderFragment = true) => {
    wrapper = shallow(<FilterWrapper { ...props } baseElement={ pureTable } />);
    instance = wrapper.instance();
    if (renderFragment) {
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    }
  };

  describe('default filter wrapper', () => {
    const props = createTableProps();

    beforeEach(() => {
      createFilterWrapper(props);
    });

    it('should rendering correctly', () => {
      expect(wrapper.length).toBe(1);
    });

    it('should initializing state correctly', () => {
      expect(instance.state.isDataChanged).toBeFalsy();
      expect(instance.state.currFilters).toEqual({});
    });

    it('should rendering BootstraTable correctly', () => {
      const table = wrapper.find(BootstrapTable);
      expect(table.length).toBe(1);
      expect(table.prop('onFilter')).toBeDefined();
      expect(table.prop('isDataChanged')).toEqual(instance.state.isDataChanged);
    });
  });

  describe('componentWillReceiveProps', () => {
    let nextProps;

    beforeEach(() => {
      nextProps = createTableProps();
      instance.componentWillReceiveProps(nextProps);
    });

    it('should setting isDataChanged as false always(Temporary solution)', () => {
      expect(instance.state.isDataChanged).toBeFalsy();
    });
  });

  describe('onFilter', () => {
    let props;

    beforeEach(() => {
      props = createTableProps();
      createFilterWrapper(props);
    });

    describe('when filterVal is empty or undefined', () => {
      const filterVals = ['', undefined];

      it('should setting store object correctly', () => {
        filterVals.forEach((filterVal) => {
          instance.onFilter(props.columns[1], filterVal, FILTER_TYPE.TEXT);
          expect(props.store.filtering).toBeFalsy();
        });
      });

      it('should setting state correctly', () => {
        filterVals.forEach((filterVal) => {
          instance.onFilter(props.columns[1], filterVal, FILTER_TYPE.TEXT);
          expect(instance.state.isDataChanged).toBeTruthy();
          expect(Object.keys(instance.state.currFilters)).toHaveLength(0);
        });
      });
    });

    describe('when filterVal is existing', () => {
      const filterVal = '3';

      it('should setting store object correctly', () => {
        instance.onFilter(props.columns[1], filterVal, FILTER_TYPE.TEXT);
        expect(props.store.filtering).toBeTruthy();
      });

      it('should setting state correctly', () => {
        instance.onFilter(props.columns[1], filterVal, FILTER_TYPE.TEXT);
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(1);
      });
    });

    describe('combination', () => {
      it('should setting store object correctly', () => {
        instance.onFilter(props.columns[1], '3', FILTER_TYPE.TEXT);
        expect(props.store.filtering).toBeTruthy();
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(1);

        instance.onFilter(props.columns[1], '2', FILTER_TYPE.TEXT);
        expect(props.store.filtering).toBeTruthy();
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(1);

        instance.onFilter(props.columns[2], '2', FILTER_TYPE.TEXT);
        expect(props.store.filtering).toBeTruthy();
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(2);

        instance.onFilter(props.columns[2], '', FILTER_TYPE.TEXT);
        expect(props.store.filtering).toBeTruthy();
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(1);

        instance.onFilter(props.columns[1], '', FILTER_TYPE.TEXT);
        expect(props.store.filtering).toBeFalsy();
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(0);
      });
    });
  });
});
