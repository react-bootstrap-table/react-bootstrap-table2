/* eslint react/prefer-stateless-function: 0 */
/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { shallow } from 'enzyme';

import BootstrapTable from '../src/bootstrap-table';
import Container from '../index.js';

describe('container', () => {
  let wrapper;

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

  describe('initialization', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Container keyField={ keyField } data={ data } columns={ columns } />
      );
    });

    it('should initialize BaseComponent', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('BootstrapTable');
    });

    it('should render BootstrapTable successfully', () => {
      expect(wrapper.find(BootstrapTable)).toHaveLength(1);
    });

    it('should creating store successfully', () => {
      const store = wrapper.instance().store;
      expect(store).toBeDefined();
      expect(store.data).toEqual(data);
      expect(store.keyField).toEqual(keyField);
    });
  });

  describe('when cellEdit prop is defined', () => {
    const wrapperFactory = Base => class CellEditWrapper extends React.Component {
      render() { return <Base { ...this.props } />; }
    };

    const cellEdit = {
      wrapperFactory,
      options: {
        mode: 'click'
      }
    };

    beforeEach(() => {
      wrapper = shallow(
        <Container
          keyField={ keyField }
          data={ data }
          columns={ columns }
          cellEdit={ cellEdit }
        />
      );
    });

    it('should initialize BaseComponent correctly', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('CellEditWrapper');
    });

    it('should render CellEditWrapper component successfully', () => {
      expect(wrapper.find('CellEditWrapper')).toHaveLength(1);
    });

    it('should render BootstrapTable component successfully', () => {
      expect(wrapper.dive().find(BootstrapTable)).toHaveLength(1);
    });
  });

  describe('when selectRow prop is defined', () => {
    const selectRow = {
      mode: 'checkbox'
    };

    beforeEach(() => {
      wrapper = shallow(
        <Container
          keyField={ keyField }
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
        />
      );
    });

    it('should initialize BaseComponent correctly', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('RowSelectionWrapper');
    });

    it('should render BootstrapTable component successfully', () => {
      expect(wrapper.dive().find(BootstrapTable)).toHaveLength(1);
    });

    it('should render RowSelectionWrapper component successfully', () => {
      expect(wrapper.find('RowSelectionWrapper').length).toBe(1);
    });
  });

  describe('when pagination prop is defined', () => {
    const wrapperFactory = Base => class PaginationWrapper extends React.Component {
      render() { return <Base { ...this.props } />; }
    };
    const pagination = {
      wrapperFactory
    };

    beforeEach(() => {
      wrapper = shallow(
        <Container
          keyField={ keyField }
          data={ data }
          columns={ columns }
          pagination={ pagination }
        />
      );
    });

    it('should initialize BaseComponent correctly', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('PaginationWrapper');
    });

    it('should render BootstrapTable component successfully', () => {
      expect(wrapper.dive().find(BootstrapTable)).toHaveLength(1);
    });

    it('should render PaginationWrapper component successfully', () => {
      expect(wrapper.find('PaginationWrapper').length).toBe(1);
    });
  });

  describe('when filter prop is defined', () => {
    const wrapperFactory = Base => class FilterWrapper extends React.Component {
      render() { return <Base { ...this.props } />; }
    };

    const filter = { wrapperFactory };

    beforeEach(() => {
      wrapper = shallow(
        <Container
          keyField={ keyField }
          data={ data }
          columns={ columns }
          filter={ filter }
        />
      );
    });

    it('should initialize BaseComponent correctly', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('FilterWrapper');
    });

    it('should render BootstrapTable component successfully', () => {
      expect(wrapper.dive().find(BootstrapTable)).toHaveLength(1);
    });

    it('should render FilterWrapper component successfully', () => {
      expect(wrapper.find('FilterWrapper').length).toBe(1);
    });
  });

  describe('when any column.sort is defined', () => {
    beforeEach(() => {
      const columnsWithSort = [{
        dataField: keyField,
        text: 'ID',
        sort: true
      }];
      wrapper = shallow(
        <Container
          keyField={ keyField }
          data={ data }
          columns={ columnsWithSort }
        />
      );
    });

    it('should initialize BaseComponent correctly', () => {
      expect(wrapper.instance().BaseComponent.name).toBe('SortWrapper');
    });

    it('should render BootstrapTable component successfully', () => {
      expect(wrapper.dive().find(BootstrapTable)).toHaveLength(1);
    });

    it('should render SortWrapper component successfully', () => {
      expect(wrapper.find('SortWrapper').length).toBe(1);
    });
  });
});
