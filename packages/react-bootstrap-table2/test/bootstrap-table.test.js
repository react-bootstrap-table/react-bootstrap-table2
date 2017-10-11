import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Caption from 'src/caption';
import BootstrapTable from 'src/bootstrap-table';
import Header from 'src/header';
import Body from 'src/body';
import Const from 'src/const';
import { baseData, baseProps } from 'test/factory';

describe('BootstrapTable', () => {
  let wrapper;
  const data = baseData();

  describe('simplest table', () => {
    beforeEach(() => {
      wrapper = shallow(<BootstrapTable {...baseProps} />);
    });

    it('should render successfully', () => {
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('table.table').length).toBe(1);
      expect(wrapper.find(Header).length).toBe(1);
      expect(wrapper.find(Body).length).toBe(1);
      expect(wrapper.find('.react-bootstrap-table-container').length).toBe(1);
    });

    it('should have correct default state', () => {
      expect(wrapper.state().currEditCell).toBeDefined();
      expect(wrapper.state().currEditCell.ridx).toBeNull();
      expect(wrapper.state().currEditCell.cidx).toBeNull();
    });

    it('should have table-bordered class as default', () => {
      expect(wrapper.find('table.table-bordered').length).toBe(1);
    });
  });

  describe('when hover props is true', () => {
    beforeEach(() => {
      wrapper = shallow(<BootstrapTable {...baseProps} hover />);
    });

    it('should have table-hover class on table', () => {
      expect(wrapper.find('table.table-hover').length).toBe(1);
    });
  });

  describe('when striped props is true', () => {
    beforeEach(() => {
      wrapper = shallow(<BootstrapTable {...baseProps} striped />);
    });

    it('should have table-striped class on table', () => {
      expect(wrapper.find('table.table-striped').length).toBe(1);
    });
  });

  describe('when condensed props is true', () => {
    beforeEach(() => {
      wrapper = shallow(<BootstrapTable {...baseProps} condensed />);
    });

    it('should have table-condensed class on table', () => {
      expect(wrapper.find('table.table-condensed').length).toBe(1);
    });
  });

  describe('when bordered props is false', () => {
    beforeEach(() => {
      wrapper = shallow(<BootstrapTable {...baseProps} bordered={ false } />);
    });

    it('should not have table-condensed class on table', () => {
      expect(wrapper.find('table.table-condensed').length).toBe(0);
    });
  });

  describe('when table should have a caption', () => {
    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          {...baseProps}
          caption={ <span className="table-caption">test</span> }
          bordered={ false }
        />
      );
    });

    it('should render caption correctly', () => {
      expect(wrapper.find(Caption).length).toBe(1);
      expect(wrapper.find('.table-caption').length).toBe(1);
    });
  });

  describe('when cellEdit props is defined', () => {
    const nonEditableRows = [data[1].id];
    const cellEdit = {
      mode: Const.CLICK_TO_CELL_EDIT,
      onEditing: sinon.stub(),
      nonEditableRows: () => nonEditableRows
    };

    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable
          {...baseProps}
          bordered={ false }
          cellEdit={ cellEdit }
        />
      );
    });

    it('should resolve correct cellEdit object to Body component', () => {
      const body = wrapper.find(Body);
      expect(body.length).toBe(1);
      expect(body.props().cellEdit.nonEditableRows).toEqual(nonEditableRows);
      expect(body.props().cellEdit.ridx).toEqual(wrapper.state().currEditCell.ridx);
      expect(body.props().cellEdit.cidx).toEqual(wrapper.state().currEditCell.cidx);
      expect(body.props().cellEdit.onStart).toBeDefined();
      expect(body.props().cellEdit.onEscape).toBeDefined();
      expect(body.props().cellEdit.onComplete).toBeDefined();
    });
  });

  describe('handleRowSelect', () => {
    const rowKey = 1;

    describe('when selectRow.mode is radio', () => {
      beforeEach(() => {
        wrapper = shallow(
          <BootstrapTable
            {...baseProps}
            selectRow={{ mode: 'radio' }}
          />
        );
      });

      it('state.selectedRowKeys should contain only single key', () => {
        wrapper.instance().handleRowSelect(rowKey);
        expect(wrapper.state('selectedRowKeys')).toEqual([rowKey]);

        wrapper.instance().handleRowSelect(rowKey);
        expect(wrapper.state('selectedRowKeys')).toEqual([rowKey]);
      });
    });

    describe('when selectRow.mode is checbox', () => {
      beforeEach(() => {
        wrapper = shallow(
          <BootstrapTable
            {...baseProps}
            selectRow={{ mode: 'checkbox' }}
          />
        );
      });
      describe('if checked is false', () => {
        it('state.selectedRowKeys should pop selected row key', () => {
          wrapper.instance().handleRowSelect(rowKey, false);

          expect(wrapper.state('selectedRowKeys')).not.toContain(rowKey);
        });
      });

      describe('if checked is true', () => {
        it('state.selectedRowKeys should push one extra key', () => {
          wrapper.instance().handleRowSelect(rowKey, true);

          expect(wrapper.state('selectedRowKeys')).toContain(rowKey);
        });
      });
    });
  });

  describe('handleAllRowsSelect', () => {
    beforeEach(() => {
      wrapper = shallow(
        <BootstrapTable {...baseProps} />
      );
    });

    describe('when customized option was not given', () => {
      describe('when nothing was selected', () => {
        it('should select all rows', () => {
          wrapper.instance().store.setSelectedRowKeys([]);

          wrapper.instance().handleAllRowsSelect();

          expect(wrapper.state('selectedRowKeys').length).toBe(data.length);
        });
      });

      describe('when one or more than one row was selected', () => {
        it('should unselect all rows', () => {
          wrapper.instance().store.setSelectedRowKeys([1]);

          wrapper.instance().handleAllRowsSelect();

          expect(wrapper.state('selectedRowKeys').length).toBe(0);
        });
      });
    });

    describe('when customized option was given', () => {
      describe('when option is truthy', () => {
        it('should select all rows', () => {
          wrapper.instance().handleAllRowsSelect(true);

          expect(wrapper.state('selectedRowKeys').length).toBe(data.length);
        });
      });

      describe('when option is falsy', () => {
        it('should unselect all rows', () => {
          wrapper.instance().store.setSelectedRowKeys([1]);

          wrapper.instance().handleAllRowsSelect(false);

          expect(wrapper.state('selectedRowKeys').length).toBe(0);
        });
      });
    });
  });
});
