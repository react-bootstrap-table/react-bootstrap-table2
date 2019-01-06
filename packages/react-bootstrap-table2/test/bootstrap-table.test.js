import React from 'react';
import { shallow } from 'enzyme';

import Caption from '../src/caption';
import Header from '../src/header';
import Body from '../src/body';
import BootstrapTable from '../src/bootstrap-table';

describe('BootstrapTable', () => {
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

  describe('simplest table', () => {
    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable keyField="id" columns={ columns } data={ data } />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('table.table').length).toBe(1);
      expect(wrapper.find(Header).length).toBe(1);
      expect(wrapper.find(Body).length).toBe(1);
    });

    it("should only have classes 'table' and 'table-bordered' as default", () => {
      expect(wrapper.find('table').prop('className')).toBe('table table-bordered');
    });

    it('should not have customized id as default', () => {
      expect(wrapper.find('table').prop('id')).toBeUndefined();
    });
  });

  describe('getData', () => {
    let instance;

    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable keyField="id" columns={ columns } data={ data } />);
      instance = wrapper.instance();
    });

    it('should return props.data', () => {
      expect(instance.getData()).toEqual(data);
    });
  });

  describe('when props.classes was defined', () => {
    const classes = 'foo';

    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          keyField="id"
          columns={ columns }
          data={ data }
          classes={ classes }
        />);
    });

    it('should display customized classes correctly', () => {
      expect(wrapper.find(`table.${classes}`).length).toBe(1);
    });
  });

  describe('when props.wrapperClasses was defined', () => {
    const classes = 'foo';

    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          keyField="id"
          columns={ columns }
          data={ data }
          wrapperClasses={ classes }
        />);
    });

    it('should display customized classes correctly', () => {
      expect(wrapper.find(`.${classes}`).length).toBe(1);
    });
  });

  describe('when props.id was defined', () => {
    const id = 'foo';

    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          keyField="id"
          columns={ columns }
          data={ data }
          id={ id }
        />);
    });

    it('should display customized id correctly', () => {
      expect(wrapper.find(`table#${id}`).length).toBe(1);
    });
  });

  describe('when hover props is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable keyField="id" columns={ columns } data={ data } hover />);
    });

    it('should have table-hover class on table', () => {
      expect(wrapper.find('table.table-hover').length).toBe(1);
    });
  });

  describe('when striped props is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable keyField="id" columns={ columns } data={ data } striped />);
    });

    it('should have table-striped class on table', () => {
      expect(wrapper.find('table.table-striped').length).toBe(1);
    });
  });

  describe('when condensed props is true', () => {
    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable keyField="id" columns={ columns } data={ data } condensed />);
    });

    it('should have table-condensed class on table', () => {
      expect(wrapper.find('table.table-condensed').length).toBe(1);
    });
  });

  describe('when bordered props is false', () => {
    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable keyField="id" columns={ columns } data={ data } bordered={ false } />);
    });

    it('should not have table-condensed class on table', () => {
      expect(wrapper.find('table.table-condensed').length).toBe(0);
    });
  });

  describe('when table should have a caption', () => {
    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          caption={ <span className="table-caption">test</span> }
          keyField="id"
          columns={ columns }
          data={ data }
          bordered={ false }
        />
      );
    });

    it('should render caption correctly', () => {
      expect(wrapper.find(Caption).length).toBe(1);
      expect(wrapper.find('.table-caption').length).toBe(1);
    });
  });
});
