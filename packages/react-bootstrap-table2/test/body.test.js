import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Body from '../src/body';
import Row from '../src/row';
import Const from '../src/const';
import RowSection from '../src/row-section';
import mockBodyResolvedProps from '../test/mock-data/body-resolved-props';

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

  describe('simplest body', () => {
    beforeEach(() => {
      wrapper = shallow(<Body {...mockBodyResolvedProps} keyField="id" columns={ columns } data={ data } />);
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
          {...mockBodyResolvedProps}
          keyField="id"
          columns={ columns }
          data={ data }
          visibleColumnSize={ columns.length }
          isEmpty
        />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('tbody').length).toBe(1);
      expect(wrapper.find(RowSection).length).toBe(1);
      expect(wrapper.find(RowSection).prop('colSpan')).toBe(columns.length);
      expect(wrapper.find(RowSection).prop('content')).toBe(null);
    });

    describe('when noDataIndication props is defined', () => {
      let emptyIndication;

      describe('and it is not a function', () => {
        beforeEach(() => {
          emptyIndication = 'Table is empty';
          wrapper = shallow(
            <Body
              {...mockBodyResolvedProps}
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
              {...mockBodyResolvedProps}
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

  describe('when cellEdit.nonEditableRows props is defined', () => {
    const nonEditableRows = [data[1].id];
    const keyField = 'id';
    const cellEdit = {
      mode: Const.CLICK_TO_CELL_EDIT,
      nonEditableRows
    };
    beforeEach(() => {
      wrapper = shallow(
        <Body
          {...mockBodyResolvedProps}
          data={ data }
          columns={ columns }
          keyField={ keyField }
          cellEdit={ cellEdit }
        />
      );
    });

    it('should render Row component with correct editable prop', () => {
      expect(wrapper.length).toBe(1);
      const rows = wrapper.find(Row);
      for (let i = 0; i < rows.length; i += 1) {
        if (nonEditableRows.indexOf(rows.get(i).props.row[keyField]) > -1) {
          expect(rows.get(i).props.editable).toBeFalsy();
        } else {
          expect(rows.get(i).props.editable).toBeTruthy();
        }
      }
    });
  });

  describe('when selectRow.mode is checkbox or radio (row was selectable)', () => {
    const keyField = 'id';
    const selectRow = { mode: 'checkbox' };

    it('props selected should be true if all rows were selected', () => {
      wrapper = shallow(
        <Body
          {...mockBodyResolvedProps}
          data={ data }
          columns={ columns }
          keyField={ keyField }
          selectedRowKeys={[1, 2]}
          selectRow={selectRow}
        />
      );

      expect(wrapper.find(Row).get(0).props.selected).toBe(true);
    });

    it('props selected should be false if all rows were not selected', () => {
      wrapper = shallow(
        <Body
          {...mockBodyResolvedProps}
          data={ data }
          columns={ columns }
          keyField={ keyField }
          selectedRowKeys={[]}
          selectRow={selectRow}
        />
      );

      expect(wrapper.find(Row).get(0).props.selected).toBe(false);
    });
  });

  describe('when selectRow.mode is ROW_SELECT_DISABLED (row was un-selectable)', () => {
    beforeEach(() => {
      const keyField = 'id';
      wrapper = shallow(
        <Body
          {...mockBodyResolvedProps}
          data={ data }
          columns={ columns }
          keyField={ keyField }
          selectedRowKeys={[]}
        />
      );
    });

    it('prop selected should be null', () => {
      expect(wrapper.find(Row).get(0).props.selected).toBeNull();
    });
  });
});
