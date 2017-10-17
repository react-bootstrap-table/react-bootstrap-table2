import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { BootstrapTable, BootstrapTableful } from '../src';

describe('withStateful', () => {
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
        <BootstrapTableful keyField={ keyField } data={ data } columns={ columns } />
      );
    });

    it('should render BootstrapTable successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find(BootstrapTable).length).toBe(1);
    });

    it('should creating store successfully', () => {
      const store = wrapper.instance().store;
      expect(store).toBeDefined();
      expect(store.get()).toEqual(data);
      expect(store.keyField).toEqual(keyField);
    });
  });

  describe('when cellEdit is defined', () => {
    const spy = jest.spyOn(BootstrapTableful.prototype, 'renderCellEdit');
    const cellEdit = {
      mode: 'click'
    };

    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTableful
          keyField={ keyField }
          data={ data }
          columns={ columns }
          cellEdit={ cellEdit }
        />
      );
    });

    it('should calling renderCellEdit function', () => {
      expect(spy).toHaveBeenCalled();
    });

    it('should injecting correct props', () => {
      expect(wrapper.props().keyField).toEqual('id');
      expect(wrapper.props().cellEdit).toEqual(cellEdit);
      expect(wrapper.props().elem).toBeDefined();
      expect(wrapper.props().onUpdateCell).toBeDefined();
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
          const row = store.getRowByRowId(rowId);
          expect(row[dataField]).toEqual(newValue);
        });
      });

      describe('when cellEdit.onUpdate callback is define and which return false', () => {
        beforeEach(() => {
          cellEdit.onUpdate = sinon.stub().returns(false);
          wrapper = shallow(
            <BootstrapTableful
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
          const row = store.getRowByRowId(rowId);
          expect(row[dataField]).not.toEqual(newValue);
        });
      });

      // We need refactoring handleUpdateCell function for handling promise firstly
      // then it will be much easier to test
      describe.skip('when cellEdit.onUpdate callback is define and which return a Promise', () => {});
    });
  });
});
