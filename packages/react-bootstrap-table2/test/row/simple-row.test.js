import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import RowPureContent from '../../src/row/row-pure-content';
import SimpleRow from '../../src/row/simple-row';

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

describe('SimpleRow', () => {
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
        <SimpleRow
          keyField={ keyField }
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
        />
      );
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find(RowPureContent)).toHaveLength(1);
    });
  });

  describe('shouldComponentUpdate', () => {
    let props;
    let nextProps;
    describe('if shouldUpdatedByNormalProps return true', () => {
      beforeEach(() => {
        props = {
          keyField,
          columns: defaultColumns,
          rowIndex: 1,
          row,
          editable: true
        };
        wrapper = shallow(
          <SimpleRow { ...props } />
        );
      });

      it('should return true', () => {
        nextProps = { ...props, rowIndex: 2 };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });

      it('should set this.shouldUpdateRowContent as true', () => {
        nextProps = { ...props, rowIndex: 2 };
        wrapper.instance().shouldComponentUpdate(nextProps);
        expect(wrapper.instance().shouldUpdateRowContent).toBe(true);
      });
    });

    describe('if shouldUpdatedByNormalProps return false', () => {
      beforeEach(() => {
        props = {
          keyField,
          columns: defaultColumns,
          rowIndex: 1,
          row,
          editable: true
        };
        wrapper = shallow(
          <SimpleRow { ...props } />
        );
      });

      it('should return value which depends on the result of shouldUpdatedBySelfProps', () => {
        nextProps = { ...props, className: 'test' };
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });

      it('should always set this.shouldUpdateRowContent as false', () => {
        nextProps = { ...props, className: 'test' };
        wrapper.instance().shouldComponentUpdate(nextProps);
        expect(wrapper.instance().shouldUpdateRowContent).toBe(false);
      });
    });
  });

  describe('when style prop is defined', () => {
    const customStyle = { backgroundColor: 'red' };
    beforeEach(() => {
      wrapper = shallow(
        <SimpleRow
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
        <SimpleRow
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

  describe('when attrs prop is defined', () => {
    const customClickCallBack = sinon.stub();
    const attrs = { 'data-index': 1, onClick: customClickCallBack };
    beforeEach(() => {
      wrapper = shallow(
        <SimpleRow
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
});
