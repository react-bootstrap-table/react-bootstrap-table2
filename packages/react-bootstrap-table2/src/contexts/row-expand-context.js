/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import dataOperator from '../store/operators';
import _ from '../utils';

const RowExpandContext = React.createContext();

class RowExpandProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.array.isRequired,
    keyField: PropTypes.string.isRequired
  };

  state = { expanded: this.props.expandRow.expanded || [],
    isClosing: this.props.expandRow.isClosing || [] };

  componentWillReceiveProps(nextProps) {
    if (nextProps.expandRow) {
      const nextExpanded = nextProps.expandRow.expanded || this.state.expanded;
      const isClosing = this.state.expanded.reduce((acc, cur) => {
        if (!_.contains(nextExpanded, cur)) {
          acc.push(cur);
        }
        return acc;
      }, []);
      this.setState(() => ({
        expanded: nextExpanded,
        isClosing
      }));
    } else {
      this.setState(() => ({
        expanded: this.state.expanded
      }));
    }
  }

  onClosed = (closedRow) => {
    this.setState({ isClosing: this.state.isClosing.filter(value => value !== closedRow) });
  };

  handleRowExpand = (rowKey, expanded, rowIndex, e) => {
    const { data, keyField, expandRow: { onExpand, onlyOneExpanding, nonExpandable } } = this.props;
    if (nonExpandable && _.contains(nonExpandable, rowKey)) {
      return;
    }

    let currExpanded = [...this.state.expanded];
    let isClosing = [...this.state.isClosing];

    if (expanded) {
      if (onlyOneExpanding) {
        isClosing = isClosing.concat(currExpanded);
        currExpanded = [rowKey];
      } else currExpanded.push(rowKey);
    } else {
      isClosing.push(rowKey);
      currExpanded = currExpanded.filter(value => value !== rowKey);
    }

    if (onExpand) {
      const row = dataOperator.getRowByRowId(data, keyField, rowKey);
      onExpand(row, expanded, rowIndex, e);
    }
    this.setState(() => ({ expanded: currExpanded, isClosing }));
  };

  handleAllRowExpand = (e, expandAll) => {
    const {
      data,
      keyField,
      expandRow: {
        onExpandAll,
        nonExpandable
      }
    } = this.props;
    const { expanded } = this.state;

    let currExpanded;

    if (expandAll) {
      currExpanded = expanded.concat(dataOperator.expandableKeys(data, keyField, nonExpandable));
    } else {
      currExpanded = expanded.filter(s => typeof data.find(d => _.get(d, keyField) === s) === 'undefined');
    }

    if (onExpandAll) {
      onExpandAll(expandAll, dataOperator.getExpandedRows(data, keyField, currExpanded), e);
    }

    this.setState(() => ({ expanded: currExpanded }));
  };

  render() {
    const { data, keyField } = this.props;
    return (
      <RowExpandContext.Provider
        value={ {
          ...this.props.expandRow,
          nonExpandable: this.props.expandRow.nonExpandable,
          expanded: this.state.expanded,
          isClosing: this.state.isClosing,
          onClosed: this.onClosed,
          isAnyExpands: dataOperator.isAnyExpands(data, keyField, this.state.expanded),
          onRowExpand: this.handleRowExpand,
          onAllRowExpand: this.handleAllRowExpand
        } }
      >
        { this.props.children }
      </RowExpandContext.Provider>
    );
  }
}

export default {
  Provider: RowExpandProvider,
  Consumer: RowExpandContext.Consumer
};
