import 'jsdom-global/register';
import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import Body from '../src/body';
import Row from '../src/row/simple-row';
import RowAggregator from '../src/row/aggregate-row';
import Const from '../src/const';
import RowSection from '../src/row/row-section';
import SelectionContext from '../src/contexts/selection-context';
import ExpansionContext from '../src/contexts/row-expand-context';
import mockBodyResolvedProps from './test-helpers/mock/body-resolved-props';

describe('Body', () => {
  let wrapper;
  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const keyField = 'id';

  describe('simplest body', () => {
    beforeEach(() => {
      wrapper = shallow(<Body { ...mockBodyResolvedProps } keyField="id" columns={ columns } data={ data } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('tbody').length).toBe(1);
      expect(wrapper.find(Row).length).toBe(data.length);
    });
  });

  describe('when data is empty', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Body
          { ...mockBodyResolvedProps }
          keyField="id"
          columns={ columns }
          data={ data }
          visibleColumnSize={ columns.length }
          isEmpty
        />);
    });

    it('should not render', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('tbody').length).toBe(0);
      expect(wrapper.find(RowSection).length).toBe(0);
    });

    describe('when noDataIndication props is defined', () => {
      let emptyIndication;

      describe('and it is not a function', () => {
        beforeEach(() => {
          emptyIndication = 'Table is empty';
          wrapper = shallow(
            <Body
              { ...mockBodyResolvedProps }
              keyField="id"
              columns={ columns }
              data={ data }
              visibleColumnSize={ columns.length }
              noDataIndication={ emptyIndication }
              isEmpty
            />);
        });

        it('should render successfully', () => {
          expect(wrapper.length).toBe(1);
          expect(wrapper.find('tbody').length).toBe(1);
          expect(wrapper.find(RowSection).length).toBe(1);
          expect(wrapper.find(RowSection).prop('content')).toEqual(emptyIndication);
        });
      });

      describe('and it is a function', () => {
        const content = 'Table is empty';
        let emptyIndicationCallBack;

        beforeEach(() => {
          emptyIndicationCallBack = sinon.stub().returns(content);
          wrapper = shallow(
            <Body
              { ...mockBodyResolvedProps }
              keyField="id"
              columns={ columns }
              data={ data }
              visibleColumnSize={ columns.length }
              noDataIndication={ emptyIndicationCallBack }
              isEmpty
            />);
        });

        it('should render successfully', () => {
          expect(wrapper.length).toBe(1);
          expect(wrapper.find('tbody').length).toBe(1);
          expect(wrapper.find(RowSection).length).toBe(1);
          expect(wrapper.find(RowSection).prop('content')).toEqual(emptyIndication);
        });

        it('should call custom noDataIndication function correctly', () => {
          expect(emptyIndicationCallBack.callCount).toBe(1);
        });
      });
    });
  });

  describe('when rowStyle prop is defined', () => {
    const rowStyle = { backgroundColor: 'red', color: 'white' };

    describe('and it is a style object', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowStyle={ rowStyle }
          />);
      });

      it('should rendering Row component with correct style', () => {
        const rows = wrapper.find(Row);
        rows.forEach((row) => {
          expect(row.props().style).toEqual(rowStyle);
        });
      });
    });

    describe('and it is a callback functoin', () => {
      const rowStyleCallBack = sinon.stub().returns(rowStyle);
      beforeEach(() => {
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowStyle={ rowStyleCallBack }
          />);
      });

      it('should calling rowStyle callBack correctly', () => {
        expect(rowStyleCallBack.callCount).toBe(data.length);
      });

      it('should calling rowStyle callBack with correct argument', () => {
        expect(rowStyleCallBack.firstCall.calledWith(data[0], 0)).toBeTruthy();
        expect(rowStyleCallBack.secondCall.calledWith(data[1], 1)).toBeTruthy();
      });

      it('should rendering Row component with correct style', () => {
        const rows = wrapper.find(Row);
        rows.forEach((row) => {
          expect(row.props().style).toEqual(rowStyle);
        });
      });
    });
  });

  describe('when rowClasses prop is defined', () => {
    const rowClasses = 'test-classe';

    describe('and it is a string', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowClasses={ rowClasses }
          />);
      });

      it('should rendering Row component with correct className', () => {
        const rows = wrapper.find(Row);
        rows.forEach((row) => {
          expect(row.props().className).toEqual(rowClasses);
        });
      });
    });

    describe('and it is a callback function', () => {
      const rowClassesCallBack = sinon.stub().returns(rowClasses);

      beforeEach(() => {
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowClasses={ rowClassesCallBack }
          />);
      });

      it('should calling rowClasses callback correctly', () => {
        expect(rowClassesCallBack.callCount).toBe(data.length);
      });

      it('should calling rowClasses callback with correct argument', () => {
        expect(rowClassesCallBack.firstCall.calledWith(data[0], 0)).toBeTruthy();
        expect(rowClassesCallBack.secondCall.calledWith(data[1], 1)).toBeTruthy();
      });

      it('should rendering Row component with correct className', () => {
        const rows = wrapper.find(Row);
        rows.forEach((row) => {
          expect(row.props().className).toEqual(rowClasses);
        });
      });
    });
  });

  describe('when rowEvents prop is defined', () => {
    const rowEvents = { onClick: sinon.stub() };

    describe('and it is a string', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowEvents={ rowEvents }
          />);
      });

      it('should rendering Row component with correct attrs prop', () => {
        const rows = wrapper.find(Row);
        rows.forEach((row) => {
          expect(row.props().attrs).toEqual(rowEvents);
        });
      });
    });
  });

  describe('when cellEdit.createContext props is defined', () => {
    const EditingCellComponent = () => null;
    const RowComponent = props => <Row { ...props } />;
    const cellEdit = {
      options: { onStartEdit: jest.fn() },
      createContext: jest.fn(),
      createEditingCell: jest.fn().mockReturnValue(EditingCellComponent),
      withRowLevelCellEdit: jest.fn().mockReturnValue(RowComponent)
    };
    beforeEach(() => {
      wrapper = shallow(
        <Body
          { ...mockBodyResolvedProps }
          data={ data }
          columns={ columns }
          keyField={ keyField }
          cellEdit={ cellEdit }
        />
      );
    });

    it('should render Row Component correctly', () => {
      expect(wrapper.length).toBe(1);
      expect(cellEdit.createEditingCell).toHaveBeenCalledTimes(1);
      expect(cellEdit.withRowLevelCellEdit).toHaveBeenCalledTimes(1);
      expect(wrapper.find(RowComponent)).toHaveLength(2);
      const aRowElement = wrapper.find(RowComponent).get(0);
      expect(aRowElement.props.EditingCellComponent).toBeDefined();
    });
  });

  describe('when selectRow.mode is ROW_SELECT_DISABLED or expandRow.renderer is undefined', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Body
          { ...mockBodyResolvedProps }
          data={ data }
          columns={ columns }
          keyField={ keyField }
        />
      );
    });

    it('shouldn\'t render RowAggregator component', () => {
      expect(wrapper.find(RowAggregator)).toHaveLength(0);
    });
  });

  describe('when selectRow.mode is defined correctly', () => {
    const selectRow = { mode: 'checkbox' };

    beforeEach(() => {
      wrapper = mount(
        <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            selectRow={ selectRow }
          />
        </SelectionContext.Provider>
      );
    });

    it('should render RowAggregator component correctly', () => {
      const rowAggregator = wrapper.find(RowAggregator);

      expect(rowAggregator.get(0).props.selectRow.mode)
        .not.toEqual(Const.ROW_SELECT_DISABLED);
      expect(rowAggregator.get(0).props.selected).toBeDefined();
      expect(rowAggregator.get(0).props.selectable).toBeDefined();
    });
  });

  describe('when expandRow.renderer is defined correctly', () => {
    const expandRow = { renderer: jest.fn() };

    beforeEach(() => {
      wrapper = mount(
        <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            expandRow={ expandRow }
          />
        </ExpansionContext.Provider>
      );
    });

    it('should render RowAggregator component correctly', () => {
      const rowAggregator = wrapper.find(RowAggregator);
      expect(rowAggregator.get(0).props.expandRow.renderer).toEqual(expandRow.renderer);
      expect(rowAggregator.get(0).props.expanded).toBeDefined();
      expect(rowAggregator.get(0).props.expandable).toBeDefined();
    });
  });
});
