import React from 'react';
import { shallow } from 'enzyme';

import ToggleList from '../src/column-toggle/toggle-list';

describe('ToggleList', () => {
  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];
  const pivotColumns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name',
    reduce: (T, t) => T + t
  }];

  let wrapper;
  describe('simple toggle list', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ToggleList
          columns={ columns }
          onColumnToggle={ () => {} }
          toggles={ { id: true, name: true } }
          contextual={ 'btn-warning' }
          className={ 'test' }
          btnClassName={ 'test' }
        />
      );
    });

    it('should render successfully', () => {
      expect(wrapper.children().length).toBe(2);
    });
  });

  describe('pivot toggle list', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ToggleList
          columns={ pivotColumns }
          onColumnToggle={ () => {} }
          toggles={ { id: true, name: true } }
          contextual={ 'btn-warning' }
          className={ 'test' }
          btnClassName={ 'test' }
        />
      );
    });

    it('should render successfully', () => {
      expect(wrapper.children().length).toBe(1);
    });
  });
});
