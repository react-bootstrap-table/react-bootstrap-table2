import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Cell from '../src/cell';
import Row from '../src/row';
import Const from '../src/const';
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

const keyField = 'id';
const rowIndex = 1;

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
        <Row
          { ...mockBodyResolvedProps }
          keyField={ keyField }
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
        />
      );
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('tr').length).toBe(1);
      expect(wrapper.find(Cell).length).toBe(Object.keys(row).length);
    });
  });

  describe('when style prop is defined', () => {
    const customStyle = { backgroundColor: 'red' };
    beforeEach(() => {
      wrapper = shallow(
        <Row
          { ...mockBodyResolvedProps }
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
          style={ customStyle }
        />);
    });

    it('should render component with style successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.prop('style')).toEqual(customStyle);
    });
  });

  describe('when className prop is defined', () => {
    const className = 'test-class';
    beforeEach(() => {
      wrapper = shallow(
        <Row
          { ...mockBodyResolvedProps }
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
          className={ className }
        />);
    });

    it('should render component with className successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.hasClass(className)).toBe(true);
    });
  });

  describe('when cellEdit prop is defined', () => {
    let columns;
    let cellEdit;

    beforeEach(() => {
      columns = defaultColumns;
      cellEdit = {
        mode: 'click',
        CLICK_TO_CELL_EDIT: 'click',
        DBCLICK_TO_CELL_EDIT: 'dbclick'
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

    it('Cell component should receive correct clickToEdit props', () => {
      expect(wrapper.length).toBe(1);
      for (let i = 0; i < columns.length; i += 1) {
        expect(wrapper.find(Cell).get(i).props.clickToEdit).toBeTruthy();
      }
    });

    it('Cell component should receive correct dbclickToEdit props', () => {
      expect(wrapper.length).toBe(1);
      for (let i = 0; i < columns.length; i += 1) {
        expect(wrapper.find(Cell).get(i).props.dbclickToEdit).toBeFalsy();
      }
    });

    describe('when props.cellEdit.mode is dbclick', () => {
      beforeEach(() => {
        cellEdit.mode = cellEdit.DBCLICK_TO_CELL_EDIT;
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

      it('Cell component should receive correct clickToEdit props', () => {
        expect(wrapper.length).toBe(1);
        for (let i = 0; i < columns.length; i += 1) {
          expect(wrapper.find(Cell).get(i).props.clickToEdit).toBeFalsy();
        }
      });

      it('Cell component should receive correct dbclickToEdit props', () => {
        expect(wrapper.length).toBe(1);
        for (let i = 0; i < columns.length; i += 1) {
          expect(wrapper.find(Cell).get(i).props.dbclickToEdit).toBeTruthy();
        }
      });
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
      const EditingCell = () => null;
      describe('and cellEdit.ridx is match to current row index', () => {
        const editingColIndex = 1;
        beforeEach(() => {
          cellEdit.ridx = rowIndex;
          cellEdit.cidx = editingColIndex;
          cellEdit.onUpdate = sinon.stub();
          cellEdit.onEscape = sinon.stub();
          cellEdit.EditingCell = EditingCell;
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

        it('should render EditingCell correctly', () => {
          const complexComponents = wrapper.find('tr').children().findWhere(
            n => n.type().name === 'Cell' || n.type().name === 'EditingCell');

          expect(wrapper.length).toBe(1);
          expect(wrapper.find(EditingCell).length).toBe(1);
          expect(complexComponents.at(editingColIndex).type()).toEqual(EditingCell);
        });

        describe('if column.editCellStyle defined as object', () => {
          const definedStyleColIndex = editingColIndex;

          beforeEach(() => {
            columns[definedStyleColIndex].editCellStyle = { backgroundColor: 'red' };
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

          it('should also rendering EditingCell with correct style object', () => {
            expect(wrapper.find(EditingCell).length).toBe(1);
            expect(wrapper.find(EditingCell).props().style)
              .toEqual(columns[definedStyleColIndex].editCellStyle);
          });
        });

        describe('if column.editCellStyle defined as function', () => {
          const definedStyleColIndex = editingColIndex;
          const customStyle = { backgroundColor: 'red' };
          let editCellStyleCallBack;

          beforeEach(() => {
            editCellStyleCallBack = sinon.stub().returns(customStyle);
            columns[definedStyleColIndex].editCellStyle = editCellStyleCallBack;
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

          it('should calling custom column.editCellStyle callback correctly', () => {
            expect(editCellStyleCallBack.callCount).toBe(1);
            expect(
              editCellStyleCallBack.calledWith(
                row[columns[editingColIndex].dataField], row, rowIndex, editingColIndex)
            ).toBe(true);
          });

          it('should also rendering EditingCell with correct style object', () => {
            expect(wrapper.find(EditingCell).length).toBe(1);
            expect(wrapper.find(EditingCell).props().style).toEqual(customStyle);
          });
        });

        describe('if column.editCellClasses defined as string', () => {
          const definedStyleColIndex = editingColIndex;

          beforeEach(() => {
            columns[definedStyleColIndex].editCellClasses = 'custom-class';
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

          it('should also rendering EditingCell with correct class', () => {
            expect(wrapper.find(EditingCell).length).toBe(1);
            expect(wrapper.find(EditingCell).props().className)
              .toEqual(columns[definedStyleColIndex].editCellClasses);
          });
        });

        describe('if column.editCellClasses defined as function', () => {
          const definedStyleColIndex = editingColIndex;
          const customClass = 'custom-class';
          let editCellClassesCallBack;

          beforeEach(() => {
            editCellClassesCallBack = sinon.stub().returns(customClass);
            columns[definedStyleColIndex].editCellClasses = editCellClassesCallBack;
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

          it('should calling custom column.editCellStyle callback correctly', () => {
            expect(editCellClassesCallBack.callCount).toBe(1);
            expect(
              editCellClassesCallBack.calledWith(
                row[columns[editingColIndex].dataField], row, rowIndex, editingColIndex)
            ).toBe(true);
          });

          it('should also rendering EditingCell with correct class', () => {
            expect(wrapper.find(EditingCell).length).toBe(1);
            expect(wrapper.find(EditingCell).props().className).toEqual(customClass);
          });
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

  describe('when attrs prop is defined', () => {
    const customClickCallBack = sinon.stub();
    const attrs = { 'data-index': 1, onClick: customClickCallBack };
    beforeEach(() => {
      wrapper = shallow(
        <Row
          { ...mockBodyResolvedProps }
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
          attrs={ attrs }
        />);
    });

    it('should render component with correct attributes', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.prop('data-index')).toBe(attrs['data-index']);
      expect(wrapper.prop('onClick')).toBeDefined();
    });
  });

  describe('when cloumn.hidden is true', () => {
    beforeEach(() => {
      const newColumns = [{
        dataField: 'id',
        text: 'ID',
        hidden: true
      }, {
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'price',
        text: 'Price'
      }];
      wrapper = shallow(
        <Row
          { ...mockBodyResolvedProps }
          rowIndex={ rowIndex }
          columns={ newColumns }
          row={ row }
        />);
    });

    it('should not render column with hidden value true', () => {
      expect(wrapper.find(Cell).length).toBe(2);
    });
  });

  describe('selectRow', () => {
    let selectRow;

    describe('when selectRow.mode is ROW_SELECT_DISABLED (row is not able to select)', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            rowIndex={ rowIndex }
            columns={ defaultColumns }
            row={ row }
          />
        );
      });

      it('should not render <SelectionCell />', () => {
        expect(wrapper.find(SelectionCell).length).toBe(0);
      });
    });

    describe('when selectRow.mode was defined  (single or multiple selection)', () => {
      describe('if selectRow.mode is radio (single selection)', () => {
        beforeEach(() => {
          selectRow = { mode: 'radio' };
          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              rowIndex={ rowIndex }
              columns={ defaultColumns }
              row={ row }
              selectRow={ selectRow }
              selected
              selectable
            />);
        });

        it('should render <SelectionCell />', () => {
          expect(wrapper.find(SelectionCell).length).toBe(1);
        });

        it('should render <SelectionCell /> with correct props', () => {
          expect(wrapper.find(SelectionCell).props().selected).toBeTruthy();
          expect(wrapper.find(SelectionCell).props().disabled).toBeFalsy();
          expect(wrapper.find(SelectionCell).props().mode).toEqual(selectRow.mode);
        });

        describe('when selectRow.hideSelectColumn is true', () => {
          beforeEach(() => {
            selectRow = { mode: 'radio', hideSelectColumn: true };
            wrapper = shallow(
              <Row
                { ...mockBodyResolvedProps }
                rowIndex={ rowIndex }
                columns={ defaultColumns }
                row={ row }
                selectRow={ selectRow }
              />);
          });

          it('should not render <SelectionCell />', () => {
            expect(wrapper.find(SelectionCell).length).toBe(0);
          });
        });
      });

      describe('if selectRow.mode is checkbox (multiple selection)', () => {
        beforeEach(() => {
          selectRow = { mode: 'checkbox' };
          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              rowIndex={ rowIndex }
              columns={ defaultColumns }
              row={ row }
              selectRow={ selectRow }
              selected
              selectable
            />);
        });

        it('should render <SelectionCell />', () => {
          expect(wrapper.find(SelectionCell).length).toBe(1);
        });

        it('should render <SelectionCell /> with correct props', () => {
          expect(wrapper.find(SelectionCell).props().selected).toBeTruthy();
          expect(wrapper.find(SelectionCell).props().disabled).toBeFalsy();
          expect(wrapper.find(SelectionCell).props().mode).toEqual(selectRow.mode);
        });

        describe('when selectRow.hideSelectColumn is true', () => {
          beforeEach(() => {
            selectRow = { mode: 'checkbox', hideSelectColumn: true };
            wrapper = shallow(
              <Row
                { ...mockBodyResolvedProps }
                rowIndex={ rowIndex }
                columns={ defaultColumns }
                row={ row }
                selectRow={ selectRow }
              />);
          });

          it('should not render <SelectionCell />', () => {
            expect(wrapper.find(SelectionCell).length).toBe(0);
          });
        });
      });

      describe('if selectable prop is false', () => {
        beforeEach(() => {
          selectRow = { mode: 'checkbox' };
          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              rowIndex={ rowIndex }
              columns={ defaultColumns }
              row={ row }
              keyField={ keyField }
              selectRow={ selectRow }
              selectable={ false }
            />);
        });

        it('should render SelectionCell component with correct disable prop correctly', () => {
          expect(wrapper.find(SelectionCell).length).toBe(1);
          expect(wrapper.find(SelectionCell).prop('disabled')).toBeTruthy();
        });
      });

      describe('if selectable prop is true', () => {
        beforeEach(() => {
          selectRow = { mode: 'checkbox' };
          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              rowIndex={ rowIndex }
              columns={ defaultColumns }
              row={ row }
              keyField={ keyField }
              selectRow={ selectRow }
              selectable
            />);
        });

        it('should render SelectionCell component with correct disable prop correctly', () => {
          expect(wrapper.find(SelectionCell).length).toBe(1);
          expect(wrapper.find(SelectionCell).prop('disabled')).toBeFalsy();
        });
      });

      describe('if selectRow.clickToSelect is true', () => {
        beforeEach(() => {
          selectRow = { mode: 'checkbox' };
          selectRow.clickToSelect = true;
          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              rowIndex={ rowIndex }
              columns={ defaultColumns }
              row={ row }
              selectRow={ selectRow }
              selected
              selectable
            />);
        });

        it('should render Row component successfully with onClick event', () => {
          expect(wrapper.length).toBe(1);
          expect(wrapper.find('tr').prop('onClick')).toBeDefined();
        });
      });
    });
  });

  describe('handleRowClick', () => {
    let selectRow;
    let onRowSelectCallBack;

    describe('selectable prop is false', () => {
      beforeEach(() => {
        onRowSelectCallBack = sinon.stub();
        selectRow = {
          mode: 'checkbox',
          clickToSelect: true,
          onRowSelect: onRowSelectCallBack
        };
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            rowIndex={ rowIndex }
            columns={ defaultColumns }
            row={ row }
            selectRow={ selectRow }
            selected
            selectable={ false }
          />);
        wrapper.find('tr').simulate('click');
      });

      it('should not calling selectRow.onRowSelect callback', () => {
        expect(onRowSelectCallBack.callCount).toEqual(0);
      });
    });

    describe('selectable prop is true', () => {
      describe('and selected prop is true', () => {
        beforeEach(() => {
          onRowSelectCallBack = sinon.stub();
          selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onRowSelect: onRowSelectCallBack
          };
          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              keyField={ keyField }
              rowIndex={ rowIndex }
              columns={ defaultColumns }
              row={ row }
              selectRow={ selectRow }
              selected
              selectable
            />);
          wrapper.find('tr').simulate('click');
        });

        it('should calling selectRow.onRowSelect callback', () => {
          expect(onRowSelectCallBack.callCount).toEqual(1);
        });

        it('should calling selectRow.onRowSelect with correct argument', () => {
          expect(onRowSelectCallBack.calledWith(row[keyField], false, rowIndex)).toBeTruthy();
        });
      });

      describe('and selected prop is false', () => {
        beforeEach(() => {
          onRowSelectCallBack = sinon.stub();
          selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            onRowSelect: onRowSelectCallBack
          };
          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              keyField={ keyField }
              rowIndex={ rowIndex }
              columns={ defaultColumns }
              row={ row }
              selectRow={ selectRow }
              selected={ false }
              selectable
            />);
          wrapper.find('tr').simulate('click');
        });

        it('should calling selectRow.onRowSelect callback', () => {
          expect(onRowSelectCallBack.callCount).toEqual(1);
        });

        it('should calling selectRow.onRowSelect with correct argument', () => {
          expect(onRowSelectCallBack.calledWith(row[keyField], true, rowIndex)).toBeTruthy();
        });
      });
    });

    describe('if cellEdit.mode is dbclick and selectRow.clickToEdit is true', () => {
      beforeEach(() => {
        onRowSelectCallBack = sinon.stub();
        const cellEdit = {
          mode: Const.DBCLICK_TO_CELL_EDIT,
          ridx: undefined,
          cidx: undefined,
          onStart: sinon.stub()
        };
        selectRow = {
          mode: 'checkbox',
          clickToSelect: true,
          clickToEdit: true,
          onRowSelect: onRowSelectCallBack
        };
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ defaultColumns }
            row={ row }
            selectRow={ selectRow }
            cellEdit={ cellEdit }
            selected
            selectable
          />);
        // console.log(wrapper.instance());
        const rowClick = wrapper.instance().createClickEventHandler();
        rowClick();
        rowClick();
      });

      it('should increase clickNum as 2', () => {
        expect(wrapper.instance().clickNum).toEqual(2);
      });
    });

    describe('when attrs.onClick prop is defined', () => {
      const customClickCallBack = sinon.stub();
      const attrs = { onClick: customClickCallBack };

      beforeEach(() => {
        onRowSelectCallBack = sinon.stub();
        selectRow = {
          mode: 'checkbox',
          clickToSelect: true,
          onRowSelect: onRowSelectCallBack
        };
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            rowIndex={ rowIndex }
            columns={ defaultColumns }
            row={ row }
            selectRow={ selectRow }
            attrs={ attrs }
            selected
            selectable
          />);
        wrapper.find('tr').simulate('click');
      });

      it('should calling attrs.onClick callback', () => {
        expect(customClickCallBack.callCount).toEqual(1);
      });

      it('should calling selectRow.onRowSelect callback', () => {
        expect(onRowSelectCallBack.callCount).toEqual(1);
      });
    });
  });
});
