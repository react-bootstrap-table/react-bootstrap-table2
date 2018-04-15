import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import _ from 'react-bootstrap-table-next/src/utils';
import remoteResolver from 'react-bootstrap-table-next/src/props-resolver/remote-resolver';
import BootstrapTable from 'react-bootstrap-table-next/src/bootstrap-table';
import Store from 'react-bootstrap-table-next/src/store';
import filter, { textFilter } from '..';
import wrapperFactory from '../src/wrapper';
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
  const onTableChangeCB = sinon.stub();

  afterEach(() => {
    onTableChangeCB.reset();
  });

  const createTableProps = (props) => {
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
      store: new Store('id'),
      onTableChange: onTableChangeCB,
      ...props
    };
    tableProps.store.data = data;
    return tableProps;
  };

  const FilterWrapper = wrapperFactory(BootstrapTable, {
    _,
    remoteResolver
  });

  const createFilterWrapper = (props, renderFragment = true) => {
    wrapper = shallow(<FilterWrapper { ...props } />);
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

    describe('when props.store.filters is same as current state.currFilters', () => {
      beforeEach(() => {
        nextProps = createTableProps();
        instance.componentWillReceiveProps(nextProps);
      });

      it('should setting isDataChanged as false (Temporary solution)', () => {
        expect(instance.state.isDataChanged).toBeFalsy();
      });
    });

    describe('when props.isDataChanged is true', () => {
      beforeEach(() => {
        nextProps = createTableProps({ isDataChanged: true });
        instance.componentWillReceiveProps(nextProps);
      });

      it('should setting isDataChanged as true', () => {
        expect(instance.state.isDataChanged).toBeTruthy();
      });
    });

    describe('when props.store.filters is different from current state.currFilters', () => {
      const nextData = [];

      beforeEach(() => {
        nextProps = createTableProps();
        nextProps.store.filters = { price: { filterVal: 20, filterType: FILTER_TYPE.TEXT } };
        nextProps.store.setAllData(nextData);
        instance.componentWillReceiveProps(nextProps);
      });

      it('should setting states correctly', () => {
        expect(nextProps.store.filteredData).toEqual(nextData);
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(instance.state.currFilters).toBe(nextProps.store.filters);
      });
    });

    describe('when remote filter is enabled', () => {
      let props;
      const nextData = [];

      beforeEach(() => {
        props = createTableProps({ remote: { filter: true } });
        createFilterWrapper(props);
        nextProps = createTableProps({ remote: { filter: true } });
        nextProps.store.setAllData(nextData);
        instance.componentWillReceiveProps(nextProps);
      });

      it('should setting states correctly', () => {
        expect(nextProps.store.filteredData).toEqual(nextData);
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(instance.state.currFilters).toBe(nextProps.store.filters);
      });
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
          instance.onFilter(props.columns[1], FILTER_TYPE.TEXT)(filterVal);
          expect(props.store.filtering).toBeFalsy();
        });
      });

      it('should setting state correctly', () => {
        filterVals.forEach((filterVal) => {
          instance.onFilter(props.columns[1], FILTER_TYPE.TEXT)(filterVal);
          expect(instance.state.isDataChanged).toBeTruthy();
          expect(Object.keys(instance.state.currFilters)).toHaveLength(0);
        });
      });
    });

    describe('when filterVal is existing', () => {
      const filterVal = '3';

      it('should setting store object correctly', () => {
        instance.onFilter(props.columns[1], FILTER_TYPE.TEXT)(filterVal);
        expect(props.store.filters).toEqual(instance.state.currFilters);
      });

      it('should setting state correctly', () => {
        instance.onFilter(props.columns[1], FILTER_TYPE.TEXT)(filterVal);
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(1);
      });
    });

    describe('when remote filter is enabled', () => {
      const filterVal = '3';

      beforeEach(() => {
        props = createTableProps();
        props.remote = { filter: true };
        createFilterWrapper(props);
        instance.onFilter(props.columns[1], FILTER_TYPE.TEXT)(filterVal);
      });

      it('should not setting store object correctly', () => {
        expect(props.store.filters).not.toEqual(instance.state.currFilters);
      });

      it('should not setting state', () => {
        expect(instance.state.isDataChanged).toBeFalsy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(0);
      });

      it('should calling props.onRemoteFilterChange correctly', () => {
        expect(onTableChangeCB.calledOnce).toBeTruthy();
      });
    });

    describe('combination', () => {
      it('should setting store object correctly', () => {
        instance.onFilter(props.columns[1], FILTER_TYPE.TEXT)('3');
        expect(props.store.filters).toEqual(instance.state.currFilters);
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(1);

        instance.onFilter(props.columns[1], FILTER_TYPE.TEXT)('2');
        expect(props.store.filters).toEqual(instance.state.currFilters);
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(1);

        instance.onFilter(props.columns[2], FILTER_TYPE.TEXT)('2');
        expect(props.store.filters).toEqual(instance.state.currFilters);
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(2);

        instance.onFilter(props.columns[2], FILTER_TYPE.TEXT)('');
        expect(props.store.filters).toEqual(instance.state.currFilters);
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(1);

        instance.onFilter(props.columns[1], FILTER_TYPE.TEXT)('');
        expect(props.store.filters).toEqual(instance.state.currFilters);
        expect(instance.state.isDataChanged).toBeTruthy();
        expect(Object.keys(instance.state.currFilters)).toHaveLength(0);
      });
    });
  });
});
