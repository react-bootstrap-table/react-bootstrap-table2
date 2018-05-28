import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import BootstrapTable from '../../src/bootstrap-table';
import createDataContext from '../../src/contexts/data-context';

describe('DataContext', () => {
  let wrapper;

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const mockBase = jest.fn((props => (
    <BootstrapTable
      data={ data }
      columns={ columns }
      keyField="id"
      { ...props }
    />
  )));

  const DataContext = createDataContext();

  function shallowContext() {
    return (
      <DataContext.Provider
        data={ data }
      >
        <DataContext.Consumer>
          {
            dataProps => mockBase(dataProps)
          }
        </DataContext.Consumer>
      </DataContext.Provider>
    );
  }

  describe('default render', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.render();
    });

    it('should have correct Provider property after calling createDataContext', () => {
      expect(DataContext.Provider).toBeDefined();
    });

    it('should have correct Consumer property after calling createDataContext', () => {
      expect(DataContext.Consumer).toBeDefined();
    });

    it('should have correct state.data', () => {
      expect(wrapper.state().data).toEqual(data);
    });

    it('should pass correct sort props to children element', () => {
      expect(wrapper.length).toBe(1);
      expect(mockBase).toHaveBeenCalledWith({
        data,
        getData: wrapper.instance().getData
      });
    });
  });

  describe('componentWillReceiveProps', () => {
    const newData = [...data, { id: 3, name: 'test' }];

    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.instance().componentWillReceiveProps({
        data: newData
      });
    });

    it('should have correct state.data', () => {
      expect(wrapper.state().data).toEqual(newData);
    });
  });

  describe('getData', () => {
    let result;
    const fakeData = [...data, { id: 3, name: 'test' }];

    beforeEach(() => {
      wrapper = shallow(shallowContext());
    });

    describe('if third argument is give', () => {
      it('should return the data property from third argument', () => {
        result = wrapper.instance().getData(null, null, { data: fakeData });
        expect(result).toEqual(fakeData);
      });
    });

    describe('if second argument is give', () => {
      it('should return the data property from second argument', () => {
        result = wrapper.instance().getData(null, { data: fakeData });
        expect(result).toEqual(fakeData);
      });
    });

    describe('if first argument is give', () => {
      it('should return the data property from first argument', () => {
        result = wrapper.instance().getData({ data: fakeData });
        expect(result).toEqual(fakeData);
      });
    });

    describe('if no argument is give', () => {
      it('should return default props.data', () => {
        result = wrapper.instance().getData();
        expect(result).toEqual(data);
      });
    });
  });
});
