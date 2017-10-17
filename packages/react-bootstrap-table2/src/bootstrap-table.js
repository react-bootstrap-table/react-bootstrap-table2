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

    this.handleSort = this.handleSort.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleAllRowsSelect = this.handleAllRowsSelect.bind(this);
    this.state = {
      data: props.store.get(),
      selectedRowKeys: props.store.getSelectedRowKeys()
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

    const cellSelectionInfo = this.resolveCellSelectionProps({
      onRowSelect: this.handleRowSelect
    });

    const headerCellSelectionInfo = this.resolveHeaderCellSelectionProps({
      onAllRowsSelect: this.handleAllRowsSelect,
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
            onSort={ this.handleSort }
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
            selectRow={cellSelectionInfo}
            selectedRowKeys={this.state.selectedRowKeys}
          />
        </table>
      </div>
    );
  }

  /**
   * row selection handler
   * @param {String} rowKey - row key of what was selected.
   * @param {Boolean} checked - next checked status of input button.
   */
  handleRowSelect(rowKey, checked) {
    const { selectRow: { mode }, store } = this.props;
    const { ROW_SELECT_SINGLE } = Const;

    let currSelected = [...store.getSelectedRowKeys()];

    if (mode === ROW_SELECT_SINGLE) { // when select mode is radio
      currSelected = [rowKey];
    } else if (checked) { // when select mode is checkbox
      currSelected.push(rowKey);
    } else {
      currSelected = currSelected.filter(value => value !== rowKey);
    }

    store.setSelectedRowKeys(currSelected);

    this.setState(() => ({
      selectedRowKeys: currSelected
    }));
  }

  /**
   * handle all rows selection on header cell by store.selected or given specific result.
   * @param {Boolean} option - customized result for all rows selection
   */
  handleAllRowsSelect(option) {
    const { store } = this.props;
    const selected = store.isAnySelectedRow();

    // set next status of all row selected by store.selected or customizing by user.
    const result = option || !selected;

    const currSelected = result ? store.selectAllRowKeys() : [];

    store.setSelectedRowKeys(currSelected);

    this.setState(() => ({
      selectedRowKeys: currSelected
    }));
  }

  handleSort(column) {
    const { store } = this.props;
    store.sortBy(column);

    this.setState(() => {
      return {
        data: store.get()
      };
    });
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
  selectRow: PropTypes.shape({
    mode: PropTypes.oneOf([Const.ROW_SELECT_SINGLE, Const.ROW_SELECT_MULTIPLE]).isRequired
  }),
  onCellUpdate: PropTypes.func,
  onStartEditing: PropTypes.func,
  onEscapeEditing: PropTypes.func,
  currEditCell: PropTypes.shape({
    ridx: PropTypes.number,
    cidx: PropTypes.number,
    message: PropTypes.string,
    editing: PropTypes.bool
  })
};

BootstrapTable.defaultProps = {
  striped: false,
  bordered: true,
  hover: false,
  condensed: false,
  noDataIndication: null
};

export default BootstrapTable;
