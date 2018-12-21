import React, { Component } from 'react';
import { shallow } from 'enzyme';

import { extendTo } from '../test-helpers/mock-component';
import baseResolver from '../../src/props-resolver/index';

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

  describe('visibleRows', () => {
    describe('if hiddenRows prop is not existing', () => {
      beforeEach(() => {
        const mockElement = React.createElement(BootstrapTableMock, {
          data, columns, keyField
        }, null);
        wrapper = shallow(mockElement);
      });

      it('should return correct data', () => {
        expect(wrapper.instance().visibleRows()).toEqual(data);
      });
    });

    describe('if hiddenRows prop is an empty array', () => {
      beforeEach(() => {
        const mockElement = React.createElement(BootstrapTableMock, {
          data, columns, keyField, hiddenRows: []
        }, null);
        wrapper = shallow(mockElement);
      });

      it('should return correct data', () => {
        expect(wrapper.instance().visibleRows()).toEqual(data);
      });
    });

    describe('if hiddenRows prop is not an empty array', () => {
      const hiddenRows = [1];

      beforeEach(() => {
        const mockElement = React.createElement(BootstrapTableMock, {
          data, columns, keyField, hiddenRows
        }, null);
        wrapper = shallow(mockElement);
      });

      it('should return correct data', () => {
        const result = wrapper.instance().visibleRows();
        expect(result).toHaveLength(data.length - hiddenRows.length);
        expect(result).toEqual(data.filter(d => !hiddenRows.includes(d.id)));
      });
    });
  });

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
});
