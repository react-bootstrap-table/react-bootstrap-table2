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
