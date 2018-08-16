import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Cell from '../src/cell';
import Row from '../src/row';
import Const from '../src/const';
import SelectionCell from '../src//row-selection/selection-cell';
import mockBodyResolvedProps from './test-helpers/mock/body-resolved-props';

let defaultColumns = [{
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

  beforeEach(() => {
    defaultColumns = [{
      dataField: 'id',
      text: 'ID'
    }, {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'price',
      text: 'Price'
    }];
  });

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

  describe('when column.hidden is true', () => {
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

  describe('when column.style prop is defined', () => {
    let columns;
    const columnIndex = 1;

    beforeEach(() => {
      columns = [...defaultColumns];
    });

    describe('when style is an object', () => {
      beforeEach(() => {
        columns[columnIndex].style = { backgroundColor: 'red' };
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find(Cell).get(columnIndex).props.style).toEqual(columns[columnIndex].style);
      });
    });

    describe('when style is a function', () => {
      const returnStyle = { backgroundColor: 'red' };
      let styleCallBack;

      beforeEach(() => {
        styleCallBack = sinon.stub().returns(returnStyle);
        columns[columnIndex].style = styleCallBack;
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      afterEach(() => { styleCallBack.reset(); });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find(Cell).get(columnIndex).props.style).toEqual(returnStyle);
      });

      it('should call custom style function correctly', () => {
        expect(styleCallBack.callCount).toBe(1);
        expect(
          styleCallBack.calledWith(row[columns[columnIndex].dataField], row, rowIndex, columnIndex)
        ).toBe(true);
      });
    });
  });

  describe('when column.classes prop is defined', () => {
    let columns;
    const columnIndex = 1;

    beforeEach(() => {
      columns = [...defaultColumns];
    });

    describe('when classes is an object', () => {
      beforeEach(() => {
        columns[columnIndex].classes = 'td-test-class';
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find(Cell).get(columnIndex).props.className)
          .toEqual(columns[columnIndex].classes);
      });
    });

    describe('when classes is a function', () => {
      const returnClasses = 'td-test-class';
      let classesCallBack;

      beforeEach(() => {
        classesCallBack = sinon.stub().returns(returnClasses);
        columns[columnIndex].classes = classesCallBack;
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      afterEach(() => { classesCallBack.reset(); });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find(Cell).get(columnIndex).props.className).toEqual(returnClasses);
      });

      it('should call custom classes function correctly', () => {
        expect(classesCallBack.callCount).toBe(1);
        expect(
          classesCallBack.calledWith(
            row[columns[columnIndex].dataField], row, rowIndex, columnIndex)
        ).toBe(true);
      });
    });
  });

  describe('when column.title prop is defined', () => {
    let columns;
    const columnIndex = 1;

    beforeEach(() => {
      columns = [...defaultColumns];
    });

    describe('when title is an string', () => {
      beforeEach(() => {
        columns[columnIndex].title = true;
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find(Cell).get(columnIndex).props.title)
          .toEqual(row[columns[columnIndex].dataField]);
      });
    });

    describe('when title is a function', () => {
      const returnTitle = 'test title';
      let titleCallBack;

      beforeEach(() => {
        titleCallBack = sinon.stub().returns(returnTitle);
        columns[columnIndex].title = titleCallBack;
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      afterEach(() => { titleCallBack.reset(); });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find(Cell).get(columnIndex).props.title).toEqual(returnTitle);
      });

      it('should call custom title function correctly', () => {
        expect(titleCallBack.callCount).toBe(1);
        expect(
          titleCallBack.calledWith(
            row[columns[columnIndex].dataField], row, rowIndex, columnIndex)
        ).toBe(true);
      });
    });
  });

  describe('when column.events prop is defined', () => {
    let columns;
    const columnIndex = 1;

    beforeEach(() => {
      columns = [...defaultColumns];
      columns[columnIndex].events = {
        onClick: sinon.stub()
      };

      wrapper = shallow(
        <Row
          { ...mockBodyResolvedProps }
          keyField={ keyField }
          rowIndex={ rowIndex }
          columns={ columns }
          row={ row }
        />
      );
    });

    it('should attachs DOM event successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find(Cell).get(columnIndex).props.onClick).toBeDefined();
    });
  });

  describe('when column.align prop is defined', () => {
    let columns;
    const columnIndex = 1;

    beforeEach(() => {
      columns = [...defaultColumns];
    });

    describe('when align is a string', () => {
      beforeEach(() => {
        columns[columnIndex].align = 'right';
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find(Cell).get(columnIndex).props.style.textAlign)
          .toEqual(columns[columnIndex].align);
      });
    });

    describe('when align is a function', () => {
      const returnAlign = 'right';
      let alignCallBack;

      beforeEach(() => {
        alignCallBack = sinon.stub().returns(returnAlign);
        columns[columnIndex].align = alignCallBack;
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      afterEach(() => { alignCallBack.reset(); });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find(Cell).get(columnIndex).props.style.textAlign).toEqual(returnAlign);
      });

      it('should call custom align function correctly', () => {
        expect(alignCallBack.callCount).toBe(1);
        expect(
          alignCallBack.calledWith(row[columns[columnIndex].dataField], row, rowIndex, columnIndex)
        ).toBe(true);
      });
    });
  });

  describe('when column.attrs prop is defined', () => {
    let columns;
    const columnIndex = 1;

    beforeEach(() => {
      columns = [...defaultColumns];
    });

    describe('when attrs is an object', () => {
      it('should render Cell correctly', () => {
        columns[columnIndex].attrs = {
          'data-test': 'test',
          title: 'title',
          className: 'attrs-class',
          style: {
            backgroundColor: 'attrs-style-test',
            display: 'none',
            textAlign: 'right'
          }
        };

        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );

        expect(wrapper.length).toBe(1);
        expect(wrapper.find(Cell).get(columnIndex).props['data-test'])
          .toEqual(columns[columnIndex].attrs['data-test']);
        expect(wrapper.find(Cell).get(columnIndex).props.title)
          .toEqual(columns[columnIndex].attrs.title);
        expect(wrapper.find(Cell).get(columnIndex).props.className)
          .toEqual(columns[columnIndex].attrs.className);
        expect(wrapper.find(Cell).get(columnIndex).props.style)
          .toEqual(columns[columnIndex].attrs.style);
      });

      describe('when column.title prop is defined', () => {
        it('attrs.title should be overwrited', () => {
          columns[columnIndex].title = true;
          columns[columnIndex].attrs = { title: 'title' };

          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              keyField={ keyField }
              rowIndex={ rowIndex }
              columns={ columns }
              row={ row }
            />
          );

          expect(wrapper.find(Cell).get(columnIndex).props.title)
            .toEqual(row[columns[columnIndex].dataField]);
        });
      });

      describe('when column.classes prop is defined', () => {
        it('attrs.className should be overwrited', () => {
          columns[columnIndex].classes = 'td-test-class';
          columns[columnIndex].attrs = { className: 'attrs-class' };

          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              keyField={ keyField }
              rowIndex={ rowIndex }
              columns={ columns }
              row={ row }
            />
          );

          expect(wrapper.find(Cell).get(columnIndex).props.className)
            .toEqual(columns[columnIndex].classes);
        });
      });

      describe('when column.style prop is defined', () => {
        it('attrs.style should be overwrited', () => {
          columns[columnIndex].style = { backgroundColor: 'red' };
          columns[columnIndex].attrs = { style: { backgroundColor: 'attrs-style-test' } };

          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              keyField={ keyField }
              rowIndex={ rowIndex }
              columns={ columns }
              row={ row }
            />
          );

          expect(wrapper.find(Cell).get(columnIndex).props.style)
            .toEqual(columns[columnIndex].style);
        });
      });

      describe('when column.align prop is defined', () => {
        it('attrs.style.textAlign should be overwrited', () => {
          columns[columnIndex].align = 'center';
          columns[columnIndex].attrs = { style: { textAlign: 'right' } };

          wrapper = shallow(
            <Row
              { ...mockBodyResolvedProps }
              keyField={ keyField }
              rowIndex={ rowIndex }
              columns={ columns }
              row={ row }
            />
          );

          expect(wrapper.find(Cell).get(columnIndex).props.style.textAlign)
            .toEqual(columns[columnIndex].align);
        });
      });
    });

    describe('when attrs is custom function', () => {
      let attrsCallBack;
      const customAttrs = {
        'data-test': 'test',
        title: 'title'
      };

      beforeEach(() => {
        attrsCallBack = sinon.stub().returns(customAttrs);
        columns[columnIndex].attrs = attrsCallBack;
        wrapper = shallow(
          <Row
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      it('should render style.attrs correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find(Cell).get(columnIndex).props['data-test'])
          .toEqual(customAttrs['data-test']);
        expect(wrapper.find(Cell).get(columnIndex).props.title)
          .toEqual(customAttrs.title);
      });

      it('should call custom attrs function correctly', () => {
        expect(attrsCallBack.callCount).toBe(1);
        expect(
          attrsCallBack.calledWith(row[columns[columnIndex].dataField], row, rowIndex, columnIndex)
        ).toBe(true);
      });
    });
  });
});
