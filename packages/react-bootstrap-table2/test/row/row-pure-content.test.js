import React from 'react';
import { shallow } from 'enzyme';

import Cell from '../../src/cell';
import RowPureContent from '../../src/row/row-pure-content';
import mockBodyResolvedProps from '../test-helpers/mock/body-resolved-props';

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

describe('RowPureContent', () => {
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

  describe('shouldComponentUpdate', () => {
    let props;
    let nextProps;

    describe('if nextProps.shouldUpdate is different with this.props.shouldUpdate', () => {
      beforeEach(() => {
        props = {
          keyField,
          columns: defaultColumns,
          rowIndex: 1,
          row,
          shouldUpdate: false
        };
        wrapper = shallow(
          <RowPureContent { ...props } />
        );
      });

      it('should return true', () => {
        nextProps = { ...props, shouldUpdate: true };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('if nextProps.shouldUpdate is same with this.props.shouldUpdate', () => {
      beforeEach(() => {
        props = {
          keyField,
          columns: defaultColumns,
          rowIndex: 1,
          row,
          shouldUpdate: false
        };
        wrapper = shallow(
          <RowPureContent { ...props } />
        );
      });

      it('should return false', () => {
        nextProps = { ...props };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(false);
      });
    });
  });

  describe('simplest row', () => {
    beforeEach(() => {
      wrapper = shallow(
        <RowPureContent
          keyField={ keyField }
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
        />
      );
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(defaultColumns.length);
      expect(wrapper.find(Cell).length).toBe(Object.keys(row).length);
    });
  });

  describe('when editingRowIdx and editingColIdx prop is defined', () => {
    const editingRowIdx = rowIndex;
    const editingColIdx = 1;
    const EditingCellComponent = () => null;
    beforeEach(() => {
      wrapper = shallow(
        <RowPureContent
          keyField={ keyField }
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
          EditingCellComponent={ EditingCellComponent }
          editingRowIdx={ editingRowIdx }
          editingColIdx={ editingColIdx }
        />);
    });

    it('should render EditingCell component correctly', () => {
      const EditingCell = wrapper.find(EditingCellComponent);
      expect(wrapper.length).toBe(defaultColumns.length);
      expect(EditingCell).toHaveLength(1);
      expect(EditingCell.prop('row')).toEqual(row);
      expect(EditingCell.prop('rowIndex')).toEqual(editingRowIdx);
      expect(EditingCell.prop('column')).toEqual(defaultColumns[editingColIdx]);
      expect(EditingCell.prop('columnIndex')).toEqual(editingColIdx);
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
        <RowPureContent
          keyField={ keyField }
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
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(defaultColumns.length);
        expect(wrapper.find(Cell).get(columnIndex).props.style).toEqual(columns[columnIndex].style);
      });
    });

    describe('when style is a function', () => {
      const returnStyle = { backgroundColor: 'red' };
      let styleCallBack;

      beforeEach(() => {
        styleCallBack = jest.fn().mockReturnValue(returnStyle);
        columns[columnIndex].style = styleCallBack;
        wrapper = shallow(
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      afterEach(() => { styleCallBack.mockClear(); });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(defaultColumns.length);
        expect(wrapper.find(Cell).get(columnIndex).props.style).toEqual(returnStyle);
      });

      it('should call custom style function correctly', () => {
        expect(styleCallBack).toHaveBeenCalledTimes(1);
        expect(styleCallBack).toHaveBeenCalledWith(
          row[columns[columnIndex].dataField], row, rowIndex, columnIndex);
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
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(defaultColumns.length);
        expect(wrapper.find(Cell).get(columnIndex).props.className)
          .toEqual(columns[columnIndex].classes);
      });
    });

    describe('when classes is a function', () => {
      const returnClasses = 'td-test-class';
      let classesCallBack;

      beforeEach(() => {
        classesCallBack = jest.fn().mockReturnValue(returnClasses);
        columns[columnIndex].classes = classesCallBack;
        wrapper = shallow(
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      afterEach(() => { classesCallBack.mockClear(); });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(defaultColumns.length);
        expect(wrapper.find(Cell).get(columnIndex).props.className).toEqual(returnClasses);
      });

      it('should call custom classes function correctly', () => {
        expect(classesCallBack).toHaveBeenCalledTimes(1);
        expect(classesCallBack).toHaveBeenCalledWith(
          row[columns[columnIndex].dataField], row, rowIndex, columnIndex);
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
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(defaultColumns.length);
        expect(wrapper.find(Cell).get(columnIndex).props.title)
          .toEqual(row[columns[columnIndex].dataField]);
      });
    });

    describe('when title is a function', () => {
      const returnTitle = 'test title';
      let titleCallBack;

      beforeEach(() => {
        titleCallBack = jest.fn().mockReturnValue(returnTitle);
        columns[columnIndex].title = titleCallBack;
        wrapper = shallow(
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      afterEach(() => { titleCallBack.mockClear(); });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(defaultColumns.length);
        expect(wrapper.find(Cell).get(columnIndex).props.title).toEqual(returnTitle);
      });

      it('should call custom title function correctly', () => {
        expect(titleCallBack).toHaveBeenCalledTimes(1);
        expect(titleCallBack).toHaveBeenCalledWith(
          row[columns[columnIndex].dataField], row, rowIndex, columnIndex);
      });
    });
  });

  describe('when column.events prop is defined', () => {
    let columns;
    const columnIndex = 1;

    beforeEach(() => {
      columns = [...defaultColumns];
      columns[columnIndex].events = {
        onClick: jest.fn()
      };

      wrapper = shallow(
        <RowPureContent
          keyField={ keyField }
          rowIndex={ rowIndex }
          columns={ columns }
          row={ row }
        />
      );
    });

    it('should attachs DOM event successfully', () => {
      expect(wrapper.length).toBe(defaultColumns.length);
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
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(defaultColumns.length);
        expect(wrapper.find(Cell).get(columnIndex).props.style.textAlign)
          .toEqual(columns[columnIndex].align);
      });
    });

    describe('when align is a function', () => {
      const returnAlign = 'right';
      let alignCallBack;

      beforeEach(() => {
        alignCallBack = jest.fn().mockReturnValue(returnAlign);
        columns[columnIndex].align = alignCallBack;
        wrapper = shallow(
          <RowPureContent
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      afterEach(() => { alignCallBack.mockClear(); });

      it('should render Cell correctly', () => {
        expect(wrapper.length).toBe(defaultColumns.length);
        expect(wrapper.find(Cell).get(columnIndex).props.style.textAlign).toEqual(returnAlign);
      });

      it('should call custom align function correctly', () => {
        expect(alignCallBack).toHaveBeenCalledTimes(1);
        expect(alignCallBack).toHaveBeenCalledWith(
          row[columns[columnIndex].dataField], row, rowIndex, columnIndex);
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
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );

        expect(wrapper.length).toBe(defaultColumns.length);
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
            <RowPureContent
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
            <RowPureContent
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
            <RowPureContent
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
            <RowPureContent
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
        attrsCallBack = jest.fn().mockReturnValue(customAttrs);
        columns[columnIndex].attrs = attrsCallBack;
        wrapper = shallow(
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      afterEach(() => { attrsCallBack.mockClear(); });

      it('should render style.attrs correctly', () => {
        expect(wrapper.length).toBe(defaultColumns.length);
        expect(wrapper.find(Cell).get(columnIndex).props['data-test'])
          .toEqual(customAttrs['data-test']);
        expect(wrapper.find(Cell).get(columnIndex).props.title)
          .toEqual(customAttrs.title);
      });

      it('should call custom attrs function correctly', () => {
        expect(attrsCallBack).toHaveBeenCalledTimes(1);
        expect(attrsCallBack).toHaveBeenCalledWith(
          row[columns[columnIndex].dataField], row, rowIndex, columnIndex);
      });
    });
  });
});
