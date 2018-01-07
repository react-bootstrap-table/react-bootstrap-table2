import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import _ from 'react-bootstrap-table2/src/utils';
import remoteResolver from 'react-bootstrap-table2/src/props-resolver/remote-resolver';
import Store from 'react-bootstrap-table2/src/store';
import BootstrapTable from 'react-bootstrap-table2/src/bootstrap-table';
import cellEditFactory from '../src';
import * as Const from '../src/const';
import wrapperFactory from '../src/wrapper';

describe('CellEditWrapper', () => {
  let wrapper;
  let instance;
  const onTableChangeCB = sinon.stub();
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

  const createTableProps = (props = {}) => {
    const { cellEdit, ...rest } = props;
    const tableProps = {
      keyField: 'id',
      columns,
      data,
      _,
      store: new Store('id'),
      cellEdit: cellEditFactory(cellEdit),
      onTableChange: onTableChangeCB,
      ...rest
    };
    tableProps.store.data = data;
    return tableProps;
  };

  const CellEditWrapper = wrapperFactory(BootstrapTable, {
    _,
    remoteResolver
  });

  const createCellEditWrapper = (props, renderFragment = true) => {
    wrapper = shallow(<CellEditWrapper { ...props } />);
    instance = wrapper.instance();
    if (renderFragment) {
      const fragment = instance.render();
      wrapper = shallow(<div>{ fragment }</div>);
    }
  };

  afterEach(() => {
    onTableChangeCB.reset();
  });

  beforeEach(() => {
    const props = createTableProps({
      cellEdit: { mode: Const.CLICK_TO_CELL_EDIT }
    });
    createCellEditWrapper(props);
  });

  it('should render CellEditWrapper correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(wrapper.find(BootstrapTable)).toBeDefined();
  });

  it('should have correct state', () => {
    expect(instance.state.ridx).toBeNull();
    expect(instance.state.cidx).toBeNull();
    expect(instance.state.message).toBeNull();
    expect(instance.state.isDataChanged).toBeFalsy();
  });

  it('should inject correct props to base component', () => {
    const base = wrapper.find(BootstrapTable);
    expect(base.props().cellEdit).toBeDefined();
    expect(base.props().cellEdit.onStart).toBeDefined();
    expect(base.props().cellEdit.onEscape).toBeDefined();
    expect(base.props().cellEdit.onUpdate).toBeDefined();
    expect(base.props().cellEdit.EditingCell).toBeDefined();
    expect(base.props().cellEdit.ridx).toBeNull();
    expect(base.props().cellEdit.cidx).toBeNull();
    expect(base.props().cellEdit.message).toBeNull();
    expect(base.props().isDataChanged).toBe(instance.state.isDataChanged);
  });

  describe('when receive new cellEdit prop', () => {
    const spy = jest.spyOn(CellEditWrapper.prototype, 'escapeEditing');

    describe('and cellEdit is not work on remote', () => {
      beforeEach(() => {
        const props = createTableProps({
          cellEdit: { mode: Const.CLICK_TO_CELL_EDIT }
        });
        createCellEditWrapper(props);
        wrapper.setProps({ cellEdit: props.cellEdit });
      });

      it('should always setting state.isDataChanged as false', () => {
        expect(instance.state.isDataChanged).toBeFalsy();
      });
    });

    describe('and cellEdit is work on remote', () => {
      let errorMessage;
      let props;
      beforeEach(() => {
        props = createTableProps({
          cellEdit: { mode: Const.CLICK_TO_CELL_EDIT },
          remote: true
        });
      });

      describe('and cellEdit.errorMessage is defined', () => {
        beforeEach(() => {
          createCellEditWrapper(props, false);
          errorMessage = 'test';
          const newCellEdit = {
            ...props.cellEdit,
            options: { ...props.cellEdit.options, errorMessage }
          };
          wrapper.setProps({ cellEdit: newCellEdit });
        });

        it('should setting correct state', () => {
          expect(instance.state.isDataChanged).toBeFalsy();
          expect(instance.state.message).toEqual(errorMessage);
        });
      });

      describe('and cellEdit.errorMessage is undefined', () => {
        beforeEach(() => {
          errorMessage = null;
          createCellEditWrapper(props, false);
          const newCellEdit = {
            ...props.cellEdit,
            options: { ...props.cellEdit.options, errorMessage }
          };
          wrapper.setProps({ cellEdit: newCellEdit });
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
      instance.escapeEditing();
      expect(instance.state.ridx).toBeNull();
      expect(instance.state.cidx).toBeNull();
    });
  });

  describe('call startEditing function', () => {
    const ridx = 1;
    const cidx = 3;

    it('should set state correctly', () => {
      instance.startEditing(ridx, cidx);
      expect(instance.state.ridx).toEqual(ridx);
      expect(instance.state.cidx).toEqual(cidx);
      expect(instance.state.isDataChanged).toBeFalsy();
    });

    describe('if selectRow.clickToSelect is defined', () => {
      beforeEach(() => {
        const selectRow = { mode: 'checkbox', clickToSelect: true };
        const props = createTableProps({
          cellEdit: { mode: Const.CLICK_TO_CELL_EDIT },
          selectRow
        });
        createCellEditWrapper(props);
      });

      it('should not set state', () => {
        instance.startEditing(ridx, cidx);
        expect(instance.state.ridx).toBeNull();
        expect(instance.state.cidx).toBeDefined();
      });
    });

    describe('if selectRow.clickToSelect and selectRow.clickToEdit is defined', () => {
      beforeEach(() => {
        const selectRow = { mode: 'checkbox', clickToSelect: true, clickToEdit: true };
        const props = createTableProps({
          cellEdit: { mode: Const.CLICK_TO_CELL_EDIT },
          selectRow
        });
        createCellEditWrapper(props);
      });

      it('should set state correctly', () => {
        instance.startEditing(ridx, cidx);
        expect(instance.state.ridx).toEqual(ridx);
        expect(instance.state.cidx).toEqual(cidx);
      });
    });
  });

  describe('call completeEditing function', () => {
    it('should set state correctly', () => {
      instance.completeEditing();
      expect(instance.state.ridx).toBeNull();
      expect(instance.state.cidx).toBeNull();
      expect(instance.state.message).toBeNull();
      expect(instance.state.isDataChanged).toBeTruthy();
    });
  });

  describe('call handleCellUpdate function', () => {
    let props;
    const row = data[0];
    const column = columns[1];
    const newValue = 'new name';

    describe('when cell edit is work on remote', () => {
      const spy = jest.spyOn(CellEditWrapper.prototype, 'handleCellChange');

      beforeEach(() => {
        props = createTableProps({
          cellEdit: { mode: Const.CLICK_TO_CELL_EDIT },
          remote: true
        });
        createCellEditWrapper(props);
        instance.handleCellUpdate(row, column, newValue);
      });

      it('should calling handleCellChange correctly', () => {
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls).toHaveLength(1);
        expect(spy.mock.calls[0]).toHaveLength(3);
        expect(spy.mock.calls[0][0]).toEqual(row.id);
        expect(spy.mock.calls[0][1]).toEqual(column.dataField);
        expect(spy.mock.calls[0][2]).toEqual(newValue);
      });
    });

    describe('when cell edit is not work on remote', () => {
      const spyOnCompleteEditing = jest.spyOn(CellEditWrapper.prototype, 'completeEditing');
      const spyOnStoreEdit = jest.spyOn(Store.prototype, 'edit');

      beforeEach(() => {
        props = createTableProps({
          cellEdit: { mode: Const.CLICK_TO_CELL_EDIT }
        });
        createCellEditWrapper(props);
        instance.handleCellUpdate(row, column, newValue);
      });

      afterEach(() => {
        spyOnStoreEdit.mockReset();
        spyOnCompleteEditing.mockReset();
      });

      it('should calling props.store.edit', () => {
        expect(spyOnStoreEdit).toHaveBeenCalled();
        expect(spyOnStoreEdit.mock.calls).toHaveLength(1);
        expect(spyOnStoreEdit.mock.calls[0]).toHaveLength(3);
        expect(spyOnStoreEdit.mock.calls[0][0]).toEqual(row.id);
        expect(spyOnStoreEdit.mock.calls[0][1]).toEqual(column.dataField);
        expect(spyOnStoreEdit.mock.calls[0][2]).toEqual(newValue);
      });

      it('should calling completeEditing function', () => {
        expect(spyOnCompleteEditing).toHaveBeenCalled();
      });

      describe('if cellEdit.afterSaveCell prop defined', () => {
        const aftereSaveCellCallBack = sinon.stub();

        beforeEach(() => {
          props = createTableProps({
            cellEdit: {
              mode: Const.CLICK_TO_CELL_EDIT,
              afterSaveCell: aftereSaveCellCallBack
            }
          });
          createCellEditWrapper(props);
          instance.handleCellUpdate(row, column, newValue);
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
        props = createTableProps({
          cellEdit: {
            mode: Const.CLICK_TO_CELL_EDIT,
            beforeSaveCell: beforeSaveCellCallBack
          }
        });
        createCellEditWrapper(props);
        instance.handleCellUpdate(row, column, newValue);
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
