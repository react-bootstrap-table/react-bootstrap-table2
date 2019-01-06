/* eslint arrow-body-style: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import Header from './header';
import Caption from './caption';
import Body from './body';
import PropsBaseResolver from './props-resolver';
import Const from './const';

class BootstrapTable extends PropsBaseResolver(Component) {
  constructor(props) {
    super(props);
    this.validateProps();
  }

  // Exposed APIs
  getData = () => {
    return this.visibleRows();
  }

  render() {
    const { loading, overlay } = this.props;
    if (overlay) {
      const LoadingOverlay = overlay(loading);
      return (
        <LoadingOverlay>
          { this.renderTable() }
        </LoadingOverlay>
      );
    }
    return this.renderTable();
  }

  renderTable() {
    const {
      columns,
      keyField,
      tabIndexCell,
      id,
      classes,
      bootstrap4,
      striped,
      hover,
      bordered,
      condensed,
      noDataIndication,
      caption,
      rowStyle,
      rowClasses,
      wrapperClasses,
      rowEvents,
      selectRow,
      expandRow,
      cellEdit
    } = this.props;

    const tableWrapperClass = cs('react-bootstrap-table', wrapperClasses);

    const tableClass = cs('table', {
      'table-striped': striped,
      'table-hover': hover,
      'table-bordered': bordered,
      [(bootstrap4 ? 'table-sm' : 'table-condensed')]: condensed
    }, classes);

    const tableCaption = (caption && <Caption>{ caption }</Caption>);

    return (
      <div className={ tableWrapperClass }>
        <table id={ id } className={ tableClass }>
          { tableCaption }
          <Header
            columns={ columns }
            className={ this.props.headerClasses }
            sortField={ this.props.sortField }
            sortOrder={ this.props.sortOrder }
            onSort={ this.props.onSort }
            onFilter={ this.props.onFilter }
            onExternalFilter={ this.props.onExternalFilter }
            selectRow={ selectRow }
            expandRow={ expandRow }
          />
          <Body
            data={ this.getData() }
            keyField={ keyField }
            tabIndexCell={ tabIndexCell }
            columns={ columns }
            isEmpty={ this.isEmpty() }
            visibleColumnSize={ this.visibleColumnSize() }
            noDataIndication={ noDataIndication }
            cellEdit={ cellEdit }
            selectRow={ selectRow }
            expandRow={ expandRow }
            rowStyle={ rowStyle }
            rowClasses={ rowClasses }
            rowEvents={ rowEvents }
          />
        </table>
      </div>
    );
  }
}

BootstrapTable.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  bootstrap4: PropTypes.bool,
  remote: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
    pagination: PropTypes.bool
  })]),
  noDataIndication: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  hover: PropTypes.bool,
  tabIndexCell: PropTypes.bool,
  id: PropTypes.string,
  classes: PropTypes.string,
  wrapperClasses: PropTypes.string,
  condensed: PropTypes.bool,
  caption: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  pagination: PropTypes.object,
  filter: PropTypes.object,
  cellEdit: PropTypes.object,
  selectRow: PropTypes.shape({
    mode: PropTypes.oneOf([
      Const.ROW_SELECT_SINGLE,
      Const.ROW_SELECT_MULTIPLE,
      Const.ROW_SELECT_DISABLED
    ]).isRequired,
    clickToSelect: PropTypes.bool,
    clickToExpand: PropTypes.bool,
    clickToEdit: PropTypes.bool,
    hideSelectAll: PropTypes.bool,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    classes: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    nonSelectable: PropTypes.array,
    bgColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    hideSelectColumn: PropTypes.bool,
    selectionRenderer: PropTypes.func,
    selectionHeaderRenderer: PropTypes.func
  }),
  expandRow: PropTypes.shape({
    renderer: PropTypes.func,
    expanded: PropTypes.array,
    onExpand: PropTypes.func,
    onExpandAll: PropTypes.func,
    nonExpandable: PropTypes.array,
    showExpandColumn: PropTypes.bool,
    onlyOneExpanding: PropTypes.bool,
    expandByColumnOnly: PropTypes.bool,
    expandColumnRenderer: PropTypes.func,
    expandHeaderColumnRenderer: PropTypes.func
  }),
  rowStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  rowEvents: PropTypes.object,
  rowClasses: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  headerClasses: PropTypes.string,
  defaultSorted: PropTypes.arrayOf(PropTypes.shape({
    dataField: PropTypes.string.isRequired,
    order: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC]).isRequired
  })),
  defaultSortDirection: PropTypes.oneOf([Const.SORT_DESC, Const.SORT_ASC]),
  overlay: PropTypes.func,
  onTableChange: PropTypes.func,
  onSort: PropTypes.func,
  onFilter: PropTypes.func,
  onExternalFilter: PropTypes.func,
  // Inject from toolkit
  search: PropTypes.shape({
    searchText: PropTypes.string,
    searchContext: PropTypes.func
  }),
  setDependencyModules: PropTypes.func
};

BootstrapTable.defaultProps = {
  bootstrap4: false,
  remote: false,
  striped: false,
  bordered: true,
  hover: false,
  condensed: false,
  noDataIndication: null,
  selectRow: {
    mode: Const.ROW_SELECT_DISABLED,
    selected: [],
    hideSelectColumn: true
  },
  expandRow: {
    renderer: undefined,
    expanded: [],
    nonExpandable: []
  },
  cellEdit: {
    mode: null,
    nonEditableRows: []
  }
};

export default BootstrapTable;
