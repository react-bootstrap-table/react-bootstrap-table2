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
      wrapper = shallow(<Cell row={ row } rowIndex={ 1 } column={ column } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.contains(<td>{ row[column.dataField] }</td>)).toBe(true);
    });
  });

  describe('when formatter prop is defined', () => {
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
      wrapper = shallow(<Cell row={ row } rowIndex={ rowIndex } column={ column } />);
    });

    afterEach(() => { formatter.reset(); });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.contains(<td><h3>{ row[column.dataField] }</h3></td>)).toBe(true);
    });

    it('should call custom formatter correctly', () => {
      expect(formatter.callCount).toBe(1);
      expect(formatter.calledWith(row[column.dataField],
        row, rowIndex, column.formatExtraData)).toBe(true);
    });
  });
});
