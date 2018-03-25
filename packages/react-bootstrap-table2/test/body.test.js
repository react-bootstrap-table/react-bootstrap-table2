import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Body from '../src/body';
import Row from '../src/row';
import Const from '../src/const';
import RowSection from '../src/row-section';
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

    describe('when selectRow.style is defined', () => {
      const selectedRowKey = data[0][keyField];
      const selectedRowKeys = [selectedRowKey];
      const selectedStyle = { backgroundColor: 'green', fontWeight: 'bold' };
      const selectRow = { mode: 'radio', style: selectedStyle };

      beforeEach(() => {
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowStyle={ rowStyle }
            selectRow={ selectRow }
            selectedRowKeys={ selectedRowKeys }
          />);
      });

      it('should rendering selected Row component with mixing selectRow.style correctly', () => {
        const selectedRow = wrapper.find(Row).get(0);
        expect(JSON.stringify(selectedRow.props.style)).toBe(JSON.stringify({
          ...rowStyle,
          ...selectedStyle
        }));
      });

      describe('and selectRow.bgColor is also defined', () => {
        beforeEach(() => {
          selectRow.bgColor = 'gray';
          wrapper = shallow(
            <Body
              { ...mockBodyResolvedProps }
              keyField="id"
              columns={ columns }
              data={ data }
              rowStyle={ rowStyle }
              selectRow={ selectRow }
              selectedRowKeys={ selectedRowKeys }
            />);
        });

        it('should rendering selected Row component with mixing selectRow.style correctly', () => {
          const selectedRow = wrapper.find(Row).get(0);
          expect(JSON.stringify(selectedRow.props.style)).toBe(JSON.stringify({
            ...rowStyle,
            ...selectedStyle,
            backgroundColor: selectRow.bgColor
          }));
        });

        it('should render selected Row component with correct style.backgroundColor', () => {
          const selectedRow = wrapper.find(Row).get(0);
          expect(selectedRow.props.style.backgroundColor).toEqual(selectRow.bgColor);
        });
      });
    });

    describe('when selectRow.bgColor is defined', () => {
      const selectedRowKey = data[0][keyField];
      const selectedRowKeys = [selectedRowKey];
      const selectRow = { mode: 'radio', bgColor: 'gray' };

      beforeEach(() => {
        selectRow.bgColor = 'gray';
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowStyle={ rowStyle }
            selectRow={ selectRow }
            selectedRowKeys={ selectedRowKeys }
          />);
      });

      it('should rendering selected Row component with correct style', () => {
        const selectedRow = wrapper.find(Row).get(0);
        expect(JSON.stringify(selectedRow.props.style)).toBe(JSON.stringify({
          ...rowStyle,
          backgroundColor: selectRow.bgColor
        }));
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

    describe('when selectRow.classes is defined', () => {
      const selectedRowKey = data[0][keyField];
      const selectedRowKeys = [selectedRowKey];
      const selectedClasses = 'selected-classes';
      const selectRow = { mode: 'radio', classes: selectedClasses };

      beforeEach(() => {
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowClasses={ rowClasses }
            selectRow={ selectRow }
            selectedRowKeys={ selectedRowKeys }
          />);
      });

      it('should rendering selected Row component with mixing selectRow.classes correctly', () => {
        const selectedRow = wrapper.find(Row).get(0);
        expect(selectedRow.props.className).toBe(`${rowClasses} ${selectedClasses}`);
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

  describe('when cellEdit.nonEditableRows props is defined', () => {
    const nonEditableRows = [data[1].id];
    const cellEdit = {
      mode: Const.CLICK_TO_CELL_EDIT,
      nonEditableRows
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
    const selectRow = { mode: 'checkbox' };
    const selectedRowKey = data[0][keyField];
    const selectedRowKeys = [selectedRowKey];

    beforeEach(() => {
      wrapper = shallow(
        <Body
          { ...mockBodyResolvedProps }
          data={ data }
          columns={ columns }
          keyField={ keyField }
          selectedRowKeys={ selectedRowKeys }
          selectRow={ selectRow }
        />
      );
    });

    it('should render Row component with correct selected prop', () => {
      const rows = wrapper.find(Row);
      for (let i = 0; i < rows.length; i += 1) {
        const row = rows.get(i);
        expect(row.props.selected).toBe(selectedRowKeys.indexOf(row.props.row[keyField]) > -1);
      }
    });

    describe('if selectRow.style is defined as an object', () => {
      const style = { backgroundColor: 'red' };

      beforeEach(() => {
        selectRow.style = style;
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            selectedRowKeys={ selectedRowKeys }
            selectRow={ selectRow }
          />
        );
      });

      it('should render Row component with correct style prop', () => {
        expect(JSON.stringify(wrapper.find(Row).get(0).props.style)).toBe(JSON.stringify(style));
      });
    });

    describe('if selectRow.style is defined as a function', () => {
      const style = { backgroundColor: 'red' };
      const styleCallBack = sinon.stub().returns(style);

      beforeEach(() => {
        selectRow.style = styleCallBack;
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            selectedRowKeys={ selectedRowKeys }
            selectRow={ selectRow }
          />
        );
      });

      it('should calling style callback correctly', () => {
        expect(styleCallBack.callCount).toBe(1);
        expect(styleCallBack.calledWith(data[0]), 1);
      });

      it('should render Row component with correct style prop', () => {
        expect(JSON.stringify(wrapper.find(Row).get(0).props.style)).toBe(JSON.stringify(style));
      });
    });

    describe('if selectRow.classes is defined as a string', () => {
      const className = 'custom-class';

      beforeEach(() => {
        selectRow.classes = className;
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            selectedRowKeys={ selectedRowKeys }
            selectRow={ selectRow }
          />
        );
      });

      it('should render Row component with correct className prop', () => {
        expect(wrapper.find(Row).get(0).props.className).toEqual(className);
      });
    });

    describe('if selectRow.classes is defined as a function', () => {
      const className = 'custom-class';
      const classesCallBack = sinon.stub().returns(className);

      beforeEach(() => {
        selectRow.classes = classesCallBack;
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            selectedRowKeys={ selectedRowKeys }
            selectRow={ selectRow }
          />
        );
      });

      it('should calling style callback correctly', () => {
        expect(classesCallBack.callCount).toBe(1);
        expect(classesCallBack.calledWith(data[0]), 1);
      });

      it('should render Row component with correct style prop', () => {
        expect(wrapper.find(Row).get(0).props.className).toEqual(className);
      });
    });

    describe('if selectRow.bgColor is defined as a string', () => {
      const bgColor = 'red';

      beforeEach(() => {
        selectRow.bgColor = bgColor;
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            selectedRowKeys={ selectedRowKeys }
            selectRow={ selectRow }
          />
        );
      });

      it('should render Row component with correct style.backgroundColor prop', () => {
        expect(wrapper.find(Row).get(0).props.style).toEqual({ backgroundColor: bgColor });
      });
    });

    describe('if selectRow.bgColor is defined as a string', () => {
      const bgColor = 'red';
      const bgColorCallBack = sinon.stub().returns(bgColor);

      beforeEach(() => {
        selectRow.bgColor = bgColorCallBack;
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            selectedRowKeys={ selectedRowKeys }
            selectRow={ selectRow }
          />
        );
      });

      it('should calling selectRow.bgColor callback correctly', () => {
        expect(bgColorCallBack.calledOnce).toBeTruthy();
        expect(bgColorCallBack.calledWith(data[0]), 1).toBeTruthy();
      });

      it('should render Row component with correct style.backgroundColor prop', () => {
        expect(wrapper.find(Row).get(0).props.style).toEqual({ backgroundColor: bgColor });
      });
    });

    describe('if selectRow.bgColor defined and selectRow.style.backgroundColor defined', () => {
      const bgColor = 'yellow';
      const style = { backgroundColor: 'red' };

      beforeEach(() => {
        selectRow.style = style;
        selectRow.bgColor = bgColor;
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            selectedRowKeys={ selectedRowKeys }
            selectRow={ selectRow }
          />
        );
      });

      it('should take selectRow.bgColor as higher priority', () => {
        expect(wrapper.find(Row).get(0).props.style.backgroundColor).toBe(bgColor);
      });
    });

    describe('if selectRow.nonSelectable is defined', () => {
      const nonSelectableRowIndex = 1;
      const nonSelectable = [data[nonSelectableRowIndex][keyField]];

      beforeEach(() => {
        selectRow.nonSelectable = nonSelectable;
        wrapper = shallow(
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            selectedRowKeys={ selectedRowKeys }
            selectRow={ selectRow }
          />
        );
      });

      it('should render Row component with correct selectable prop', () => {
        expect(wrapper.find(Row).get(0).props.selectable).toBeTruthy();
        expect(wrapper.find(Row).get(nonSelectableRowIndex).props.selectable).toBeFalsy();
      });
    });
  });

  describe('when selectRow.mode is ROW_SELECT_DISABLED (row was un-selectable)', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Body
          { ...mockBodyResolvedProps }
          data={ data }
          columns={ columns }
          keyField={ keyField }
          selectedRowKeys={ [] }
        />
      );
    });

    it('prop selected should be null', () => {
      expect(wrapper.find(Row).get(0).props.selected).toBeNull();
    });
  });
});
