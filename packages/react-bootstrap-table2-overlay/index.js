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
        const captionDOM = wrapper.parentElement.querySelector('caption');

        let marginTop = window.getComputedStyle(headerDOM).height;
        if (captionDOM) {
          marginTop = parseFloat(marginTop.replace('px', ''));
          marginTop += parseFloat(window.getComputedStyle(captionDOM).height.replace('px', ''));
          marginTop = `${marginTop}px`;
        }

        masker.style.marginTop = marginTop;
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
