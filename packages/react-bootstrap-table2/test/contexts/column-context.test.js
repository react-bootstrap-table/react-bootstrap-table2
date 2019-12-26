import 'jsdom-global/register';
import React from 'react';
import { shallow } from 'enzyme';

import BootstrapTable from '../../src/bootstrap-table';
import createColumnManagementContext from '../../src/contexts/column-context';

describe('ColumnManagementContext', () => {
  let wrapper;

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  const mockBase = jest.fn((props => (
    <BootstrapTable
      data={ data }
      columns={ columns }
      keyField="id"
      { ...props }
    />
  )));

  const ColumnManagementContext = createColumnManagementContext();

  function shallowContext(options = {}) {
    return (
      <ColumnManagementContext.Provider
        data={ data }
        columns={ columns }
        { ...options }
      >
        <ColumnManagementContext.Consumer>
          {
            columnToggleProps => mockBase(columnToggleProps)
          }
        </ColumnManagementContext.Consumer>
      </ColumnManagementContext.Provider>
    );
  }

  describe('default render', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.render();
    });

    it('should have correct Provider property after calling createColumnManagementContext', () => {
      expect(ColumnManagementContext.Provider).toBeDefined();
    });

    it('should have correct Consumer property after calling createColumnManagementContext', () => {
      expect(ColumnManagementContext.Consumer).toBeDefined();
    });
  });

  describe('when toggles props exist', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext({
        toggles: {
          id: true,
          name: false
        }
      }));
    });

    it('should render component with correct columns props', () => {
      expect(wrapper.prop('value').columns).toHaveLength(columns.length - 1);
      expect(wrapper.prop('value').columns[0].dataField).toEqual('id');
    });
  });

  describe('if there is any column.hidden is true', () => {
    beforeEach(() => {
      wrapper = shallow(shallowContext({
        columns: [{
          dataField: 'id',
          text: 'ID'
        }, {
          dataField: 'name',
          text: 'Name',
          hidden: true
        }]
      }));
    });

    it('should render component with correct columns props', () => {
      expect(wrapper.prop('value').columns).toHaveLength(columns.length - 1);
      expect(wrapper.prop('value').columns[0].dataField).toEqual('id');
    });
  });
});
