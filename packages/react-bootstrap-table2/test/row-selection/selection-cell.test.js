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
    describe('when <input /> was been clicked', () => {
      const rowKey = 1;
      const mockOnRowSelect = jest.fn();
      const spy = jest.spyOn(SelectionCell.prototype, 'handleRowClick');

      it('should call handleRowClicked', () => {
        mockOnRowSelect.mockClear();
        spy.mockClear();

        wrapper = shallow(
          <SelectionCell
            selected
            rowKey={rowKey}
            mode={mode}
            onRowSelect={mockOnRowSelect}
          />
        );

        wrapper.find('td').simulate('click');

        expect(spy).toHaveBeenCalled();
        expect(mockOnRowSelect).toHaveBeenCalled();
      });

      describe('if selectRow.mode is radio', () => {
        let calledCount;

        beforeEach(() => {
          calledCount = 0;

          mockOnRowSelect.mockClear();
          spy.mockClear();

          wrapper = shallow(
            <SelectionCell
              selected
              rowKey={rowKey}
              mode="radio"
              onRowSelect={mockOnRowSelect}
            />
          );
        });

        it('first param should get correct row key', () => {
          wrapper.find('td').simulate('click');

          expect(mockOnRowSelect.mock.calls[calledCount][0]).toBe(rowKey);
        });

        it('second param, checked, should always be true', () => {
          wrapper.find('td').simulate('click');
          expect(mockOnRowSelect.mock.calls[calledCount][1]).toBe(true);

          calledCount += 1;
          wrapper.find('td').simulate('click');
          expect(mockOnRowSelect.mock.calls[calledCount][1]).toBe(true);
        });
      });

      describe('if selectRow.mode is checkbox', () => {
        let calledCount;

        const selected = true;

        beforeEach(() => {
          calledCount = 0;

          mockOnRowSelect.mockClear();
          spy.mockClear();

          wrapper = shallow(
            <SelectionCell
              selected={selected}
              rowKey={rowKey}
              mode="checkbox"
              onRowSelect={mockOnRowSelect}
            />
          );
        });

        it('first param should get correct row key', () => {
          wrapper.find('td').simulate('click');

          expect(mockOnRowSelect.mock.calls[calledCount][0]).toBe(rowKey);
        });

        it('second param, checked, should be toggled', () => {
          wrapper.find('td').simulate('click');
          expect(mockOnRowSelect.mock.calls[calledCount][1]).toBe(!selected);

          calledCount += 1;
          wrapper.setProps({ selected: !selected });
          wrapper.find('td').simulate('click');
          expect(mockOnRowSelect.mock.calls[calledCount][1]).toBe(selected);
        });
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
