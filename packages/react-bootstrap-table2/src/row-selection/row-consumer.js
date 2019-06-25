/* eslint react/prop-types: 0 */
import React from 'react';
import cs from 'classnames';
import _ from '../utils';
import SelectionContext from '../contexts/selection-context';

export default (Component) => {
  const renderWithSelection = (props, selectRow) => {
    const key = props.value;
    const selected = _.contains(selectRow.selected, key);
    const selectable = !selectRow.nonSelectable || !_.contains(selectRow.nonSelectable, key);

    let {
      style,
      className
    } = props;

    if (selected) {
      const selectedStyle = _.isFunction(selectRow.style)
        ? selectRow.style(props.row, props.rowIndex)
        : selectRow.style;

      const selectedClasses = _.isFunction(selectRow.classes)
        ? selectRow.classes(props.row, props.rowIndex)
        : selectRow.classes;

      style = {
        ...style,
        ...selectedStyle
      };
      className = cs(className, selectedClasses) || undefined;

      if (selectRow.bgColor) {
        style = style || {};
        style.backgroundColor = _.isFunction(selectRow.bgColor)
          ? selectRow.bgColor(props.row, props.rowIndex)
          : selectRow.bgColor;
      }
    }

    return (
      <Component
        { ...props }
        style={ style }
        className={ className }
        selectRow={ selectRow }
        selected={ selected }
        selectable={ selectable }
      />
    );
  };

  function withConsumer(props) {
    return (
      <SelectionContext.Consumer>
        { selectRow => renderWithSelection(props, selectRow) }
      </SelectionContext.Consumer>
    );
  }

  withConsumer.displayName = 'WithSelectionRowConsumer';
  return withConsumer;
};
