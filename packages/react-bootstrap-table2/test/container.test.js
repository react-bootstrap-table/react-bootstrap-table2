/* eslint react/prefer-stateless-function: 0 */
/* eslint react/no-multi-comp: 0 */
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import BootstrapTable from '../src/bootstrap-table';
import Container from '../src';
import { getRowByRowId } from '../src/store/rows';

describe('container', () => {
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
        <Container keyField={ keyField } data={ data } columns={ columns } />
      );
    });

    it('should initialize BaseComponent', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('BootstrapTable');
    });

    it('should render BootstrapTable successfully', () => {
      expect(wrapper.find(BootstrapTable)).toHaveLength(1);
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
        <Container
          keyField={ keyField }
          data={ data }
          columns={ columns }
          cellEdit={ cellEdit }
        />
      );
    });

    it('should initialize BaseComponent correctly', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('CellEditWrapper');
    });

    it('should render CellEditWrapper component successfully', () => {
      expect(wrapper.find('CellEditWrapper')).toHaveLength(1);
    });

    it('should render BootstrapTable component successfully', () => {
      expect(wrapper.dive().find(BootstrapTable)).toHaveLength(1);
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
            <Container
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
        <Container
          keyField={ keyField }
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
        />
      );
    });

    it('should initialize BaseComponent correctly', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('RowSelectionWrapper');
    });

    it('should render BootstrapTable component successfully', () => {
      expect(wrapper.dive().find(BootstrapTable)).toHaveLength(1);
    });

    it('should render RowSelectionWrapper component successfully', () => {
      expect(wrapper.find('RowSelectionWrapper').length).toBe(1);
    });
  });

  describe('when pagination prop is defined', () => {
    const wrapperFactory = Base => class PaginationWrapper extends React.Component {
      render() { return <Base { ...this.props } />; }
    };
    const pagination = {
      wrapperFactory
    };

    beforeEach(() => {
      wrapper = shallow(
        <Container
          keyField={ keyField }
          data={ data }
          columns={ columns }
          pagination={ pagination }
        />
      );
    });

    it('should initialize BaseComponent correctly', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('PaginationWrapper');
    });

    it('should render BootstrapTable component successfully', () => {
      expect(wrapper.dive().find(BootstrapTable)).toHaveLength(1);
    });

    it('should render PaginationWrapper component successfully', () => {
      expect(wrapper.find('PaginationWrapper').length).toBe(1);
    });
  });

  describe('when filter prop is defined', () => {
    const wrapperFactory = Base => class FilterWrapper extends React.Component {
      render() { return <Base { ...this.props } />; }
    };

    const filter = { wrapperFactory };

    beforeEach(() => {
      wrapper = shallow(
        <Container
          keyField={ keyField }
          data={ data }
          columns={ columns }
          filter={ filter }
        />
      );
    });

    it('should initialize BaseComponent correctly', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('FilterWrapper');
    });

    it('should render BootstrapTable component successfully', () => {
      expect(wrapper.dive().find(BootstrapTable)).toHaveLength(1);
    });

    it('should render FilterWrapper component successfully', () => {
      expect(wrapper.find('FilterWrapper').length).toBe(1);
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
        <Container
          keyField={ keyField }
          data={ data }
          columns={ columnsWithSort }
        />
      );
    });

    it('should initialize BaseComponent correctly', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('SortWrapper');
    });

    it('should render BootstrapTable component successfully', () => {
      expect(wrapper.dive().find(BootstrapTable)).toHaveLength(1);
    });

    it('should render SortWrapper component successfully', () => {
      expect(wrapper.find('SortWrapper').length).toBe(1);
    });
  });
});
