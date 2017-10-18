import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Cell from '../src/cell';
import Row from '../src/row';
import Const from '../src/const';
import EditingCell from '../src/cell-edit/editing-cell';
import SelectionCell from '../src//row-selection/selection-cell';
import mockBodyResolvedProps from './test-helpers/mock/body-resolved-props';

const defaultColumns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: 'Name'
}, {
  dataField: 'price',
  text: 'Price'
}];

describe('Row', () => {
  let wrapper;

  const row = {
    id: 1,
    name: 'A',
    price: 1000
  };

  describe('simplest row', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Row { ...mockBodyResolvedProps } rowIndex={ 1 } columns={ defaultColumns } row={ row } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find(Cell).length).toBe(Object.keys(row).length);
    });
  });

  describe('when cellEdit prop is defined', () => {
    let columns;
    let cellEdit;
    const rowIndex = 1;
    const keyField = 'id';

    beforeEach(() => {
      columns = defaultColumns;
      cellEdit = {
        mode: Const.CLICK_TO_CELL_EDIT
      };
      wrapper = shallow(
        <Row
          { ...mockBodyResolvedProps }
          row={ row }
          rowIndex={ rowIndex }
          columns={ columns }
          keyField={ keyField }
          cellEdit={ cellEdit }
        />
      );
    });

    afterEach(() => {
      columns = undefined;
      cellEdit = undefined;
    });

    it('Cell component should receive correct editable props', () => {
      expect(wrapper.length).toBe(1);
      for (let i = 0; i < columns.length; i += 1) {
        const column = columns[i];
        if (column.dataField === keyField) {
          expect(wrapper.find(Cell).get(i).props.editable).toBeFalsy();
        } else {
          expect(wrapper.find(Cell).get(i).props.editable).toBeTruthy();
        }
      }
    });

    it('Cell component should receive correct editMode props', () => {
      expect(wrapper.length).toBe(1);
      for (let i = 0; i < columns.length; i += 1) {
        expect(wrapper.find(Cell).get(i).props.editMode).toEqual(cellEdit.mode);
      }
    });

    describe('and column.editable defined false', () => {
      const nonEditableColIndex = 1;
      beforeEach(() => {
        columns[nonEditableColIndex].editable = false;
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            row={ row }
            rowIndex={ rowIndex }
            columns={ columns }
            keyField={ keyField }
            cellEdit={ cellEdit }
          />
        );
      });

      it('Cell component should receive correct editable props', () => {
        expect(wrapper.length).toBe(1);
        for (let i = 0; i < columns.length; i += 1) {
          const column = columns[i];
          if (i === nonEditableColIndex || column.dataField === keyField) {
            expect(wrapper.find(Cell).get(i).props.editable).toBeFalsy();
          } else {
            expect(wrapper.find(Cell).get(i).props.editable).toBeTruthy();
          }
        }
      });
    });

    describe('and column.editable defined as function', () => {
      const nonEditableColIndex = 1;
      let editableCallBack;

      afterEach(() => {
        editableCallBack.reset();
      });

      describe('which return false', () => {
        beforeEach(() => {
          editableCallBack = sinon.stub().returns(false);
          columns[nonEditableColIndex].editable = editableCallBack;
          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              row={ row }
              rowIndex={ rowIndex }
              columns={ columns }
              keyField={ keyField }
              cellEdit={ cellEdit }
            />
          );
        });

        it('column.editable callback function should be called once', () => {
          expect(editableCallBack.callCount).toBe(1);
        });

        it('Cell component should receive correct editable props', () => {
          expect(wrapper.length).toBe(1);
          for (let i = 0; i < columns.length; i += 1) {
            const column = columns[i];
            if (i === nonEditableColIndex || column.dataField === keyField) {
              expect(wrapper.find(Cell).get(i).props.editable).toBeFalsy();
            } else {
              expect(wrapper.find(Cell).get(i).props.editable).toBeTruthy();
            }
          }
        });
      });

      describe('which return true', () => {
        beforeEach(() => {
          editableCallBack = sinon.stub().returns(true);
          columns[nonEditableColIndex].editable = editableCallBack;
          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              row={ row }
              rowIndex={ rowIndex }
              columns={ columns }
              keyField={ keyField }
              cellEdit={ cellEdit }
            />
          );
        });

        it('column.editable callback function should be called once', () => {
          expect(editableCallBack.callCount).toBe(1);
        });

        it('Cell component should receive correct editable props', () => {
          expect(wrapper.length).toBe(1);
          for (let i = 0; i < columns.length; i += 1) {
            const column = columns[i];
            if (column.dataField === keyField) {
              expect(wrapper.find(Cell).get(i).props.editable).toBeFalsy();
            } else {
              expect(wrapper.find(Cell).get(i).props.editable).toBeTruthy();
            }
          }
        });
      });
    });

    // Means user defined cellEdit.nonEditableRows
    // and some rows will be treated as noneditable by this rules
    describe('when editable prop is false', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            row={ row }
            rowIndex={ rowIndex }
            columns={ columns }
            keyField={ keyField }
            cellEdit={ cellEdit }
            editable={ false }
          />
        );
      });

      it('All the Cell components should be noneditable', () => {
        expect(wrapper.length).toBe(1);
        for (let i = 0; i < columns.length; i += 1) {
          expect(wrapper.find(Cell).get(i).props.editable).toBeFalsy();
        }
      });
    });

    // Means a cell now is undering editing
    describe('when cellEdit.ridx and cellEdit.cidx is defined', () => {
      describe('and cellEdit.ridx is match to current row index', () => {
        const editingColIndex = 1;
        beforeEach(() => {
          cellEdit.ridx = rowIndex;
          cellEdit.cidx = editingColIndex;
          cellEdit.onUpdate = sinon.stub();
          cellEdit.onEscape = sinon.stub();
          cellEdit.onUpdate = sinon.stub();
          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              row={ row }
              rowIndex={ 1 }
              columns={ columns }
              keyField={ keyField }
              cellEdit={ cellEdit }
              editable={ false }
            />
          );
        });

        it('should render EditingCell correctly', () => {
          const complexComponents = wrapper.find('tr').children().findWhere(
            n => n.type().name === 'Cell' || n.type().name === 'EditingCell');

          expect(wrapper.length).toBe(1);
          expect(wrapper.find(EditingCell).length).toBe(1);
          expect(complexComponents.at(editingColIndex).type()).toEqual(EditingCell);
        });
      });

      describe('and cellEdit.ridx is not match to current row index', () => {
        const editingColIndex = 1;
        beforeEach(() => {
          cellEdit.ridx = 3;
          cellEdit.cidx = editingColIndex;
          cellEdit.onUpdate = sinon.stub();
          cellEdit.onEscape = sinon.stub();
          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              row={ row }
              rowIndex={ 1 }
              columns={ columns }
              keyField={ keyField }
              cellEdit={ cellEdit }
              editable={ false }
            />
          );
        });

        it('should not render any EditingCell component', () => {
          expect(wrapper.length).toBe(1);
          expect(wrapper.find(EditingCell).length).toBe(0);
          expect(wrapper.find(Cell).length).toBe(columns.length);
        });
      });
    });
  });

  describe('when selectRow.mode is ROW_SELECT_DISABLED (row was un-selectable)', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Row { ...mockBodyResolvedProps } rowIndex={ 1 } columns={ defaultColumns } row={ row } />);
    });

    it('should not render <SelectionCell />', () => {
      expect(wrapper.find(SelectionCell).length).toBe(0);
    });
  });

  describe('when selectRow.mode is checkbox or radio (row was selectable)', () => {
    beforeEach(() => {
      const selectRow = { mode: 'checkbox' };
      wrapper = shallow(
        <Row
          { ...mockBodyResolvedProps }
          rowIndex={ 1 }
          columns={ defaultColumns }
          row={ row }
          selectRow={ selectRow }
        />);
    });

    it('should render <SelectionCell />', () => {
      expect(wrapper.find(SelectionCell).length).toBe(1);
    });
  });
});
