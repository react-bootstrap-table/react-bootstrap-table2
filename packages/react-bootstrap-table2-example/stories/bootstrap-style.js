/* eslint no-return-assign: 0 */
import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';

export const BOOTSTRAP_VERSION = {
  FOUR: '4.1.3',
  THREE: '3.3.7'
};

class WithBootstrapStyle extends PureComponent {
  static propTypes = {
    version: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = { loading: true };
  }

  componentDidMount() {
    this.style.addEventListener('load', this.handleLoadEvent);
  }

  componentWillUnmount() {
    this.style.removeEventListener('load', this.handleLoadEvent);
  }

  handleLoadEvent = () => {
    this.setState({ loading: false });
  }

  render() {
    const { version, render } = this.props;

    const href = `style/bootstrap.${version}.min.css`;

    return (
      <Fragment>
        <link href={ href } rel="stylesheet" ref={ element => this.style = element } />
        { render(this.state.loading) }
      </Fragment>
    );
  }
}

/**
 * Currently we adopt version 3 as default. 
 */
export default (version = BOOTSTRAP_VERSION.THREE) => story => (
  <WithBootstrapStyle
    version={ version }
    render={ loading => !loading && story() }
  />
);
