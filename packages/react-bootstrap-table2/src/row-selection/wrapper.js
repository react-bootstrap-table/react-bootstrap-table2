/* eslint arrow-body-style: 0 */
/* eslint react/prop-types: 0 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { selectionElement } from '../table-factory';

import Const from '../const';

class RowSelectionWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleAllRowsSelect = this.handleAllRowsSelect.bind(this);
    this.state = {
      selectedRowKeys: props.store.getSelectedRowKeys()
    };
  }

  /**
   * row selection handler
   * @param {String} rowKey - row key of what was selected.
   * @param {Boolean} checked - next checked status of input button.
   */
  handleRowSelect(rowKey, checked, rowIndex) {
    const { selectRow: { mode, onSelect }, store } = this.props;
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

    if (onSelect) {
      const row = store.getRowByRowId(rowKey);
      onSelect(row, checked, rowIndex);
    }

    this.setState(() => ({
      selectedRowKeys: currSelected
    }));
  }

  /**
   * handle all rows selection on header cell by store.selected or given specific result.
   * @param {Boolean} option - customized result for all rows selection
   */
  handleAllRowsSelect(option) {
    const { store, selectRow: {
      onSelectAll,
      nonSelectable
    } } = this.props;
    const selected = store.isAnySelectedRow(nonSelectable);

    // set next status of all row selected by store.selected or customizing by user.
    const result = option || !selected;

    const currSelected = result ?
      store.selectAllRows(nonSelectable) :
      store.cleanSelectedRows(nonSelectable);


    store.setSelectedRowKeys(currSelected);

    if (onSelectAll) {
      onSelectAll(result, store.getSelectedRows());
    }

    this.setState(() => ({
      selectedRowKeys: currSelected
    }));
  }

  render() {
    return selectionElement({
      ...this.props,
      onRowSelect: this.handleRowSelect,
      onAllRowsSelect: this.handleAllRowsSelect
    });
  }
}

RowSelectionWrapper.propTypes = {
  store: PropTypes.object.isRequired
};

export default RowSelectionWrapper;
