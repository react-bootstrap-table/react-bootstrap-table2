import React from 'react';
import { shallow } from 'enzyme';

import shouldUpdater from '../../src/row/should-updater';

describe('Row shouldUpdater', () => {
  let wrapper;
  let props;
  let nextProps;

  class DummyComponent extends shouldUpdater(React.Component) {
    render() { return null; }
  }

  describe('shouldUpdateByCellEditing', () => {
    describe('when nextProps.clickToEdit and nexrProps.dbclickToEdit both are negative', () => {
      beforeEach(() => {
        props = {
          editingRowIdx: null,
          rowIndex: 0
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should always return false', () => {
        nextProps = { ...props, editingRowIdx: 0 };
        expect(wrapper.instance().shouldUpdateByCellEditing(nextProps)).toBeFalsy();
      });
    });
    describe('when nextProps.editingRowIdx eq props.rowIndex and it\' not null', () => {
      beforeEach(() => {
        props = {
          clickToEdit: true,
          editingRowIdx: null,
          rowIndex: 0
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, editingRowIdx: 0 };
        expect(wrapper.instance().shouldUpdateByCellEditing(nextProps)).toBeTruthy();
      });
    });

    describe('when props.editingRowIdx eq props.rowIndex but nextProps.editingRowIdx is null', () => {
      beforeEach(() => {
        props = {
          clickToEdit: true,
          editingRowIdx: 0,
          rowIndex: 0
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, editingRowIdx: null };
        expect(wrapper.instance().shouldUpdateByCellEditing(nextProps)).toBeTruthy();
      });
    });
  });

  describe('shouldUpdatedBySelfProps', () => {
    describe('when nextProps.className is not eq props.className', () => {
      beforeEach(() => {
        props = {
          className: ''
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, className: 'test' };
        expect(wrapper.instance().shouldUpdatedBySelfProps(nextProps)).toBeTruthy();
      });
    });

    describe('when nextProps.style is not eq props.style', () => {
      beforeEach(() => {
        props = {
          style: null
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, style: { color: 'red' } };
        expect(wrapper.instance().shouldUpdatedBySelfProps(nextProps)).toBeTruthy();
      });
    });

    describe('when nextProps.attrs is not eq props.attrs', () => {
      beforeEach(() => {
        props = {
          attrs: null
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, attrs: { onClick: jest.fn() } };
        expect(wrapper.instance().shouldUpdatedBySelfProps(nextProps)).toBeTruthy();
      });
    });
  });

  describe('shouldUpdateByColumnsForSimpleCheck', () => {
    describe('when nextProps.columns.length is not eq props.columns.length', () => {
      beforeEach(() => {
        props = {
          columns: [{ dataField: 'price', text: 'Price' }]
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, columns: [...props.columns, { dataField: 'name', text: 'Name' }] };
        expect(wrapper.instance().shouldUpdateByColumnsForSimpleCheck(nextProps)).toBeTruthy();
      });
    });

    describe('when any nextProps.columns.hidden is change', () => {
      beforeEach(() => {
        props = {
          columns: [{ dataField: 'price', text: 'Price' }]
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, columns: [{ dataField: 'price', text: 'Price', hidden: true }] };
        expect(wrapper.instance().shouldUpdateByColumnsForSimpleCheck(nextProps)).toBeTruthy();
      });
    });

    describe('if any nextProps.columns.hidden is not change and column length is same', () => {
      beforeEach(() => {
        props = {
          columns: [{ dataField: 'price', text: 'Price' }]
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return false', () => {
        nextProps = { ...props, columns: [...props.columns] };
        expect(wrapper.instance().shouldUpdateByColumnsForSimpleCheck(nextProps)).toBeFalsy();
      });
    });
  });

  describe('shouldUpdatedByNormalProps', () => {
    describe('when nextProps.rowIndex is not eq props.rowIndex', () => {
      beforeEach(() => {
        props = {
          rowIndex: 0
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, rowIndex: 1 };
        expect(wrapper.instance().shouldUpdatedByNormalProps(nextProps)).toBeTruthy();
      });
    });

    describe('when nextProps.editable is not eq props.editable', () => {
      beforeEach(() => {
        props = {
          editable: false
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, editable: true };
        expect(wrapper.instance().shouldUpdatedByNormalProps(nextProps)).toBeTruthy();
      });
    });

    describe('when nextProps.columns.length is not eq props.columns.length', () => {
      beforeEach(() => {
        props = {
          columns: [{ dataField: 'price', text: 'Price' }]
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, columns: [...props.columns, { dataField: 'name', text: 'Name' }] };
        expect(wrapper.instance().shouldUpdatedByNormalProps(nextProps)).toBeTruthy();
      });
    });

    describe('when nextProps.row is not eq props.row', () => {
      beforeEach(() => {
        props = {
          row: { id: 1, name: 'test' }
        };
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      it('should return true', () => {
        nextProps = { ...props, row: { id: 1, name: 'test', price: 123 } };
        expect(wrapper.instance().shouldUpdatedByNormalProps(nextProps)).toBeTruthy();
      });
    });
  });
});
