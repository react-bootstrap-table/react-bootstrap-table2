/* eslint no-return-assign: 0 */
import React from 'react';
import LoadingOverlay from 'react-loading-overlay';

export default options => (element, loading) =>
  class TableLoadingOverlayWrapper extends React.Component {
    componentDidMount() {
      if (loading) {
        const { wrapper } = this.overlay;
        const masker = wrapper.firstChild;
        const headerDOM = wrapper.parentElement.querySelector('thead');
        const bodyDOM = wrapper.parentElement.querySelector('tbody');
        masker.style.marginTop = window.getComputedStyle(headerDOM).height;
        masker.style.height = window.getComputedStyle(bodyDOM).height;
      }
    }

    render() {
      return (
        <LoadingOverlay
          ref={ n => this.overlay = n }
          { ...options }
          active={ loading }
        >
          { element }
        </LoadingOverlay>
      );
    }
  };
