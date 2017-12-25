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
  let onUpdateCellCB = sinon.stub();
  const store = new Store(keyField);
  store.data = data;

  const CellEditWrapper = wrapperFactory(Container, {
    onUpdateCell: onUpdateCellCB
  });

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
    expect(wrapper.state().editing).toBeFalsy();
  });

  it('should inject correct props to base component', () => {
    expect(wrapper.props().onCellUpdate).toBeDefined();
    expect(wrapper.props().onStartEditing).toBeDefined();
    expect(wrapper.props().onEscapeEditing).toBeDefined();
    expect(wrapper.props().currEditCell).toBeDefined();
    expect(wrapper.props().currEditCell.ridx).toBeNull();
    expect(wrapper.props().currEditCell.cidx).toBeNull();
    expect(wrapper.props().currEditCell.message).toBeNull();
    expect(wrapper.props().currEditCell.editing).toBeFalsy();
  });

  describe('when receive new cellEdit prop', () => {
    const spy = jest.spyOn(CellEditWrapper.prototype, 'escapeEditing');

    describe('and cellEdit.editing is false', () => {
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
        wrapper.setProps({ cellEdit: { ...cellEdit, editing: false } });
      });

      it('should call escapeEditing', () => {
        expect(spy).toHaveBeenCalled();
      });

      it('should have correct state', () => {
        expect(wrapper.state().ridx).toBeNull();
        expect(wrapper.state().cidx).toBeNull();
        expect(wrapper.state().message).toBeNull();
        expect(wrapper.state().editing).toBeFalsy();
      });
    });

    describe('and cellEdit.editing is true', () => {
      const errorMessage = 'test';
      const ridx = 1;
      const cidx = 2;

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
        wrapper.setState({ ridx, cidx, editing: true });
        wrapper.setProps({ cellEdit: { ...cellEdit, editing: true, errorMessage } });
      });

      it('should have correct state', () => {
        expect(wrapper.state().ridx).toEqual(ridx);
        expect(wrapper.state().cidx).toEqual(cidx);
        expect(wrapper.state().editing).toBeTruthy();
        expect(wrapper.state().message).toEqual(errorMessage);
      });
    });
  });

  describe('call updateEditingWithErr function', () => {
    it('should set state.message correctly', () => {
      const message = 'test';
      wrapper.instance().updateEditingWithErr(message);
      expect(wrapper.state().message).toEqual(message);
    });
  });

  describe('call escapeEditing function', () => {
    it('should set state correctly', () => {
      wrapper.instance().escapeEditing();
      expect(wrapper.state().ridx).toBeNull();
      expect(wrapper.state().cidx).toBeNull();
      expect(wrapper.state().editing).toBeFalsy();
    });
  });

  describe('call startEditing function', () => {
    const ridx = 1;
    const cidx = 3;
    it('should set state correctly', () => {
      wrapper.instance().startEditing(ridx, cidx);
      expect(wrapper.state().ridx).toEqual(ridx);
      expect(wrapper.state().cidx).toEqual(cidx);
      expect(wrapper.state().editing).toBeTruthy();
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
        expect(wrapper.state().editing).toBeTruthy();
      });
    });
  });

  describe('call completeEditing function', () => {
    it('should set state correctly', () => {
      wrapper.instance().completeEditing();
      expect(wrapper.state().ridx).toBeNull();
      expect(wrapper.state().cidx).toBeNull();
      expect(wrapper.state().message).toBeNull();
      expect(wrapper.state().editing).toBeFalsy();
    });
  });

  describe('call handleCellUpdate function', () => {
    const row = data[0];
    const column = columns[1];
    const newValue = 'new name';

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

    it('should calling onUpdateCell callback correctly', () => {
      expect(onUpdateCellCB.callCount).toBe(1);
      expect(onUpdateCellCB.calledWith(row.id, column.dataField, newValue)).toBe(true);
    });

    describe('when onUpdateCell function return true', () => {
      const spy = jest.spyOn(CellEditWrapper.prototype, 'completeEditing');

      it('should calling completeEditing function', () => {
        expect(spy).toHaveBeenCalled();
      });

      describe('if cellEdit.afterSaveCell prop defined', () => {
        const aftereSaveCellCallBack = sinon.stub();
        beforeEach(() => {
          cellEdit.beforeSaveCell = aftereSaveCellCallBack;
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

    describe('when onUpdateCell function return false', () => {
      const spy = jest.spyOn(CellEditWrapper.prototype, 'completeEditing');

      beforeEach(() => {
        onUpdateCellCB = sinon.stub().returns(false);
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

      it('shouldn\'t calling completeEditing function', () => {
        expect(spy).toHaveBeenCalled();
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
