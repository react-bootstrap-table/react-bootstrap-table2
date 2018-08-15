/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Const from '../const';

import dataOperator from '../store/operators';
import { getSelectionSummary } from '../store/selection';

const SelectionContext = React.createContext();
class SelectionProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.array.isRequired,
    keyField: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    if (props.registerExposedAPI) {
      const getSelected = () => this.getSelected();
      props.registerExposedAPI(getSelected);
    }
  }

  state = { selected: (this.props.selectRow && this.props.selectRow.selected) || [] };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectRow) {
      this.setState(() => ({
        selected: nextProps.selectRow.selected || this.state.selected
      }));
    }
  }

  // exposed API
  getSelected() {
    return this.state.selected;
  }

  handleRowSelect = (rowKey, checked, rowIndex, e) => {
    const { data, keyField, selectRow: { mode, onSelect } } = this.props;
    const { ROW_SELECT_SINGLE } = Const;

    let currSelected = [...this.state.selected];

    if (mode === ROW_SELECT_SINGLE) { // when select mode is radio
      currSelected = [rowKey];
    } else if (checked) { // when select mode is checkbox
      currSelected.push(rowKey);
    } else {
      currSelected = currSelected.filter(value => value !== rowKey);
    }

    if (onSelect) {
      const row = dataOperator.getRowByRowId(data, keyField, rowKey);
      onSelect(row, checked, rowIndex, e);
    }

    this.setState(() => ({ selected: currSelected }));
  }

  handleAllRowsSelect = (e, isUnSelect) => {
    const {
      data,
      keyField,
      selectRow: {
        onSelectAll,
        nonSelectable
      }
    } = this.props;
    const { selected } = this.state;

    let currSelected;

    if (!isUnSelect) {
      currSelected = selected.concat(dataOperator.selectableKeys(data, keyField, nonSelectable));
    } else {
      currSelected = selected.filter(s => typeof data.find(d => d[keyField] === s) === 'undefined');
    }

    if (onSelectAll) {
      onSelectAll(
        !isUnSelect,
        dataOperator.getSelectedRows(
          data,
          keyField,
          isUnSelect ? this.state.selected : currSelected
        ),
        e
      );
    }

    this.setState(() => ({ selected: currSelected }));
  }

  render() {
    const {
      allRowsSelected,
      allRowsNotSelected
    } = getSelectionSummary(
      this.props.data,
      this.props.keyField,
      this.state.selected
    );

    let checkedStatus;

    // checkbox status depending on selected rows counts
    if (allRowsSelected) checkedStatus = Const.CHECKBOX_STATUS_CHECKED;
    else if (allRowsNotSelected) checkedStatus = Const.CHECKBOX_STATUS_UNCHECKED;
    else checkedStatus = Const.CHECKBOX_STATUS_INDETERMINATE;

    return (
      <SelectionContext.Provider
        value={ {
          ...this.props.selectRow,
          selected: this.state.selected,
          onRowSelect: this.handleRowSelect,
          onAllRowsSelect: this.handleAllRowsSelect,
          allRowsSelected,
          allRowsNotSelected,
          checkedStatus
        } }
      >
        { this.props.children }
      </SelectionContext.Provider>
    );
  }
}

export default {
  Provider: SelectionProvider,
  Consumer: SelectionContext.Consumer
};
