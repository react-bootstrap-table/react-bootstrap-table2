import cs from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

export default class ExpandRow extends React.Component {
  componentDidUpdate(prevProps) {
    if (!this.props.animate && !this.props.expanded && prevProps.expanded !== this.props.expanded) {
      this.props.onClosed();
    }
  }
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
    const { children, expanded, onClosed, className, id, animate, ...rest } = this.props;

    let expansionDiv = (
      <div id={ `expansion-div-${id}` } className="row-expansion-inner">
        <div className="row-expansion-style">
          {children}
        </div>
      </div>
    );

    if (animate) {
      expansionDiv = (
        <Transition
          in={ expanded }
          timeout={ 460 }
          onEnter={ () => this.onEnter() }
          onExit={ () => this.onExit() }
          onExited={ onClosed }
          unmountOnExit
        >
          {expansionDiv}
        </Transition>
      );
    }

    return (
      <tr>
        <td className={ cs('reset-expansion-style', className) } { ...rest }>
          {expansionDiv}
        </td>
      </tr>
    );
  }
}

ExpandRow.propTypes = {
  children: PropTypes.node,
  expanded: PropTypes.bool,
  onClosed: PropTypes.func,
  className: PropTypes.string,
  animate: PropTypes.bool,
  id: PropTypes.number
};

ExpandRow.defaultProps = {
  children: null,
  expanded: false,
  onClosed: null,
  className: '',
  animate: true,
  id: null
};
