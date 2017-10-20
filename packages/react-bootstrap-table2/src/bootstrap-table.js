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

    this.state = {
      data: props.store.get()
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.store.get()
    });
  }

  render() {
    const {
      store,
      columns,
      keyField,
      striped,
      hover,
      bordered,
      condensed,
      noDataIndication,
      caption
    } = this.props;

    const tableClass = cs('table', {
      'table-striped': striped,
      'table-hover': hover,
      'table-bordered': bordered,
      'table-condensed': condensed
    });

    const cellEditInfo = this.resolveCellEditProps({
      onStart: this.props.onStartEditing,
      onEscape: this.props.onEscapeEditing,
      onUpdate: this.props.onCellUpdate,
      currEditCell: this.props.currEditCell
    });

    const cellSelectionInfo = this.resolveSelectRowProps({
      onRowSelect: this.props.onRowSelect
    });

    const headerCellSelectionInfo = this.resolveSelectRowPropsForHeader({
      onAllRowsSelect: this.props.onAllRowsSelect,
      selected: store.selected,
      allRowsSelected: store.isAllRowsSelected()
    });

    return (
      <div className="react-bootstrap-table-container">
        <table className={ tableClass }>
          <Caption>{ caption }</Caption>
          <Header
            columns={ columns }
            sortField={ store.sortField }
            sortOrder={ store.sortOrder }
            onSort={ this.props.onSort }
            selectRow={ headerCellSelectionInfo }
          />
          <Body
            data={ this.state.data }
            keyField={ keyField }
            columns={ columns }
            isEmpty={ this.isEmpty() }
            visibleColumnSize={ this.visibleColumnSize() }
            noDataIndication={ noDataIndication }
            cellEdit={ cellEditInfo }
            selectRow={ cellSelectionInfo }
            selectedRowKeys={ store.getSelectedRowKeys() }
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
  store: PropTypes.object,
  noDataIndication: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  hover: PropTypes.bool,
  condensed: PropTypes.bool,
  caption: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  onSort: PropTypes.func,
  cellEdit: PropTypes.shape({
    mode: PropTypes.oneOf([Const.CLICK_TO_CELL_EDIT, Const.DBCLICK_TO_CELL_EDIT]).isRequired,
    onUpdate: PropTypes.func,
    onErrorMessageDisappear: PropTypes.func,
    blurToSave: PropTypes.bool,
    beforeSaveCell: PropTypes.func,
    afterSaveCell: PropTypes.func,
    nonEditableRows: PropTypes.func,
    editing: PropTypes.bool,
    timeToCloseMessage: PropTypes.number,
    errorMessage: PropTypes.string
  }),
  onCellUpdate: PropTypes.func,
  onStartEditing: PropTypes.func,
  onEscapeEditing: PropTypes.func,
  currEditCell: PropTypes.shape({
    ridx: PropTypes.number,
    cidx: PropTypes.number,
    message: PropTypes.string,
    editing: PropTypes.bool
  }),
  selectRow: PropTypes.shape({
    mode: PropTypes.oneOf([Const.ROW_SELECT_SINGLE, Const.ROW_SELECT_MULTIPLE]).isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    classes: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    nonSelectable: PropTypes.array
  }),
  onRowSelect: PropTypes.func,
  onAllRowsSelect: PropTypes.func
};

BootstrapTable.defaultProps = {
  striped: false,
  bordered: true,
  hover: false,
  condensed: false,
  noDataIndication: null
};

export default BootstrapTable;
