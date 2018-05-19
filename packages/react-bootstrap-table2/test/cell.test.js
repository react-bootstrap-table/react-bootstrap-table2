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

  describe('when column.style prop is defined', () => {
    let column;
    const columnIndex = 1;
    const rowIndex = 1;

    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    describe('when style is an object', () => {
      beforeEach(() => {
        column.style = { backgroundColor: 'red' };
        wrapper = shallow(
          <Cell row={ row } columnIndex={ columnIndex } rowIndex={ rowIndex } column={ column } />);
      });

      it('should render successfully', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('td').prop('style')).toEqual(column.style);
      });
    });

    describe('when style is a function', () => {
      const returnStyle = { backgroundColor: 'red' };
      let styleCallBack;

      beforeEach(() => {
        styleCallBack = sinon.stub()
          .withArgs(row[column.dataField], row, rowIndex, columnIndex)
          .returns(returnStyle);
        column.style = styleCallBack;
        wrapper = shallow(
          <Cell row={ row } columnIndex={ columnIndex } rowIndex={ rowIndex } column={ column } />);
      });

      afterEach(() => { styleCallBack.reset(); });

      it('should render successfully', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('td').prop('style')).toEqual(returnStyle);
      });

      it('should call custom style function correctly', () => {
        expect(styleCallBack.callCount).toBe(1);
        expect(
          styleCallBack.calledWith(row[column.dataField], row, rowIndex, columnIndex)
        ).toBe(true);
      });
    });
  });

  describe('when column.classes prop is defined', () => {
    let column;
    const columnIndex = 1;
    const rowIndex = 1;

    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    describe('when classes is an object', () => {
      beforeEach(() => {
        column.classes = 'td-test-class';
        wrapper = shallow(
          <Cell row={ row } columnIndex={ columnIndex } rowIndex={ rowIndex } column={ column } />);
      });

      it('should render successfully', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.hasClass(column.classes)).toBe(true);
      });
    });

    describe('when classes is a function', () => {
      const returnClasses = 'td-test-class';
      let classesCallBack;

      beforeEach(() => {
        classesCallBack = sinon.stub()
          .withArgs(row[column.dataField], row, rowIndex, columnIndex)
          .returns(returnClasses);
        column.classes = classesCallBack;
        wrapper = shallow(
          <Cell row={ row } columnIndex={ columnIndex } rowIndex={ rowIndex } column={ column } />);
      });

      afterEach(() => { classesCallBack.reset(); });

      it('should render successfully', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.hasClass(returnClasses)).toBe(true);
      });

      it('should call custom classes function correctly', () => {
        expect(classesCallBack.callCount).toBe(1);
        expect(
          classesCallBack.calledWith(row[column.dataField], row, rowIndex, columnIndex)
        ).toBe(true);
      });
    });
  });

  describe('when column.title prop is defined', () => {
    let column;
    const columnIndex = 1;
    const rowIndex = 1;

    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    describe('when title is boolean', () => {
      beforeEach(() => {
        column.title = true;
        wrapper = shallow(
          <Cell row={ row } columnIndex={ columnIndex } rowIndex={ rowIndex } column={ column } />);
      });

      it('should render title as cell value as default', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('td').prop('title')).toEqual(row[column.dataField]);
      });
    });

    describe('when title is custom function', () => {
      const customTitle = 'test_title';
      let titleCallBack;

      beforeEach(() => {
        titleCallBack = sinon.stub()
          .withArgs(row[column.dataField], row, rowIndex, columnIndex)
          .returns(customTitle);
        column.title = titleCallBack;
        wrapper = shallow(
          <Cell row={ row } columnIndex={ columnIndex } rowIndex={ rowIndex } column={ column } />);
      });

      it('should render title correctly by custom title function', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('td').prop('title')).toBe(customTitle);
      });

      it('should call custom title function correctly', () => {
        expect(titleCallBack.callCount).toBe(1);
        expect(
          titleCallBack.calledWith(row[column.dataField], row, rowIndex, columnIndex)
        ).toBe(true);
      });
    });
  });

  describe('when column.events prop is defined', () => {
    let column;
    const columnIndex = 1;
    const rowIndex = 1;

    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID',
        events: {
          onClick: sinon.stub()
        }
      };

      wrapper = shallow(
        <Cell row={ row } columnIndex={ columnIndex } rowIndex={ rowIndex } column={ column } />);
    });

    it('should attachs DOM event successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('td').prop('onClick')).toBeDefined();
    });

    it('event hook should be called when triggering', () => {
      wrapper.find('td').simulate('click');
      expect(column.events.onClick.callCount).toBe(1);
    });
  });

  describe('when column.align prop is defined', () => {
    let column;
    const columnIndex = 1;
    const rowIndex = 1;

    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    describe('when align is string', () => {
      beforeEach(() => {
        column.align = 'center';
        wrapper = shallow(
          <Cell row={ row } columnIndex={ columnIndex } rowIndex={ rowIndex } column={ column } />);
      });

      it('should render style.textAlign correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('td').prop('style').textAlign).toEqual(column.align);
      });
    });

    describe('when align is custom function', () => {
      const customAlign = 'center';
      let alignCallBack;

      beforeEach(() => {
        alignCallBack = sinon.stub()
          .withArgs(row[column.dataField], row, rowIndex, columnIndex)
          .returns(customAlign);
        column.align = alignCallBack;
        wrapper = shallow(
          <Cell row={ row } columnIndex={ columnIndex } rowIndex={ rowIndex } column={ column } />);
      });

      it('should render style.textAlign correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('td').prop('style').textAlign).toEqual(customAlign);
      });

      it('should call custom headerAlign function correctly', () => {
        expect(alignCallBack.callCount).toBe(1);
        expect(
          alignCallBack.calledWith(row[column.dataField], row, rowIndex, columnIndex)
        ).toBe(true);
      });
    });
  });

  describe('when column.attrs prop is defined', () => {
    let column;
    const columnIndex = 1;
    const rowIndex = 1;

    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    describe('when attrs is an object', () => {
      it('should render column.attrs correctly', () => {
        column.attrs = {
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
          <Cell row={ row } columnIndex={ columnIndex } rowIndex={ 1 } column={ column } />);

        expect(wrapper.length).toBe(1);
        expect(wrapper.find('td').prop('data-test')).toEqual(column.attrs['data-test']);
        expect(wrapper.find('td').prop('title')).toEqual(column.attrs.title);
        expect(wrapper.hasClass(column.attrs.className)).toBe(true);
        expect(wrapper.find('td').prop('style')).toEqual(column.attrs.style);
        expect(wrapper.find('td').prop('style').textAlign).toEqual(column.attrs.style.textAlign);
      });

      describe('when column.title prop is defined', () => {
        it('attrs.title should be overwrited', () => {
          column.title = true;
          column.attrs = { title: 'title' };

          wrapper = shallow(
            <Cell row={ row } columnIndex={ columnIndex } rowIndex={ 1 } column={ column } />);

          expect(wrapper.find('td').prop('title')).toEqual(row[column.dataField]);
        });
      });

      describe('when column.classes prop is defined', () => {
        it('attrs.class should be overwrited', () => {
          column.classes = 'td-test-class';
          column.attrs = { className: 'attrs-class' };

          wrapper = shallow(
            <Cell row={ row } columnIndex={ columnIndex } rowIndex={ 1 } column={ column } />);

          expect(wrapper.hasClass(column.classes)).toBe(true);
        });
      });

      describe('when column.style prop is defined', () => {
        it('attrs.style should be overwrited', () => {
          column.style = { backgroundColor: 'red' };
          column.attrs = { style: { backgroundColor: 'attrs-style-test' } };

          wrapper = shallow(
            <Cell row={ row } columnIndex={ columnIndex } rowIndex={ 1 } column={ column } />);

          expect(wrapper.find('td').prop('style')).toEqual(column.style);
        });
      });

      describe('when column.align prop is defined', () => {
        it('attrs.style.textAlign should be overwrited', () => {
          column.align = 'center';
          column.attrs = { style: { textAlign: 'right' } };

          wrapper = shallow(
            <Cell row={ row } columnIndex={ columnIndex } rowIndex={ 1 } column={ column } />);

          expect(wrapper.find('td').prop('style').textAlign).toEqual(column.align);
        });
      });
    });

    describe('when attrs is custom function', () => {
      let attrsCallBack;
      const customAttrs = {
        title: 'title',
        'data-test': 'test'
      };

      beforeEach(() => {
        attrsCallBack = sinon.stub()
          .withArgs(row[column.dataField], row, rowIndex, columnIndex)
          .returns(customAttrs);
        column.attrs = attrsCallBack;
        wrapper = shallow(
          <Cell row={ row } columnIndex={ columnIndex } rowIndex={ rowIndex } column={ column } />);
      });

      it('should render style.attrs correctly', () => {
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('td').prop('data-test')).toEqual(customAttrs['data-test']);
        expect(wrapper.find('td').prop('title')).toEqual(customAttrs.title);
      });

      it('should call custom attrs function correctly', () => {
        expect(attrsCallBack.callCount).toBe(1);
        expect(
          attrsCallBack.calledWith(row[column.dataField], row, rowIndex, columnIndex)
        ).toBe(true);
      });
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
        it('should calling custom onClick callback also', () => {
          wrapper.find('td').simulate('click');
          expect(onStartCallBack.callCount).toBe(1);
          expect(column.events.onClick.callCount).toBe(1);
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
        it('should calling custom onDoubleClick callback also', () => {
          wrapper.find('td').simulate('doubleclick');
          expect(onStartCallBack.callCount).toBe(1);
          expect(column.events.onDoubleClick.callCount).toBe(1);
        });
      });
    });
  });
});
