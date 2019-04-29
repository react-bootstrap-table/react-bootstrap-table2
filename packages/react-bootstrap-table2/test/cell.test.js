import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Cell from '../src/cell';

describe('Cell', () => {
  let wrapper;
  const row = {
    id: 1,
    name: 'A'
  };

  describe('simplest cell', () => {
    const column = {
      dataField: 'id',
      text: 'ID'
    };

    beforeEach(() => {
      wrapper = shallow(<Cell row={ row } columnIndex={ 1 } rowIndex={ 1 } column={ column } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.text()).toEqual(row[column.dataField].toString());
    });
  });

  describe('when content is bool value', () => {
    const column = {
      dataField: 'col1',
      text: 'column 1'
    };
    const aRowWithBoolValue = { col1: true };

    beforeEach(() => {
      wrapper = shallow(
        <Cell row={ aRowWithBoolValue } columnIndex={ 1 } rowIndex={ 1 } column={ column } />
      );
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.text()).toEqual(aRowWithBoolValue[column.dataField].toString());
    });
  });

  describe('when column.formatter prop is defined', () => {
    const rowIndex = 1;
    const column = {
      dataField: 'id',
      text: 'ID',
      formatExtraData: []
    };
    const formatterResult = (<h3>{ row[column.dataField] }</h3>);
    const formatter = sinon.stub()
      .withArgs(row[column.dataField], row, rowIndex, column.formatExtraData)
      .returns(formatterResult);
    column.formatter = formatter; // defined column formatter

    beforeEach(() => {
      wrapper = shallow(
        <Cell row={ row } columnIndex={ 1 } rowIndex={ rowIndex } column={ column } />);
    });

    afterEach(() => { formatter.reset(); });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('h3').length).toBe(1);
      expect(wrapper.text()).toEqual(row[column.dataField].toString());
    });

    it('should call custom formatter correctly', () => {
      expect(formatter.callCount).toBe(1);
      expect(formatter.calledWith(row[column.dataField],
        row, rowIndex, column.formatExtraData)).toBe(true);
    });
  });

  describe('when editable prop is true', () => {
    let onStartCallBack;
    const rowIndex = 1;
    const columnIndex = 1;
    const column = {
      dataField: 'id',
      text: 'ID'
    };

    beforeEach(() => {
      onStartCallBack = sinon.stub().withArgs(rowIndex, columnIndex);
    });

    describe('and clickToEdit is true', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Cell
            row={ row }
            rowIndex={ rowIndex }
            column={ column }
            columnIndex={ columnIndex }
            editable
            clickToEdit
            onStart={ onStartCallBack }
          />
        );
      });

      it('should render onClick attribute', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('td').prop('onClick')).toBeDefined();
      });

      it('should call onStart correctly when clicking cell', () => {
        wrapper.find('td').simulate('click');
        expect(onStartCallBack.callCount).toBe(1);
        expect(onStartCallBack.calledWith(rowIndex, columnIndex)).toBe(true);
      });

      describe('if when column.events.onClick prop is defined', () => {
        beforeEach(() => {
          column.events = {
            onClick: sinon.stub()
          };
        });

        it('should call onStart correctly', () => {
          wrapper.find('td').simulate('click');
          expect(onStartCallBack.callCount).toBe(1);
        });
      });
    });

    describe('and dbclickToEdit is true', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Cell
            row={ row }
            rowIndex={ 1 }
            column={ column }
            columnIndex={ 1 }
            editable
            dbclickToEdit
            onStart={ onStartCallBack }
          />
        );
      });

      it('should render onDoubleClick attribute', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('td').prop('onDoubleClick')).toBeDefined();
      });

      it('should call onStart correctly when double clicking cell', () => {
        wrapper.find('td').simulate('doubleclick');
        expect(onStartCallBack.callCount).toBe(1);
        expect(onStartCallBack.calledWith(rowIndex, columnIndex)).toBe(true);
      });

      describe('if when column.events.onDoubleClick prop is defined', () => {
        beforeEach(() => {
          column.events = {
            onDoubleClick: sinon.stub()
          };
        });

        it('should call onStart correctly', () => {
          wrapper.find('td').simulate('doubleclick');
          expect(onStartCallBack.callCount).toBe(1);
        });
      });
    });
  });

  describe('shouldComponentUpdate', () => {
    let props;
    let nextProps;

    describe('if column.isDummyField is false', () => {
      describe('when content is change', () => {
        const column = { dataField: 'name', text: 'Product Name' };
        beforeEach(() => {
          props = {
            row,
            columnIndex: 1,
            rowIndex: 1,
            column
          };
          wrapper = shallow(
            <Cell { ...props } />);
        });

        it('should return true', () => {
          nextProps = { ...props, row: { id: 1, name: 'CDE' } };
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
        });
      });
    });

    describe('when props.tabIndex is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          tabIndex: 5,
          column
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, tabIndex: 2 };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when props.row is change', () => {
      describe('and column.formatter is enable', () => {
        const column = { dataField: 'name', text: 'Product Name', formatter: () => 123 };
        beforeEach(() => {
          props = {
            row,
            columnIndex: 1,
            rowIndex: 1,
            tabIndex: 5,
            column
          };
          wrapper = shallow(
            <Cell { ...props } />);
        });

        it('should return true', () => {
          nextProps = { ...props, row: { ...row, alert: 'test' } };
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
        });
      });
      describe('but column.formatter is disable', () => {
        const column = { dataField: 'name', text: 'Product Name' };
        beforeEach(() => {
          props = {
            row,
            columnIndex: 1,
            rowIndex: 1,
            tabIndex: 5,
            column
          };
          wrapper = shallow(
            <Cell { ...props } />);
        });

        it('should return true', () => {
          nextProps = { ...props, row: { ...row, alert: 'test' } };
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(false);
        });
      });
    });

    describe('if column.isDummyField is true', () => {
      describe('when content is change', () => {
        const column = { dataField: '', text: 'Product Name', isDummyField: true };
        beforeEach(() => {
          props = {
            row,
            columnIndex: 1,
            rowIndex: 1,
            column
          };
          wrapper = shallow(
            <Cell { ...props } />);
        });

        it('should return true', () => {
          nextProps = { ...props, row: { id: 1, name: 'CDE', test: 'This is new Field' } };
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
        });
      });
    });

    describe('when column.hidden is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, column: { ...column, hidden: true } };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when props.rowIndex is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, rowIndex: 2 };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when props.columnIndex is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, columnIndex: 2 };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when props.className is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column,
          className: 'test'
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, className: null };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when props.title is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column,
          title: 'test'
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, title: '123' };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when props.title is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, editable: true };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when props.clickToEdit is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, clickToEdit: true };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when props.dbclickToEdit is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, dbclickToEdit: true };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when props.style is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column,
          style: {}
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, style: { color: 'red' } };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when column.formatExtraData is change', () => {
      const column = { dataField: 'name', text: 'Product Name', formatExtraData: { a: 1 } };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, column: { ...column, formatExtraData: { b: 2 } } };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when column.events is change', () => {
      const column = { dataField: 'name', text: 'Product Name', events: { a: jest.fn() } };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, column: { ...column, events: { b: jest.fn() } } };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    describe('when column.attrs is change', () => {
      const column = { dataField: 'name', text: 'Product Name', attrs: { 'data-att': 1 } };
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          <Cell { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, column: { ...column, attrs: null } };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });
  });
});
