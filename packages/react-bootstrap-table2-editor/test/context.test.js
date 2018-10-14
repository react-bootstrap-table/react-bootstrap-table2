import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';
import _ from 'react-bootstrap-table-next/src/utils';
import dataOperator from 'react-bootstrap-table-next/src/store/operators';

import {
  CLICK_TO_CELL_EDIT,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK
} from '../src/const';
import createCellEditContext, { Consumer } from '../src/context';
import cellEditFactory from '../index';

describe('CellEditContext', () => {
  let wrapper;
  let cellEdit;
  let CellEditContext;

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const keyField = 'id';

  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const defaultCellEdit = {
    mode: CLICK_TO_CELL_EDIT
  };

  const defaultSelectRow = undefined;

  const mockBase = jest.fn((() => null));

  const handleCellChange = jest.fn();

  function shallowContext(
    customCellEdit = defaultCellEdit,
    enableRemote = false,
    selectRow = defaultSelectRow
  ) {
    mockBase.mockReset();
    handleCellChange.mockReset();
    CellEditContext = createCellEditContext(
      _,
      dataOperator,
      jest.fn().mockReturnValue(enableRemote),
      handleCellChange
    );
    cellEdit = cellEditFactory(customCellEdit);
    return (
      <CellEditContext.Provider
        cellEdit={ cellEdit }
        keyField={ keyField }
        columns={ columns }
        selectRow={ selectRow }
        data={ data }
      >
        <Consumer>
          {
            cellEditProps => mockBase(cellEditProps)
          }
        </Consumer>
      </CellEditContext.Provider>
    );
  }

  describe('default render', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.render();
    });

    it('should have correct Provider property after calling createCellEditContext', () => {
      expect(CellEditContext.Provider).toBeDefined();
    });

    it('should have correct state.ridx', () => {
      expect(wrapper.state().ridx).toBeNull();
    });

    it('should have correct state.cidx', () => {
      expect(wrapper.state().cidx).toBeNull();
    });

    it('should have correct state.message', () => {
      expect(wrapper.state().message).toBeNull();
    });

    it('should pass correct cell editing props to children element', () => {
      expect(wrapper.length).toBe(1);
      expect(JSON.stringify(mockBase.mock.calls[0])).toEqual(JSON.stringify([{
        ...defaultCellEdit,
        DBCLICK_TO_CELL_EDIT,
        DELAY_FOR_DBCLICK,
        ...wrapper.state(),
        nonEditableRows: []
      }]));
    });
  });

  describe('componentWillReceiveProps', () => {
    const initialState = { ridx: 1, cidx: 1, message: 'test' };
    describe('if nextProps.cellEdit is not existing', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.setState(initialState);
        wrapper.render();
        wrapper.instance().componentWillReceiveProps({});
      });

      it('should not set state.message', () => {
        expect(wrapper.state().message).toBe(initialState.message);
      });

      it('should not set state.ridx', () => {
        expect(wrapper.state().ridx).toBe(initialState.ridx);
      });

      it('should not set state.cidx', () => {
        expect(wrapper.state().cidx).toBe(initialState.cidx);
      });
    });

    describe('if nextProps.cellEdit is existing but remote cell editing is disable', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.setState(initialState);
        wrapper.render();
        wrapper.instance().componentWillReceiveProps({
          cellEdit: cellEditFactory(defaultCellEdit)
        });
      });

      it('should not set state.message', () => {
        expect(wrapper.state().message).toBe(initialState.message);
      });

      it('should not set state.ridx', () => {
        expect(wrapper.state().ridx).toBe(initialState.ridx);
      });

      it('should not set state.cidx', () => {
        expect(wrapper.state().cidx).toBe(initialState.cidx);
      });
    });

    describe('if nextProps.cellEdit is existing and remote cell editing is enable', () => {
      describe('if nextProps.cellEdit.options.errorMessage is defined', () => {
        let message;
        beforeEach(() => {
          message = 'validation fail';
          wrapper = shallow(shallowContext(defaultCellEdit, true));
          wrapper.setState(initialState);
          wrapper.render();
          wrapper.instance().componentWillReceiveProps({
            cellEdit: cellEditFactory({
              ...defaultCellEdit,
              errorMessage: message
            })
          });
          wrapper.update();
        });

        it('should set state.message', () => {
          expect(wrapper.state('message')).toBe(message);
        });

        it('should not set state.ridx', () => {
          expect(wrapper.state().ridx).toBe(initialState.ridx);
        });

        it('should not set state.cidx', () => {
          expect(wrapper.state().cidx).toBe(initialState.cidx);
        });
      });

      describe('if nextProps.cellEdit.options.errorMessage is not defined', () => {
        beforeEach(() => {
          wrapper = shallow(shallowContext(defaultCellEdit, true));
          wrapper.setState(initialState);
          wrapper.instance().componentWillReceiveProps({
            cellEdit: cellEditFactory({ ...defaultCellEdit })
          });
          wrapper.update();
        });

        it('should not set state.message', () => {
          expect(wrapper.state('message')).toBe(initialState.message);
        });

        it('should set correct state.ridx', () => {
          expect(wrapper.state().ridx).toBeNull();
        });

        it('should set correct state.cidx', () => {
          expect(wrapper.state().cidx).toBeNull();
        });
      });
    });
  });

  describe('handleCellUpdate', () => {
    const row = data[1];
    const column = columns[1];
    const newValue = 'This is new value';
    const oldValue = row[column.dataField];

    describe('if cellEdit.beforeSaveCell prop is defined', () => {
      const beforeSaveCell = jest.fn();

      beforeEach(() => {
        beforeSaveCell.mockReset();
        wrapper = shallow(shallowContext({
          ...defaultCellEdit,
          beforeSaveCell
        }));
        wrapper.instance().handleCellUpdate(
          row,
          column,
          newValue
        );
      });

      it('should call cellEdit.beforeSaveCell correctly', () => {
        expect(beforeSaveCell).toHaveBeenCalledTimes(1);
        expect(beforeSaveCell).toHaveBeenCalledWith(oldValue, newValue, row, column);
      });
    });

    describe('when remote cell editing is enable', () => {
      const afterSaveCell = jest.fn();
      beforeEach(() => {
        afterSaveCell.mockReset();
        wrapper = shallow(shallowContext({
          ...defaultCellEdit,
          afterSaveCell
        }, true));
        wrapper.instance().handleCellUpdate(
          row,
          column,
          newValue
        );
      });

      it('should call handleCellChange correctly', () => {
        expect(handleCellChange).toHaveBeenCalledTimes(1);
        expect(handleCellChange).toHaveBeenCalledWith(row[keyField], column.dataField, newValue);
      });

      it('should not call cellEdit.afterSaveCell even if it is defined', () => {
        expect(afterSaveCell).toHaveBeenCalledTimes(0);
      });
    });

    describe('when remote cell editing is disable', () => {
      const afterSaveCell = jest.fn();

      beforeEach(() => {
        afterSaveCell.mockReset();
        wrapper = shallow(shallowContext({
          ...defaultCellEdit,
          afterSaveCell
        }));
        wrapper.setState({
          ridx: 1,
          cidx: 1
        });
        wrapper.instance().handleCellUpdate(
          row,
          column,
          newValue
        );
      });

      it('should not call handleCellChange correctly', () => {
        expect(handleCellChange).toHaveBeenCalledTimes(0);
      });

      it('should set state correctly', () => {
        expect(wrapper.state('ridx')).toBeNull();
        expect(wrapper.state('cidx')).toBeNull();
        expect(wrapper.state('message')).toBeNull();
      });

      it('should call cellEdit.afterSaveCell if it is defined', () => {
        expect(afterSaveCell).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('completeEditing', () => {
    const initialState = { ridx: 1, cidx: 1, message: 'test' };

    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.setState(initialState);
      wrapper.render();
      wrapper.instance().completeEditing();
    });

    it('should set state correctly', () => {
      expect(wrapper.state().ridx).toBeNull();
      expect(wrapper.state().cidx).toBeNull();
      expect(wrapper.state().message).toBeNull();
    });
  });

  describe('startEditing', () => {
    const ridx = 0;
    const cidx = 1;

    describe('if selectRow prop is not defined', () => {
      beforeEach(() => {
        wrapper = shallow(shallowContext());
        wrapper.render();
        wrapper.instance().startEditing(ridx, cidx);
      });

      it('should set state correctly', () => {
        expect(wrapper.state().ridx).toEqual(ridx);
        expect(wrapper.state().cidx).toEqual(cidx);
      });
    });

    describe('if selectRow prop is defined', () => {
      describe('and selectRow.clickToEdit is enable', () => {
        beforeEach(() => {
          wrapper = shallow(shallowContext(
            defaultCellEdit,
            false,
            {
              ...defaultSelectRow,
              clickToEdit: true
            }
          ));
          wrapper.render();
          wrapper.instance().startEditing(ridx, cidx);
        });

        it('should set state correctly', () => {
          expect(wrapper.state().ridx).toEqual(ridx);
          expect(wrapper.state().cidx).toEqual(cidx);
        });
      });

      describe('and selectRow.clickToSelect is disable', () => {
        beforeEach(() => {
          wrapper = shallow(shallowContext(
            defaultCellEdit,
            false,
            {
              ...defaultSelectRow,
              clickToSelect: false
            }
          ));
          wrapper.render();
          wrapper.instance().startEditing(ridx, cidx);
        });

        it('should set state correctly', () => {
          expect(wrapper.state().ridx).toEqual(ridx);
          expect(wrapper.state().cidx).toEqual(cidx);
        });
      });

      describe('and selectRow.clickToEdit & selectRow.clickToSelect is enable', () => {
        beforeEach(() => {
          wrapper = shallow(shallowContext(
            defaultCellEdit,
            false,
            {
              ...defaultSelectRow,
              clickToEdit: false,
              clickToSelect: true
            }
          ));
          wrapper.render();
          wrapper.instance().startEditing(ridx, cidx);
        });

        it('should not set state', () => {
          expect(wrapper.state().ridx).toBeNull();
          expect(wrapper.state().cidx).toBeNull();
        });
      });
    });
  });

  describe('escapeEditing', () => {
    const initialState = { ridx: 1, cidx: 1 };

    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.setState(initialState);
      wrapper.instance().escapeEditing();
    });

    it('should set state correctly', () => {
      expect(wrapper.state().ridx).toBeNull();
      expect(wrapper.state().cidx).toBeNull();
    });
  });
});
