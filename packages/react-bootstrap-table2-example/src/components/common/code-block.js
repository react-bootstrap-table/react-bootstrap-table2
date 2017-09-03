import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class extends Component {
  static propTypes = {
    children: PropTypes.string
  }
  static defaultProps = {
    children: ''
  }
  componentDidMount() {
    // code-prettify
    // run the PR.prettyPrint() function once your page has finished loading
    if (typeof (PR) !== 'undefined') PR.prettyPrint(); // eslint-disable-line no-undef
  }

  render() {
    return (
      <div className="highlight-text-html-basic">
        <pre className="prettyprint lang-js">
          { this.props.children }
        </pre>
      </div>
    );
  }
}
