import 'jsdom-global/register';
import React from 'react';
import { mount, shallow } from 'enzyme';
import _ from 'react-bootstrap-table-next/src/utils';

import cellEditFactory from '../index';
import { CLICK_TO_CELL_EDIT } from '../src/const';
import createCellEditContext from '../src/context';
import bindEditingCell from '../src/editing-cell-binder';

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

  const { Provider } = createCellEditContext(_);
  const WithCellEditComponent = bindEditingCell(_);

  beforeEach(() => {
    columns = [{
      dataField: 'id',
      text: 'ID'
    }, {
      dataField: 'name',
      text: 'Name'
    }];
  });

  describe('if column.editCellClasses is defined as string', () => {
    beforeEach(() => {
      cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
      columns[1].editCellClasses = 'test-class-1';
      wrapper = shallow(
        <Provider data={ data } keyField={ keyField } cellEdit={ cellEdit }>
          <WithCellEditComponent
            row={ row }
            column={ columns[1] }
            rowIndex={ rowIndex }
            columnIndex={ columnIndex }
          />
        </Provider>
      );
      wrapper = wrapper.render();
    });

    it('should inject className target component correctly', () => {
      expect(wrapper.hasClass(`${columns[1].editCellClasses}`)).toBeTruthy();
    });
  });

  describe('if column.editCellStyle is defined as object', () => {
    beforeEach(() => {
      cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
      columns[1].editCellStyle = { color: 'pink' };
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

    it('should inject style target component correctly', () => {
      expect(wrapper.find('.react-bootstrap-table-editing-cell').prop('style')).toEqual(columns[1].editCellStyle);
    });
  });

  describe('if column.editCellClasses is defined as function', () => {
    const className = 'test-class-1';

    beforeEach(() => {
      cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
      columns[1].editCellClasses = jest.fn().mockReturnValue(className);
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

    it('should inject empty className and style to target component', () => {
      expect(wrapper.find(className)).toBeTruthy();
    });

    it('should call column.editCellClasses function correctly', () => {
      expect(columns[1].editCellClasses).toHaveBeenCalledTimes(1);
      expect(columns[1].editCellClasses).toHaveBeenCalledWith(
        _.get(row, columns[1].dataField),
        row,
        rowIndex,
        columnIndex
      );
    });
  });

  describe('if column.editCellStyle is defined as function', () => {
    const style = { color: 'blue' };
    beforeEach(() => {
      cellEdit = cellEditFactory({ mode: CLICK_TO_CELL_EDIT });
      columns[1].editCellStyle = jest.fn().mockReturnValue(style);
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

    it('should inject style target component correctly', () => {
      expect(wrapper.find('.react-bootstrap-table-editing-cell').prop('style')).toEqual(style);
    });

    it('should call column.editCellStyle function correctly', () => {
      expect(columns[1].editCellStyle).toHaveBeenCalledTimes(1);
      expect(columns[1].editCellStyle).toHaveBeenCalledWith(
        _.get(row, columns[1].dataField),
        row,
        rowIndex,
        columnIndex
      );
    });
  });
});
