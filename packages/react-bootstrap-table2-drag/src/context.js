/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const DragContext = React.createContext();

export default (
  _,
) => {
  class DragProvider extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      drag: PropTypes.shape({
        options: PropTypes.shape({
          afterDragDrop: PropTypes.func
        })
      })
    }

    handleDragDrop = (fromIndex, toIndex) => {
      const { afterDragDrop } = this.props.drag.options;
      if (_.isFunction(afterDragDrop)) afterDragDrop(fromIndex, toIndex);
    }

    render() {
      return (
        <DragContext.Provider
          value={ {
            onDragDrop: this.handleDragDrop
          } }
        >
          {this.props.children}
        </DragContext.Provider>
      );
    }
  }

  return {
    Provider: DragProvider
  };
};

export const Consumer = DragContext.Consumer;
