/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import pageResolver from './page-resolver';

export default WrappedComponent =>
  class SizePerPageDropdownAdapter extends pageResolver(Component) {
    constructor(props) {
      super(props);
      this.closeDropDown = this.closeDropDown.bind(this);
      this.toggleDropDown = this.toggleDropDown.bind(this);
      this.handleChangeSizePerPage = this.handleChangeSizePerPage.bind(this);
      this.state = { dropdownOpen: false };
    }

    toggleDropDown() {
      const dropdownOpen = !this.state.dropdownOpen;
      this.setState(() => ({ dropdownOpen }));
    }

    closeDropDown() {
      this.setState(() => ({ dropdownOpen: false }));
    }

    handleChangeSizePerPage(sizePerPage) {
      this.props.onSizePerPageChange(sizePerPage);
      this.closeDropDown();
    }

    render() {
      const {
        sizePerPageList,
        currSizePerPage,
        hideSizePerPage,
        sizePerPageRenderer,
        sizePerPageOptionRenderer
      } = this.props;
      const { dropdownOpen: open } = this.state;

      if (sizePerPageList.length > 1 && !hideSizePerPage) {
        if (sizePerPageRenderer) {
          return sizePerPageRenderer({
            options: this.calculateSizePerPageStatus(),
            currSizePerPage: `${currSizePerPage}`,
            onSizePerPageChange: this.handleChangeSizePerPage
          });
        }
        return (
          <WrappedComponent
            currSizePerPage={ `${currSizePerPage}` }
            options={ this.calculateSizePerPageStatus() }
            optionRenderer={ sizePerPageOptionRenderer }
            onSizePerPageChange={ this.handleChangeSizePerPage }
            onClick={ this.toggleDropDown }
            onBlur={ this.closeDropDown }
            open={ open }
          />
        );
      }
      return null;
    }
  };

