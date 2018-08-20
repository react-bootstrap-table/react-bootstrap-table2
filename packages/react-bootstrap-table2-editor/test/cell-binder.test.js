import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';
import _ from 'react-bootstrap-table-next/src/utils';
import op from 'react-bootstrap-table-next/src/store/operators';

import cellEditFactory from '../index';
import { CLICK_TO_CELL_EDIT, DBCLICK_TO_CELL_EDIT } from '../src/const';
import createCellEditContext from '../src/context';
import bindCellEditing from '../src/cell-binder';

describe('Cell Binder', () => {
  let wrapper;
  let cellEdit;
  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];
  let columns;
  const rowIndex = 1;
  const row = { id: 1, name: 'A' };
  const keyField = 'id';
  const columnIndex = 1;

  const { Provider } = createCellEditContext(_, op, false, jest.fn());
  const BaseComponent = () => null;
  const WithCellEditComponent = bindCellEditing(
    props => <BaseComponent { ...props } />,
    keyField,
    _
  );

  beforeEach(() => {
    columns = [{
      dataField: 'id',
      text: 'ID'
    }, {
      dataField: 'name',
      text: 'Name'
    }];
  });

  describe(`if cellEdit.mode is ${CLICK_TO_CELL_EDIT}`, () => {
    beforeEach(() => {
      cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
      wrapper = mount(
        <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
          <WithCellEditComponent
            row={ row }
            column={ columns[1] }
            rowIndex={ rowIndex }
            columnIndex={ columnIndex }
          />
        </Provider>
      );
    });

    it('should inject correct props to target component', () => {
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      expect(wrapper.find(BaseComponent).prop('clickToEdit')).toBeTruthy();
      expect(wrapper.find(BaseComponent).prop('dbclickToEdit')).toBeFalsy();
    });
  });

  describe(`if cellEdit.mode is ${DBCLICK_TO_CELL_EDIT}`, () => {
    beforeEach(() => {
      cellEdit = cellEditFactory({ mode: DBCLICK_TO_CELL_EDIT });
      wrapper = mount(
        <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
          <WithCellEditComponent
            row={ row }
            column={ columns[1] }
            rowIndex={ rowIndex }
            columnIndex={ columnIndex }
          />
        </Provider>
      );
    });

    it('should inject correct props to target component', () => {
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      expect(wrapper.find(BaseComponent).prop('clickToEdit')).toBeFalsy();
      expect(wrapper.find(BaseComponent).prop('dbclickToEdit')).toBeTruthy();
    });
  });

  describe('if column prop is a key column', () => {
    beforeEach(() => {
      cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
      wrapper = mount(
        <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
          <WithCellEditComponent
            row={ row }
            column={ columns[0] }
            rowIndex={ rowIndex }
            columnIndex={ columnIndex }
            editable
          />
        </Provider>
      );
    });

    it('should inject negative editable prop to target component', () => {
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      expect(wrapper.find(BaseComponent).prop('editable')).toBeFalsy();
    });
  });

  describe('if editable prop is true(Row Level)', () => {
    describe('but column.editable prop is false', () => {
      beforeEach(() => {
        cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
        columns[1].editable = false;
        wrapper = mount(
          <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
            <WithCellEditComponent
              row={ row }
              column={ columns[1] }
              rowIndex={ rowIndex }
              columnIndex={ columnIndex }
              editable
            />
          </Provider>
        );
      });

      it('should inject negative editable prop to target component', () => {
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        expect(wrapper.find(BaseComponent).prop('editable')).toBeFalsy();
      });
    });

    describe('and column.editable prop is true or not defined', () => {
      beforeEach(() => {
        cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
        wrapper = mount(
          <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
            <WithCellEditComponent
              row={ row }
              column={ columns[1] }
              rowIndex={ rowIndex }
              columnIndex={ columnIndex }
              editable
            />
          </Provider>
        );
      });

      it('should inject positive editable prop to target component', () => {
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        expect(wrapper.find(BaseComponent).prop('editable')).toBeTruthy();
      });
    });
  });

  describe('if editable prop is false(Row Level)', () => {
    describe('even if column.editable prop is true or not defined', () => {
      beforeEach(() => {
        cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
        columns[1].editable = true;
        wrapper = mount(
          <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
            <WithCellEditComponent
              row={ row }
              column={ columns[1] }
              rowIndex={ rowIndex }
              columnIndex={ columnIndex }
              editable={ false }
            />
          </Provider>
        );
      });

      it('should inject negative editable prop to target component', () => {
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        expect(wrapper.find(BaseComponent).prop('editable')).toBeFalsy();
      });
    });
  });

  describe('if column.editable prop is a function', () => {
    beforeEach(() => {
      cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
      columns[1].editable = jest.fn().mockReturnValue(false);
      wrapper = mount(
        <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
          <WithCellEditComponent
            row={ row }
            column={ columns[1] }
            rowIndex={ rowIndex }
            columnIndex={ columnIndex }
            editable
          />
        </Provider>
      );
    });

    it('should call column.editable function correctly', () => {
      expect(columns[1].editable).toHaveBeenCalledTimes(1);
    });

    it('should inject correct editable prop to target component', () => {
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      expect(wrapper.find(BaseComponent).prop('editable')).toBeFalsy();
    });
  });
});
