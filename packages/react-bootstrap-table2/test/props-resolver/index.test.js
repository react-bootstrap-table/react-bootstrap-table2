import React, { Component } from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { extendTo } from '../test-helpers/mock-component';
import baseResolver from '../../src/props-resolver/index';
import Const from '../../src/const';

describe('TableResolver', () => {
  const keyField = 'id';
  const columns = [{
    dataField: keyField,
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

  const ExtendBase = baseResolver(Component);
  const BootstrapTableMock = extendTo(ExtendBase);
  let wrapper;

  describe('validateProps', () => {
    describe('if keyField is defined and columns is all visible', () => {
      beforeEach(() => {
        const mockElement = React.createElement(BootstrapTableMock, {
          data, columns, keyField
        }, null);
        wrapper = shallow(mockElement);
      });

      it('should not throw any errors', () => {
        expect(() => wrapper.instance().validateProps()).not.toThrow();
      });
    });

    describe('if keyField is not defined on props', () => {
      beforeEach(() => {
        const mockElement = React.createElement(BootstrapTableMock, {
          data, columns
        }, null);
        wrapper = shallow(mockElement);
      });

      it('should throw error', () => {
        expect(() =>
          wrapper.instance().validateProps()
        ).toThrow(new Error('Please specify a field as key via keyField'));
      });
    });

    describe('if no columns are visible', () => {
      beforeEach(() => {
        const mockElement = React.createElement(BootstrapTableMock, {
          data, keyField, columns: []
        }, null);
        wrapper = shallow(mockElement);
      });

      it('should throw error', () => {
        expect(() =>
          wrapper.instance().validateProps()
        ).toThrow(new Error('No visible columns detected'));
      });
    });
  });

  describe('resolveSelectRowProps', () => {
    let cellSelectionInfo;
    let selectRow;

    describe('if selectRow was not defined', () => {
      beforeEach(() => {
        const mockElement = React.createElement(BootstrapTableMock, {
          data, keyField, columns
        }, null);
        wrapper = shallow(mockElement);
        cellSelectionInfo = wrapper.instance().resolveSelectRowProps();
      });

      it('should return object', () => {
        expect(cellSelectionInfo).toBeDefined();
        expect(cellSelectionInfo.constructor).toEqual(Object);
      });

      it('should contain mode in ROW_SELECT_DISABLED', () => {
        expect(cellSelectionInfo.mode).toEqual(Const.ROW_SELECT_DISABLED);
      });
    });

    describe('if selectRow was defined', () => {
      describe('when mode was defined', () => {
        it('should return object which contains ROW_SELECT_SINGLE if mode is radio', () => {
          selectRow = { mode: 'radio' };
          const mockElement = React.createElement(BootstrapTableMock, {
            data, keyField, columns, selectRow
          }, null);
          wrapper = shallow(mockElement);
          cellSelectionInfo = wrapper.instance().resolveSelectRowProps();

          expect(cellSelectionInfo).toBeDefined();
          expect(cellSelectionInfo.constructor).toEqual(Object);
          expect(cellSelectionInfo.mode).toEqual(Const.ROW_SELECT_SINGLE);
        });

        it('should return object which contains ROW_SELECT_MULTIPLE if mode is checkbox', () => {
          selectRow = { mode: 'checkbox' };
          const mockElement = React.createElement(BootstrapTableMock, {
            data, keyField, columns, selectRow
          }, null);
          wrapper = shallow(mockElement);
          cellSelectionInfo = wrapper.instance().resolveSelectRowProps();

          expect(cellSelectionInfo).toBeDefined();
          expect(cellSelectionInfo.constructor).toEqual(Object);
          expect(cellSelectionInfo.mode).toEqual(Const.ROW_SELECT_MULTIPLE);
        });
      });

      describe('when options were given', () => {
        beforeEach(() => {
          selectRow = {};
          const mockOptions = {
            foo: 'test',
            bar: sinon.stub()
          };
          const mockElement = React.createElement(BootstrapTableMock, {
            data, keyField, columns, selectRow
          }, null);
          wrapper = shallow(mockElement);
          cellSelectionInfo = wrapper.instance().resolveSelectRowProps(mockOptions);
        });

        it('should return object which contain options', () => {
          expect(cellSelectionInfo).toEqual(expect.objectContaining({
            foo: 'test',
            bar: expect.any(Function)
          }));
        });
      });
    });
  });

  describe('resolveSelectRowPropsForHeader', () => {
    let headerCellSelectionInfo;
    let selectRow;

    beforeEach(() => {
      const mockElement = React.createElement(BootstrapTableMock, {
        data, keyField, columns
      }, null);
      wrapper = shallow(mockElement);
      headerCellSelectionInfo = wrapper.instance().resolveSelectRowPropsForHeader();
    });

    describe('if selectRow was not defined', () => {
      it('should return object', () => {
        expect(headerCellSelectionInfo).toBeDefined();
        expect(headerCellSelectionInfo.constructor).toEqual(Object);
      });

      it('should contain mode in ROW_SELECT_DISABLED', () => {
        expect(headerCellSelectionInfo.mode).toEqual(Const.ROW_SELECT_DISABLED);
      });
    });

    describe('if selectRow was defined', () => {
      describe('when mode was defined', () => {
        it('should return object which contains ROW_SELECT_SINGLE if mode is radio', () => {
          selectRow = { mode: 'radio' };
          const selectedRowKeys = [];
          const mockElement = React.createElement(BootstrapTableMock, {
            data, keyField, columns, selectedRowKeys, selectRow
          }, null);
          wrapper = shallow(mockElement);
          headerCellSelectionInfo = wrapper.instance().resolveSelectRowPropsForHeader();

          expect(headerCellSelectionInfo).toBeDefined();
          expect(headerCellSelectionInfo.constructor).toEqual(Object);
          expect(headerCellSelectionInfo.mode).toEqual(Const.ROW_SELECT_SINGLE);
        });

        it('should return object which contains ROW_SELECT_MULTIPLE if mode is checkbox', () => {
          selectRow = { mode: 'checkbox' };
          const selectedRowKeys = [];
          const mockElement = React.createElement(BootstrapTableMock, {
            data, keyField, columns, selectedRowKeys, selectRow
          }, null);
          wrapper = shallow(mockElement);
          headerCellSelectionInfo = wrapper.instance().resolveSelectRowPropsForHeader();

          expect(headerCellSelectionInfo).toBeDefined();
          expect(headerCellSelectionInfo.constructor).toEqual(Object);
          expect(headerCellSelectionInfo.mode).toEqual(Const.ROW_SELECT_MULTIPLE);
        });
      });

      describe('when options were given', () => {
        beforeEach(() => {
          selectRow = {};
          const mockOptions = {
            foo: 'test',
            bar: sinon.stub(),
            allRowsSelected: false,
            selected: []
          };
          const selectedRowKeys = [];
          const mockElement = React.createElement(BootstrapTableMock, {
            data, keyField, columns, selectedRowKeys, selectRow
          }, null);
          wrapper = shallow(mockElement);
          headerCellSelectionInfo = wrapper.instance().resolveSelectRowPropsForHeader(mockOptions);
        });

        it('should return object which contain specified options', () => {
          expect(headerCellSelectionInfo).toEqual(expect.objectContaining({
            foo: 'test',
            bar: expect.any(Function)
          }));
        });

        it('should return object which can not contain allRowsSelected option', () => {
          expect(headerCellSelectionInfo.allRowsSelected).not.toBeDefined();
        });

        it('should return object which can not contain allRowsSelected option', () => {
          expect(headerCellSelectionInfo.selected).not.toBeDefined();
        });
      });

      describe('if all rows were selected', () => {
        beforeEach(() => {
          selectRow = {};
          const selectedRowKeys = [1, 2];
          const mockElement = React.createElement(BootstrapTableMock, {
            data, keyField, columns, selectRow
          }, null);

          wrapper = shallow(mockElement);

          headerCellSelectionInfo = wrapper.instance().resolveSelectRowPropsForHeader({
            allRowsSelected: true,
            selected: selectedRowKeys
          });
        });

        it('should return checkedStatus which eqauls to checked', () => {
          expect(headerCellSelectionInfo).toEqual(expect.objectContaining({
            checkedStatus: Const.CHECKBOX_STATUS_CHECKED
          }));
        });
      });

      describe('if part of rows were selected', () => {
        beforeEach(() => {
          selectRow = {};
          const selectedRowKeys = [1];
          const mockElement = React.createElement(BootstrapTableMock, {
            data, keyField, columns, selectRow
          }, null);

          wrapper = shallow(mockElement);
          headerCellSelectionInfo = wrapper.instance().resolveSelectRowPropsForHeader({
            allRowsSelected: false,
            selected: selectedRowKeys
          });
        });

        it('should return checkedStatus which eqauls to indeterminate', () => {
          expect(headerCellSelectionInfo).toEqual(expect.objectContaining({
            checkedStatus: Const.CHECKBOX_STATUS_INDETERMINATE
          }));
        });
      });

      describe('if none of row was selected', () => {
        beforeEach(() => {
          selectRow = {};
          const selectedRowKeys = [];
          const mockElement = React.createElement(BootstrapTableMock, {
            data, keyField, columns, selectRow
          }, null);

          wrapper = shallow(mockElement);

          headerCellSelectionInfo = wrapper.instance().resolveSelectRowPropsForHeader({
            allRowsSelected: false,
            selected: selectedRowKeys
          });
        });

        it('should return checkedStatus which eqauls to unchecked', () => {
          expect(headerCellSelectionInfo).toEqual(expect.objectContaining({
            checkedStatus: Const.CHECKBOX_STATUS_UNCHECKED
          }));
        });
      });
    });
  });
});
