import React from 'react';
import { shallow } from 'enzyme';

import SelectionCell from '../../src/row-selection/selection-cell';

describe('<SelectionCell />', () => {
  const mode = 'checkbox';

  let wrapper;

  describe('shouldComponentUpdate', () => {
    const selected = true;

    describe('when selected prop has not been changed', () => {
      it('should not update component', () => {
        const nextProps = { selected };

        wrapper = shallow(<SelectionCell rowKey={1} mode={mode} selected={selected} />);

        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(false);
      });
    });

    describe('when selected prop has been changed', () => {
      it('should update component', () => {
        const nextProps = { selected: !selected };

        wrapper = shallow(<SelectionCell rowKey={1} mode={mode} selected={selected} />);

        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });
  });

  describe('handleRowClick', () => {
    let spy;

    const mockOnRowSelect = jest.fn();

    beforeEach(() => {
      spy = jest.spyOn(SelectionCell.prototype, 'handleRowClick');

      wrapper = shallow(
        <SelectionCell
          selected
          rowKey={1}
          mode={mode}
          onRowSelect={mockOnRowSelect}
        />
      );
    });

    describe('when input was been clicked', () => {
      it('should call handleRowClicked', () => {
        wrapper.find('td').simulate('click');

        expect(spy).toHaveBeenCalled();
        expect(mockOnRowSelect).toHaveBeenCalled();
      });
    });
  });

  describe('render', () => {
    const selected = true;

    beforeEach(() => {
      wrapper = shallow(
        <SelectionCell
          rowKey={1}
          mode={mode}
          selected={selected}
        />
      );
    });

    it('should render component correctly', () => {
      expect(wrapper.find('td').length).toBe(1);
      expect(wrapper.find('input').length).toBe(1);
      expect(wrapper.find('input').get(0).props.type).toBe(mode);
      expect(wrapper.find('input').get(0).props.checked).toBe(selected);
    });
  });
});
