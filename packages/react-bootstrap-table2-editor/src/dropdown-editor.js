import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

class DropDownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onOptionSelected = this.onOptionSelected.bind(this);
  }

  onOptionSelected(e) {
    if (this.props.updateValue != null) {
      this.props.updateValue(e.target.value);
    }
    // simulate enter press so that value will be stored in handleKeyDown..
    // nicer solution is to probably to handle events at editor component 
    // and bubble the event up to a save event in editing cell
    this.props.onKeyDown({ keyCode: 13 });
  }

  render() {
    const options = [];
    this.props.items.forEach((item, i) => {
      const optionKey = this.props.dropDownKey + i;
      const option = (
        <option key={ optionKey } value={ item }>
          { item }
        </option>
      );
      options.push(option);
    });

    const editorClass = cs('form-control editor edit-dropdown', this.props.className);

    return (
      <select
        defaultValue={ this.props.defaultValue }
        className={ editorClass }
        id={ `formcontrol-dropdown-${this.props.dropDownKey}` }
        onChange={ this.onOptionSelected }
      >
        {options}
      </select>
    );
  }
}

DropDownEditor.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  defaultValue: PropTypes.string,
  updateValue: PropTypes.func,
  items: PropTypes.array,
  dropDownKey: PropTypes.string,
  onKeyDown: PropTypes.func
};
DropDownEditor.defaultProps = {
  className: null,
  defaultValue: '',
  updateValue: () => console.warn('update value needs to be implemented'),
  items: [],
  dropDownKey: `key_${Math.random()}`,
  onKeyDown: () => {}
};
export default DropDownEditor;
