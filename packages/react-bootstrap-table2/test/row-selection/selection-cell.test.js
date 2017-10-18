import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SelectionCell from '../../src/row-selection/selection-cell';

describe('<SelectionCell />', () => {
  const mode = 'checkbox';

  let wrapper;

  describe('shouldComponentUpdate', () => {
    const selected = true;

    describe('when selected prop has not been changed', () => {
      it('should not update component', () => {
        const nextProps = { selected };

        wrapper = shallow(<SelectionCell rowKey={ 1 } mode={ mode } selected={ selected } />);

        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(false);
      });
    });

    describe('when selected prop has been changed', () => {
      it('should update component', () => {
        const nextProps = { selected: !selected };

        wrapper = shallow(<SelectionCell rowKey={ 1 } mode={ mode } selected={ selected } />);

        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });
  });

  describe('handleRowClick', () => {
    describe('when <input /> was been clicked', () => {
      const rowKey = 1;
      const mockOnRowSelect = sinon.stub();
      const spy = sinon.spy(SelectionCell.prototype, 'handleRowClick');

      beforeEach(() => {
        spy.reset();
        mockOnRowSelect.reset();
      });

      it('should call handleRowClicked', () => {
        wrapper = shallow(
          <SelectionCell
            selected
            rowKey={ rowKey }
            mode={ mode }
            onRowSelect={ mockOnRowSelect }
          />
        );

        wrapper.find('td').simulate('click');

        expect(spy.calledOnce).toBe(true);
        expect(mockOnRowSelect.calledOnce).toBe(true);
      });

      describe('if selectRow.mode is radio', () => {
        beforeEach(() => {
          wrapper = shallow(
            <SelectionCell
              selected
              rowKey={ rowKey }
              mode="radio"
              onRowSelect={ mockOnRowSelect }
            />
          );
        });

        it('should be called with correct paramters', () => {
          // first click
          wrapper.find('td').simulate('click');
          expect(mockOnRowSelect.callCount).toBe(1);
          expect(mockOnRowSelect.calledWith(rowKey, true)).toBe(true);

          // second click
          wrapper.find('td').simulate('click');
          expect(mockOnRowSelect.callCount).toBe(2);
          expect(mockOnRowSelect.calledWith(rowKey, true)).toBe(true);
        });
      });

      describe('if selectRow.mode is checkbox', () => {
        beforeEach(() => {
          wrapper = shallow(
            <SelectionCell
              rowKey={ rowKey }
              mode="checkbox"
              onRowSelect={ mockOnRowSelect }
            />
          );
        });

        it('should be called with correct paramters', () => {
          // first click
          wrapper.setProps({ selected: true });
          wrapper.find('td').simulate('click');
          expect(mockOnRowSelect.callCount).toBe(1);
          expect(mockOnRowSelect.calledWith(rowKey, false)).toBe(true);

          // second click
          wrapper.setProps({ selected: false });
          wrapper.find('td').simulate('click');
          expect(mockOnRowSelect.callCount).toBe(2);
          expect(mockOnRowSelect.calledWith(rowKey, true)).toBe(true);
        });
      });
    });
  });

  describe('render', () => {
    const selected = true;

    beforeEach(() => {
      wrapper = shallow(
        <SelectionCell
          rowKey={ 1 }
          mode={ mode }
          selected={ selected }
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
