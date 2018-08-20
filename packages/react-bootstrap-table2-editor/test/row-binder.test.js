import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import _ from 'react-bootstrap-table-next/src/utils';
import op from 'react-bootstrap-table-next/src/store/operators';

import cellEditFactory from '../index';
import { CLICK_TO_CELL_EDIT, DBCLICK_TO_CELL_EDIT, DELAY_FOR_DBCLICK } from '../src/const';
import createCellEditContext from '../src/context';
import bindCellEditing from '../src/row-binder';

describe('Row Binder', () => {
  let wrapper;
  let cellEdit;
  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];
  const row = { id: 1, name: 'A' };
  const keyField = 'id';
  const value = _.get(row, keyField);

  const { Provider } = createCellEditContext(_, op, false, jest.fn());
  const BaseComponent = () => null;

  describe('if cellEdit.nonEditableRows is undefined', () => {
    beforeEach(() => {
      const WithCellEditComponent = bindCellEditing(
        props => <BaseComponent { ...props } />,
        false
      );
      cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
      wrapper = mount(
        <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
          <WithCellEditComponent value={ value } />
        </Provider>
      );
    });

    it('should inject correct props to target component', () => {
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      expect(wrapper.find(BaseComponent).prop('editingRowIdx')).toBeNull();
      expect(wrapper.find(BaseComponent).prop('editingColIdx')).toBeNull();
      expect(wrapper.find(BaseComponent).prop('editable')).toBeTruthy();
    });
  });

  describe('if cellEdit.nonEditableRows is defined', () => {
    const nonEditableRows = jest.fn().mockReturnValue([value]);
    describe('if value prop is match in one of cellEdit.nonEditableRows', () => {
      beforeEach(() => {
        const WithCellEditComponent = bindCellEditing(
          props => <BaseComponent { ...props } />,
          false
        );
        cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT, nonEditableRows });
        wrapper = mount(
          <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
            <WithCellEditComponent value={ value } />
          </Provider>
        );
      });

      it('should inject correct editable prop as false to target component', () => {
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        expect(wrapper.find(BaseComponent).prop('editable')).toBeFalsy();
      });
    });

    describe('if value prop is not match in one of cellEdit.nonEditableRows', () => {
      beforeEach(() => {
        const WithCellEditComponent = bindCellEditing(
          props => <BaseComponent { ...props } />,
          false
        );
        cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT, nonEditableRows });
        wrapper = mount(
          <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
            <WithCellEditComponent value={ 2 } />
          </Provider>
        );
      });

      it('should inject correct editable prop as false to target component', () => {
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        expect(wrapper.find(BaseComponent).prop('editable')).toBeTruthy();
      });
    });
  });

  describe(`if selectRowEnabled argument is true and cellEdit.mode is ${DBCLICK_TO_CELL_EDIT}`, () => {
    beforeEach(() => {
      const WithCellEditComponent = bindCellEditing(
        props => <BaseComponent { ...props } />,
        true
      );
      cellEdit = cellEditFactory({ mode: DBCLICK_TO_CELL_EDIT });
      wrapper = mount(
        <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
          <WithCellEditComponent value={ value } />
        </Provider>
      );
    });

    it('should inject correct DELAY_FOR_DBCLICK prop to target component', () => {
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      expect(wrapper.find(BaseComponent).prop('DELAY_FOR_DBCLICK')).toEqual(DELAY_FOR_DBCLICK);
    });
  });

  describe('if cellEdit.ridx and cellEdit.cidx are defined', () => {
    const ridx = 0;
    const cidx = 1;
    beforeEach(() => {
      const WithCellEditComponent = bindCellEditing(
        props => <BaseComponent { ...props } />,
        false
      );
      cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
      wrapper = mount(
        <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
          <WithCellEditComponent value={ value } />
        </Provider>
      );
      wrapper.instance().startEditing(ridx, cidx);
      wrapper.update();
    });

    it('should inject correct editable prop as false to target component', () => {
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      expect(wrapper.find(BaseComponent).prop('editingRowIdx')).toEqual(ridx);
      expect(wrapper.find(BaseComponent).prop('editingColIdx')).toEqual(cidx);
    });
  });
});
