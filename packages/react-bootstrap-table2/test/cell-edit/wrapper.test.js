import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Store from '../../src/store';
import Container from '../../src';
import BootstrapTable from '../../src/bootstrap-table';
import wrapperFactory from '../../src/cell-edit/wrapper';

describe('CellEditWrapper', () => {
  let wrapper;

  const columns = [{
    dataField: 'id',
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

  const cellEdit = {
    mode: 'click'
  };

  const keyField = 'id';
  const store = new Store(keyField);
  store.data = data;

  const CellEditWrapper = wrapperFactory(Container);

  beforeEach(() => {
    wrapper = shallow(
      <CellEditWrapper
        keyField={ keyField }
        data={ data }
        columns={ columns }
        cellEdit={ cellEdit }
        store={ store }
      />
    );
  });

  it('should render CellEditWrapper correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find(BootstrapTable)).toBeDefined();
  });

  it('should have correct state', () => {
    expect(wrapper.state().ridx).toBeNull();
    expect(wrapper.state().cidx).toBeNull();
    expect(wrapper.state().message).toBeNull();
    expect(wrapper.state().isDataChanged).toBeFalsy();
  });

  it('should inject correct props to base component', () => {
    expect(wrapper.props().onCellUpdate).toBeDefined();
    expect(wrapper.props().onStartEditing).toBeDefined();
    expect(wrapper.props().onEscapeEditing).toBeDefined();
    expect(wrapper.props().isDataChanged).toBe(wrapper.state().isDataChanged);
    expect(wrapper.props().currEditCell).toBeDefined();
    expect(wrapper.props().currEditCell.ridx).toBeNull();
    expect(wrapper.props().currEditCell.cidx).toBeNull();
    expect(wrapper.props().currEditCell.message).toBeNull();
  });

  describe('when receive new cellEdit prop', () => {
    const spy = jest.spyOn(CellEditWrapper.prototype, 'escapeEditing');

    describe('and cellEdit is not work on remote', () => {
      beforeEach(() => {
        wrapper = shallow(
          <CellEditWrapper
            keyField={ keyField }
            data={ data }
            columns={ columns }
            cellEdit={ cellEdit }
            store={ store }
          />
        );
        wrapper.setProps({ cellEdit: { ...cellEdit } });
      });

      it('should always setting state.isDataChanged as false', () => {
        expect(wrapper.state().isDataChanged).toBeFalsy();
      });
    });

    describe('and cellEdit is work on remote', () => {
      let errorMessage;
      const ridx = 1;
      const cidx = 2;

      describe('and cellEdit.errorMessage is defined', () => {
        beforeEach(() => {
          wrapper = shallow(
            <CellEditWrapper
              remote={ { cellEdit: true } }
              keyField={ keyField }
              data={ data }
              columns={ columns }
              cellEdit={ cellEdit }
              store={ store }
            />
          );
          errorMessage = 'test';
          wrapper.setState({ ridx, cidx });
          wrapper.setProps({ cellEdit: { ...cellEdit, errorMessage } });
        });

        it('should setting correct state', () => {
          expect(wrapper.state().ridx).toEqual(ridx);
          expect(wrapper.state().cidx).toEqual(cidx);
          expect(wrapper.state().isDataChanged).toBeFalsy();
          expect(wrapper.state().message).toEqual(errorMessage);
        });
      });

      describe('and cellEdit.errorMessage is undefined', () => {
        beforeEach(() => {
          wrapper = shallow(
            <CellEditWrapper
              remote={ { cellEdit: true } }
              keyField={ keyField }
              data={ data }
              columns={ columns }
              cellEdit={ cellEdit }
              store={ store }
            />
          );
          errorMessage = null;
          wrapper.setState({ ridx, cidx });
          wrapper.setProps({ cellEdit: { ...cellEdit, errorMessage } });
        });

        it('should setting correct state', () => {
          expect(wrapper.state().isDataChanged).toBeTruthy();
        });

        it('should escape current editing', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });
  });

  describe('call escapeEditing function', () => {
    it('should set state correctly', () => {
      wrapper.instance().escapeEditing();
      expect(wrapper.state().ridx).toBeNull();
      expect(wrapper.state().cidx).toBeNull();
    });
  });

  describe('call startEditing function', () => {
    const ridx = 1;
    const cidx = 3;
    it('should set state correctly', () => {
      wrapper.instance().startEditing(ridx, cidx);
      expect(wrapper.state().ridx).toEqual(ridx);
      expect(wrapper.state().cidx).toEqual(cidx);
      expect(wrapper.state().isDataChanged).toBeFalsy();
    });

    describe('if selectRow.clickToSelect is defined', () => {
      beforeEach(() => {
        const selectRow = { mode: 'checkbox', clickToSelect: true };
        wrapper = shallow(
          <CellEditWrapper
            keyField={ keyField }
            data={ data }
            columns={ columns }
            cellEdit={ cellEdit }
            selectRow={ selectRow }
            store={ store }
          />
        );
      });

      it('should not set state', () => {
        wrapper.instance().startEditing(ridx, cidx);
        expect(wrapper.state().ridx).toBeNull();
        expect(wrapper.state().cidx).toBeDefined();
      });
    });

    describe('if selectRow.clickToSelect and selectRow.clickToEdit is defined', () => {
      beforeEach(() => {
        const selectRow = { mode: 'checkbox', clickToSelect: true, clickToEdit: true };
        wrapper = shallow(
          <CellEditWrapper
            keyField={ keyField }
            data={ data }
            columns={ columns }
            cellEdit={ cellEdit }
            selectRow={ selectRow }
            store={ store }
          />
        );
      });

      it('should set state correctly', () => {
        wrapper.instance().startEditing(ridx, cidx);
        expect(wrapper.state().ridx).toEqual(ridx);
        expect(wrapper.state().cidx).toEqual(cidx);
      });
    });
  });

  describe('call completeEditing function', () => {
    it('should set state correctly', () => {
      wrapper.instance().completeEditing();
      expect(wrapper.state().ridx).toBeNull();
      expect(wrapper.state().cidx).toBeNull();
      expect(wrapper.state().message).toBeNull();
      expect(wrapper.state().isDataChanged).toBeTruthy();
    });
  });

  describe('call handleCellUpdate function', () => {
    const row = data[0];
    const column = columns[1];
    const newValue = 'new name';

    describe('when cell edit is work on remote', () => {
      const spy = jest.spyOn(CellEditWrapper.prototype, 'handleCellChange');
      const onTableChangeCB = jest.fn();

      beforeEach(() => {
        wrapper = shallow(
          <CellEditWrapper
            remote={ { cellEdit: true } }
            keyField={ keyField }
            data={ data }
            columns={ columns }
            cellEdit={ cellEdit }
            onTableChange={ onTableChangeCB }
            store={ store }
          />
        );
        wrapper.instance().handleCellUpdate(row, column, newValue);
      });

      it('should calling handleCellChange correctly', () => {
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls).toHaveLength(1);
        expect(spy.mock.calls[0]).toHaveLength(3);
        expect(spy.mock.calls[0][0]).toEqual(row[keyField]);
        expect(spy.mock.calls[0][1]).toEqual(column.dataField);
        expect(spy.mock.calls[0][2]).toEqual(newValue);
      });
    });

    describe('when cell edit is not work on remote', () => {
      const spyOnCompleteEditing = jest.spyOn(CellEditWrapper.prototype, 'completeEditing');
      const spyOnStoreEdit = jest.spyOn(Store.prototype, 'edit');

      beforeEach(() => {
        wrapper = shallow(
          <CellEditWrapper
            keyField={ keyField }
            data={ data }
            columns={ columns }
            cellEdit={ cellEdit }
            store={ store }
          />
        );
        wrapper.instance().handleCellUpdate(row, column, newValue);
      });

      afterEach(() => {
        spyOnStoreEdit.mockReset();
        spyOnCompleteEditing.mockReset();
      });

      it('should calling props.store.edit', () => {
        expect(spyOnStoreEdit).toHaveBeenCalled();
        expect(spyOnStoreEdit.mock.calls).toHaveLength(1);
        expect(spyOnStoreEdit.mock.calls[0]).toHaveLength(3);
        expect(spyOnStoreEdit.mock.calls[0][0]).toEqual(row[keyField]);
        expect(spyOnStoreEdit.mock.calls[0][1]).toEqual(column.dataField);
        expect(spyOnStoreEdit.mock.calls[0][2]).toEqual(newValue);
      });

      it('should calling completeEditing function', () => {
        expect(spyOnCompleteEditing).toHaveBeenCalled();
      });

      describe('if cellEdit.afterSaveCell prop defined', () => {
        const aftereSaveCellCallBack = sinon.stub();

        beforeEach(() => {
          cellEdit.afterSaveCell = aftereSaveCellCallBack;
          wrapper = shallow(
            <CellEditWrapper
              keyField={ keyField }
              data={ data }
              columns={ columns }
              cellEdit={ cellEdit }
              store={ store }
            />
          );
          wrapper.instance().handleCellUpdate(row, column, newValue);
        });

        it('should calling cellEdit.afterSaveCell correctly', () => {
          expect(aftereSaveCellCallBack.callCount).toBe(1);
          expect(aftereSaveCellCallBack.calledWith(
            row[column.dataField], newValue, row, column)
          ).toBe(true);
        });
      });
    });

    describe('if cellEdit.beforeSaveCell prop defined', () => {
      const beforeSaveCellCallBack = sinon.stub();
      beforeEach(() => {
        cellEdit.beforeSaveCell = beforeSaveCellCallBack;
        wrapper = shallow(
          <CellEditWrapper
            keyField={ keyField }
            data={ data }
            columns={ columns }
            cellEdit={ cellEdit }
            store={ store }
          />
        );
        wrapper.instance().handleCellUpdate(row, column, newValue);
      });

      it('should calling cellEdit.beforeSaveCell correctly', () => {
        expect(beforeSaveCellCallBack.callCount).toBe(1);
        expect(beforeSaveCellCallBack.calledWith(
          row[column.dataField], newValue, row, column)
        ).toBe(true);
      });
    });
  });
});
