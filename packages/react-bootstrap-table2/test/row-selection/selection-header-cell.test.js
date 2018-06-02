import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Const from '../../src/const';
import SelectionHeaderCell, { CheckBox } from '../../src/row-selection/selection-header-cell';

let wrapper;

describe('<SelectionHeaderCell />', () => {
  describe('shouldComponentUpdate', () => {
    describe('when props.mode is radio', () => {
      it('should not update component', () => {
        wrapper = shallow(<SelectionHeaderCell mode="radio" />);

        expect(wrapper.instance().shouldComponentUpdate({})).toBe(false);
      });
    });

    describe('when props.mode is checkbox', () => {
      describe('if checkedStatus prop has not been changed', () => {
        it('should not update component', () => {
          const checkedStatus = Const.CHECKBOX_STATUS_CHECKED;
          const nextProps = { checkedStatus };

          wrapper = shallow(
            <SelectionHeaderCell mode="checkbox" checkedStatus={ checkedStatus } />);

          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(false);
        });
      });

      describe('if checkedStatus prop has been changed', () => {
        it('should update component', () => {
          const { CHECKBOX_STATUS_INDETERMINATE, CHECKBOX_STATUS_CHECKED } = Const;
          const checkedStatus = CHECKBOX_STATUS_CHECKED;
          const nextProps = { checkedStatus };

          wrapper = shallow(
            <SelectionHeaderCell mode="checkbox" checkedStatus={ CHECKBOX_STATUS_INDETERMINATE } />);

          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
        });
      });
    });
  });

  describe('handleCheckBoxClick', () => {
    describe('when <th /> was clicked', () => {
      const spy = sinon.spy(SelectionHeaderCell.prototype, 'handleCheckBoxClick');
      const mockOnAllRowsSelect = sinon.stub();

      beforeEach(() => {
        spy.reset();
        mockOnAllRowsSelect.reset();
      });

      describe('if props.mode is radio', () => {
        beforeEach(() => {
          wrapper = shallow(
            <SelectionHeaderCell
              mode="radio"
              checkedStatus={ Const.CHECKBOX_STATUS_CHECKED }
              onAllRowsSelect={ mockOnAllRowsSelect }
            />);
        });

        it('should do nothing', () => {
          wrapper.find('th').simulate('click');

          expect(spy.callCount).toBe(0);
          expect(mockOnAllRowsSelect.callCount).toBe(0);
        });
      });

      describe('if props.mode is checkbox', () => {
        beforeEach(() => {
          wrapper = shallow(
            <SelectionHeaderCell
              mode="checkbox"
              checkedStatus={ Const.CHECKBOX_STATUS_CHECKED }
              onAllRowsSelect={ mockOnAllRowsSelect }
            />);
        });

        it('should call handleCheckBoxClick', () => {
          wrapper.find('th').simulate('click');

          expect(spy.calledOnce).toBe(true);
          expect(mockOnAllRowsSelect.calledOnce).toBe(true);
        });
      });
    });
  });

  describe('render', () => {
    describe('when props.mode is radio', () => {
      beforeEach(() => {
        const checkedStatus = Const.CHECKBOX_STATUS_CHECKED;

        wrapper = shallow(<SelectionHeaderCell mode="radio" checkedStatus={ checkedStatus } />);
      });

      it('should not render checkbox', () => {
        expect(wrapper.find('th').length).toBe(1);
        expect(wrapper.find('th[data-row-selection]').length).toBe(1);
        expect(wrapper.find(CheckBox).length).toBe(0);
      });
    });

    describe('when props.mode is checkbox', () => {
      const checkedStatus = Const.CHECKBOX_STATUS_CHECKED;

      beforeEach(() => {
        wrapper = shallow(<SelectionHeaderCell mode="checkbox" checkedStatus={ checkedStatus } />);
      });

      it('should render checkbox', () => {
        const checked = checkedStatus === Const.CHECKBOX_STATUS_CHECKED;
        const indeterminate = checkedStatus === Const.CHECKBOX_STATUS_INDETERMINATE;

        expect(wrapper.find('th').length).toBe(1);
        expect(wrapper.find('th[data-row-selection]').length).toBe(1);
        expect(wrapper.find(CheckBox).length).toBe(1);
        expect(wrapper.find(CheckBox).get(0).props.checked).toBe(checked);
        expect(wrapper.find(CheckBox).get(0).props.indeterminate).toBe(indeterminate);
      });
    });

    describe('when props.selectionHeaderRenderer is defined', () => {
      const checkedStatus = Const.CHECKBOX_STATUS_CHECKED;
      const DummySelection = () => <div className="dummy" />;
      const selectionHeaderRenderer = jest.fn().mockReturnValue(<DummySelection />);

      beforeEach(() => {
        selectionHeaderRenderer.mockClear();
        wrapper = shallow(
          <SelectionHeaderCell
            mode="checkbox"
            checkedStatus={ checkedStatus }
            selectionHeaderRenderer={ selectionHeaderRenderer }
          />
        );
      });

      it('should render correctly', () => {
        expect(wrapper.find(DummySelection)).toHaveLength(1);
      });

      it('should call props.selectionHeaderRenderer correctly', () => {
        expect(selectionHeaderRenderer).toHaveBeenCalledTimes(1);
        expect(selectionHeaderRenderer).toHaveBeenCalledWith({
          mode: 'checkbox',
          checked: checkedStatus === Const.CHECKBOX_STATUS_CHECKED,
          indeterminate: checkedStatus === Const.CHECKBOX_STATUS_INDETERMINATE
        });
      });
    });
  });
});

describe('<CheckBox />', () => {
  describe('render', () => {
    it('should render component correctly', () => {
      const checked = true;
      const indeterminate = false;
      wrapper = shallow(<CheckBox checked={ checked } indeterminate={ indeterminate } />);

      expect(wrapper.find('input').length).toBe(1);
      expect(wrapper.find('input').prop('checked')).toBe(checked);
      expect(wrapper.find('input').prop('type')).toBe('checkbox');
    });
  });
});
