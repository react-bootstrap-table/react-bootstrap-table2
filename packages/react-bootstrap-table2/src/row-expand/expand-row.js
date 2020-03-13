import cs from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

export default class ExpandRow extends React.Component {
  onEnter() {
    this.expandableDiv = document.getElementById(`expansion-div-${this.props.id}`);
    if (!this.elementHeight) {
      this.elementHeight = this.expandableDiv.offsetHeight;
    }
    this.expandableDiv.style.height = '0px';
    const elementHeight = this.elementHeight;
    setTimeout(() => { this.expandableDiv.style.height = `${elementHeight}px`; }, 1);
  }
  onExit() {
    this.expandableDiv.style.height = '0px';
  }
  render() {
    const { children, expanded, onClosed, className, id, ...rest } = this.props;
    return (
      <tr>
        <td className={ cs('reset-expansion-style', className) } { ...rest }>
          <Transition
            in={ expanded }
            timeout={ 460 }
            onEnter={ () => this.onEnter() }
            onExit={ () => this.onExit() }
            onExited={ onClosed }
            unmountOnExit
          >
            <div id={ `expansion-div-${id}` } className="row-expansion-inner">
              <div className="row-expansion-style">
                {children}
              </div>
            </div>
          </Transition>
        </td>
      </tr>);
  }
}

ExpandRow.propTypes = {
  children: PropTypes.node,
  expanded: PropTypes.bool,
  onClosed: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.number
};

ExpandRow.defaultProps = {
  children: null,
  expanded: false,
  onClosed: null,
  className: '',
  id: null
};
