import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';

import SelectionContext from '../../src/contexts/selection-context';
import bindSelection from '../../src/row-selection/row-binder';

describe('Selection Row Binder', () => {
  let wrapper;
  let selectRow;
  const BaseComponent = () => null;
  const WithSelectionComponent = bindSelection(props => <BaseComponent { ...props } />);

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }, {
    id: 3,
    name: 'C'
  }];
  const rowIndex = 1;
  const row = data[rowIndex];
  const keyField = 'id';

  describe('if current row is selected', () => {
    beforeEach(() => {
      selectRow = { mode: 'checkbox', selected: [data[rowIndex][keyField]] };
      wrapper = mount(
        <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
          <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
        </SelectionContext.Provider>
      );
    });

    it('should inject selected prop as true to target component', () => {
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      expect(wrapper.find(BaseComponent).prop('selected')).toBeTruthy();
    });
  });

  describe('if current row is not selected', () => {
    beforeEach(() => {
      selectRow = { mode: 'checkbox', selected: [] };
      wrapper = mount(
        <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
          <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
        </SelectionContext.Provider>
      );
    });

    it('should inject selected prop as false to target component', () => {
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      expect(wrapper.find(BaseComponent).prop('selected')).toBeFalsy();
    });
  });

  describe('if current row is selectable', () => {
    beforeEach(() => {
      selectRow = { mode: 'checkbox', nonSelectable: [] };
      wrapper = mount(
        <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
          <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
        </SelectionContext.Provider>
      );
    });

    it('should inject selectable prop as true to target component', () => {
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      expect(wrapper.find(BaseComponent).prop('selectable')).toBeTruthy();
    });
  });

  describe('if current row is non selectable', () => {
    beforeEach(() => {
      selectRow = { mode: 'checkbox', nonSelectable: [data[rowIndex][keyField]] };
      wrapper = mount(
        <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
          <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
        </SelectionContext.Provider>
      );
    });

    it('should inject selectable prop as false to target component', () => {
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      expect(wrapper.find(BaseComponent).prop('selectable')).toBeFalsy();
    });
  });

  describe('if current row is selected', () => {
    const selectedStyle = { backgroundColor: 'green', fontWeight: 'bold' };
    describe('when selectRow.style is defined as an object', () => {
      beforeEach(() => {
        selectRow = { mode: 'checkbox', selected: [data[rowIndex][keyField]], style: selectedStyle };
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
          </SelectionContext.Provider>
        );
      });

      it('should inject style prop correctly', () => {
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        expect(wrapper.find(BaseComponent).prop('style')).toEqual(selectedStyle);
      });

      describe('and props.style is also defined', () => {
        const componentStype = { fontSize: '16px' };
        beforeEach(() => {
          wrapper = mount(
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              <WithSelectionComponent
                row={ row }
                keyField={ keyField }
                rowIndex={ rowIndex }
                style={ componentStype }
              />
            </SelectionContext.Provider>
          );
        });

        it('should inject style prop correctly', () => {
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            ...componentStype
          });
        });
      });

      describe('and selectRow.bgColor is also defined as an object', () => {
        beforeEach(() => {
          selectRow.bgColor = 'gray';
          wrapper = mount(
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
            </SelectionContext.Provider>
          );
        });

        it('should inject style prop with correct backgroundColor', () => {
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            backgroundColor: selectRow.bgColor
          });
        });
      });

      describe('and selectRow.bgColor is also defined as a function', () => {
        const color = 'gray';
        beforeEach(() => {
          selectRow.bgColor = jest.fn().mockReturnValue(color);
          wrapper = mount(
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
            </SelectionContext.Provider>
          );
        });

        it('should inject style prop with correct backgroundColor', () => {
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            backgroundColor: color
          });
        });

        it('should call selectRow.bgColor function correctly', () => {
          expect(selectRow.bgColor).toHaveBeenCalledTimes(1);
          expect(selectRow.bgColor).toHaveBeenCalledWith(row, rowIndex);
        });
      });
    });

    describe('when selectRow.style is defined as a function', () => {
      beforeEach(() => {
        selectRow = { mode: 'checkbox', selected: [data[rowIndex][keyField]], style: jest.fn().mockReturnValue(selectedStyle) };
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
          </SelectionContext.Provider>
        );
      });

      it('should inject style prop correctly', () => {
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        expect(wrapper.find(BaseComponent).prop('style')).toEqual(selectedStyle);
      });

      it('should call selectRow.style function correctly', () => {
        expect(selectRow.style).toHaveBeenCalledTimes(1);
        expect(selectRow.style).toHaveBeenCalledWith(row, rowIndex);
      });

      describe('and props.style is also defined', () => {
        const componentStype = { fontSize: '16px' };
        beforeEach(() => {
          wrapper = mount(
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              <WithSelectionComponent
                row={ row }
                keyField={ keyField }
                rowIndex={ rowIndex }
                style={ componentStype }
              />
            </SelectionContext.Provider>
          );
        });

        it('should inject style prop correctly', () => {
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            ...componentStype
          });
        });
      });

      describe('and selectRow.bgColor is also defined as an object', () => {
        beforeEach(() => {
          selectRow.bgColor = 'gray';
          wrapper = mount(
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
            </SelectionContext.Provider>
          );
        });

        it('should inject style prop with correct backgroundColor', () => {
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            backgroundColor: selectRow.bgColor
          });
        });
      });

      describe('and selectRow.bgColor is also defined as a function', () => {
        const color = 'gray';
        beforeEach(() => {
          selectRow.bgColor = jest.fn().mockReturnValue(color);
          wrapper = mount(
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
            </SelectionContext.Provider>
          );
        });

        it('should inject style prop with correct backgroundColor', () => {
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            backgroundColor: color
          });
        });

        it('should call selectRow.bgColor function correctly', () => {
          expect(selectRow.bgColor).toHaveBeenCalledTimes(1);
          expect(selectRow.bgColor).toHaveBeenCalledWith(row, rowIndex);
        });
      });
    });
  });

  describe('if current row is selected', () => {
    const selectedClassName = 'select-classname';
    describe('when selectRow.style is defined as an object', () => {
      beforeEach(() => {
        selectRow = { mode: 'checkbox', selected: [data[rowIndex][keyField]], classes: selectedClassName };
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
          </SelectionContext.Provider>
        );
      });

      it('should inject className prop correctly', () => {
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        expect(wrapper.find(BaseComponent).prop('className')).toEqual(selectedClassName);
      });

      describe('and props.className is also defined', () => {
        const componentClassName = 'component-classname';
        beforeEach(() => {
          wrapper = mount(
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              <WithSelectionComponent
                row={ row }
                keyField={ keyField }
                rowIndex={ rowIndex }
                className={ componentClassName }
              />
            </SelectionContext.Provider>
          );
        });

        it('should inject style prop correctly', () => {
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          expect(wrapper.find(BaseComponent).prop('className')).toEqual(`${componentClassName} ${selectedClassName}`);
        });
      });
    });

    describe('when selectRow.style is defined as a function', () => {
      beforeEach(() => {
        selectRow = { mode: 'checkbox', selected: [data[rowIndex][keyField]], classes: jest.fn().mockReturnValue(selectedClassName) };
        wrapper = mount(
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            <WithSelectionComponent row={ row } keyField={ keyField } rowIndex={ rowIndex } />
          </SelectionContext.Provider>
        );
      });

      it('should inject className prop correctly', () => {
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        expect(wrapper.find(BaseComponent).prop('className')).toEqual(selectedClassName);
      });

      it('should call selectRow.classes function correctly', () => {
        expect(selectRow.classes).toHaveBeenCalledTimes(1);
        expect(selectRow.classes).toHaveBeenCalledWith(row, rowIndex);
      });

      describe('and props.className is also defined', () => {
        const componentClassName = 'component-classname';
        beforeEach(() => {
          wrapper = mount(
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              <WithSelectionComponent
                row={ row }
                keyField={ keyField }
                rowIndex={ rowIndex }
                className={ componentClassName }
              />
            </SelectionContext.Provider>
          );
        });

        it('should inject style prop correctly', () => {
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          expect(wrapper.find(BaseComponent).prop('className')).toEqual(`${componentClassName} ${selectedClassName}`);
        });
      });
    });
  });
});
