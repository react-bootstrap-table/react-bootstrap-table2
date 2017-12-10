import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import BootstrapTable from '../src';
import SortWrapper from '../src/sort/wrapper';
import CellEditWrapper from '../src/cell-edit/wrapper';
import RowSelectionWrapper from '../src/row-selection/wrapper';
import { getRowByRowId } from '../src/store/rows';

describe('withDataStore', () => {
  let wrapper;

  const keyField = 'id';

  const columns = [{
    dataField: keyField,
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  describe('initialization', () => {
    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable keyField={ keyField } data={ data } columns={ columns } />
      );
    });

    it('should render BootstrapTable successfully', () => {
      expect(wrapper.length).toBe(1);
    });

    it('should creating store successfully', () => {
      const store = wrapper.instance().store;
      expect(store).toBeDefined();
      expect(store.data).toEqual(data);
      expect(store.keyField).toEqual(keyField);
    });
  });

  describe('when cellEdit prop is defined', () => {
    const cellEdit = {
      mode: 'click'
    };

    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          cellEdit={ cellEdit }
        />
      );
    });

    it('should render CellEditWrapper component successfully', () => {
      const component = wrapper.find(CellEditWrapper);
      expect(component.length).toBe(1);
    });

    it('should injecting correct props to CellEditWrapper', () => {
      const component = wrapper.find(CellEditWrapper);
      expect(component.props().onUpdateCell).toBeDefined();
    });

    describe('for handleUpdateCell function', () => {
      const rowId = data[1].id;
      const dataField = columns[1].dataField;
      const newValue = 'tester';
      let result;

      describe('when cellEdit.onUpdate callback is not defined', () => {
        beforeEach(() => {
          result = wrapper.instance().handleUpdateCell(rowId, dataField, newValue);
        });

        it('should return true', () => {
          expect(result).toBeTruthy();
        });

        it('should update store data directly', () => {
          const store = wrapper.instance().store;
          const row = getRowByRowId(store)(rowId);
          expect(row[dataField]).toEqual(newValue);
        });
      });

      describe('when cellEdit.onUpdate callback is define and which return false', () => {
        beforeEach(() => {
          cellEdit.onUpdate = sinon.stub().returns(false);
          wrapper = shallow(
            <BootstrapTable
              keyField={ keyField }
              data={ data }
              columns={ columns }
              cellEdit={ cellEdit }
            />
          );
          result = wrapper.instance().handleUpdateCell(rowId, dataField, newValue);
        });

        it('should calling cellEdit.onUpdate callback correctly', () => {
          expect(cellEdit.onUpdate.callCount).toBe(1);
          expect(cellEdit.onUpdate.calledWith(rowId, dataField, newValue)).toBe(true);
        });

        it('should return false', () => {
          expect(result).toBeFalsy();
        });

        it('shouldn\'t update store data', () => {
          const store = wrapper.instance().store;
          const row = getRowByRowId(store)(rowId);
          expect(row[dataField]).not.toEqual(newValue);
        });
      });

      // We need refactoring handleUpdateCell function for handling promise firstly
      // then it will be much easier to test
      describe.skip('when cellEdit.onUpdate callback is define and which return a Promise', () => {});
    });
  });

  describe('when selectRow prop is defined', () => {
    const selectRow = {
      mode: 'checkbox'
    };

    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
        />
      );
    });

    it('should render RowSelectionWrapper component successfully', () => {
      expect(wrapper.find(RowSelectionWrapper).length).toBe(1);
    });
  });

  describe('when pagination prop is defined', () => {
    const PaginationWrapper = () => <div>test</div>;
    const pagination = {
      PaginationWrapper
    };

    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          pagination={ pagination }
        />
      );
    });

    it('should render Pagination wrapper successfully', () => {
      expect(wrapper.find(PaginationWrapper).length).toBe(1);
    });

    it('should injecting correct props to Pagination wrapper', () => {
      const component = wrapper.find(PaginationWrapper);
      expect(component.props().onRemotePageChange).toBeDefined();
      expect(component.props().baseElement).toBeDefined();
    });
  });

  describe('when any column.sort is defined', () => {
    beforeEach(() => {
      const columnsWithSort = [{
        dataField: keyField,
        text: 'ID',
        sort: true
      }];
      wrapper = shallow(
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columnsWithSort }
        />
      );
    });

    it('should render SortWrapper component successfully', () => {
      expect(wrapper.find(SortWrapper).length).toBe(1);
    });
  });

  describe('onRemotePageChange', () => {
    const page = 2;
    const sizePerPage = 25;
    const onTableChangeCallBack = sinon.stub();

    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          onTableChange={ onTableChangeCallBack }
        />
      );
      wrapper.instance().onRemotePageChange(page, sizePerPage);
    });

    it('should calling onTableChange correctly', () => {
      expect(onTableChangeCallBack.calledOnce).toBeTruthy();
      expect(onTableChangeCallBack.calledWith({ page, sizePerPage })).toBeTruthy();
    });
  });
});
