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

    describe('if columns is all unvisible', () => {
      beforeEach(() => {
        const mockElement = React.createElement(BootstrapTableMock, {
          data, keyField, columns: []
        }, null);
        wrapper = shallow(mockElement);
      });

      it('should throw error', () => {
        expect(() =>
          wrapper.instance().validateProps()
        ).toThrow(new Error('No any visible columns detect'));
      });
    });
  });

  describe('resolveCellEditProps', () => {
    describe('if cellEdit prop not defined', () => {
      beforeEach(() => {
        const mockElement = React.createElement(BootstrapTableMock, {
          data, keyField, columns
        }, null);
        wrapper = shallow(mockElement);
      });

      it('should resolve a default cellEdit instance', () => {
        const cellEdit = wrapper.instance().resolveCellEditProps();
        expect(cellEdit).toBeDefined();
        expect(cellEdit.mode).toEqual(Const.UNABLE_TO_CELL_EDIT);
        expect(cellEdit.nonEditableRows.length).toEqual(0);
        expect(cellEdit.ridx).toBeNull();
        expect(cellEdit.cidx).toBeNull();
      });

      it('should resolve a default cellEdit instance even if state.currEditCell changed', () => {
        const ridx = 1;
        const cidx = 1;
        wrapper.setState({ currEditCell: { ridx, cidx } });
        const cellEdit = wrapper.instance().resolveCellEditProps();
        expect(cellEdit).toBeDefined();
        expect(cellEdit.ridx).toEqual(ridx);
        expect(cellEdit.cidx).toEqual(cidx);
      });
    });
  });

  describe('if cellEdit prop defined', () => {
    const expectNonEditableRows = [1, 2];
    const cellEdit = {
      mode: Const.DBCLICK_TO_CELL_EDIT,
      onEditing: sinon.stub(),
      blurToSave: true,
      beforeSaveCell: sinon.stub(),
      afterSaveCell: sinon.stub(),
      nonEditableRows: sinon.stub().returns(expectNonEditableRows)
    };

    beforeEach(() => {
      const mockElement = React.createElement(BootstrapTableMock, {
        data, keyField, columns, cellEdit
      }, null);
      wrapper = shallow(mockElement);
    });

    it('should resolve a cellEdit correctly', () => {
      const cellEditInfo = wrapper.instance().resolveCellEditProps();
      expect(cellEditInfo).toBeDefined();
      expect(cellEditInfo.ridx).toBeNull();
      expect(cellEditInfo.cidx).toBeNull();
      expect(cellEditInfo.mode).toEqual(cellEdit.mode);
      expect(cellEditInfo.onEditing).toEqual(cellEdit.onEditing);
      expect(cellEditInfo.blurToSave).toEqual(cellEdit.blurToSave);
      expect(cellEditInfo.beforeSaveCell).toEqual(cellEdit.beforeSaveCell);
      expect(cellEditInfo.afterSaveCell).toEqual(cellEdit.afterSaveCell);
      expect(cellEditInfo.nonEditableRows).toEqual(expectNonEditableRows);
    });

    it('should attach options to cellEdit props', () => {
      const something = {
        test: 1,
        cb: sinon.stub()
      };
      const cellEditInfo = wrapper.instance().resolveCellEditProps(something);
      expect(cellEditInfo).toBeDefined();
      expect(cellEditInfo.test).toEqual(something.test);
      expect(cellEditInfo.cb).toEqual(something.cb);
    });
  });
});
