/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Help extends React.Component {
  render() {
    const supportLinks = [
      {
        content:
          'Learn more using the [documentation on this site.](../docs/about.html)',
        title: 'Browse Docs',
      },
      {
        content: '<a href="https://github.com/react-bootstrap-table/react-bootstrap-table2/issues" target="_blank" >Ask questions</a> about the documentation and project',
        title: 'Join the community',
      },
      {
        content: '<a href="../blog" target="_blank">Find out</a> what\'s new with this project',
        title: 'Stay up to date',
      },
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <div className="post">
            <header className="postHeader">
              <h2>Need help?</h2>
            </header>
            <p>This project is maintained by a dedicated group of <b><a href="https://github.com/orgs/react-bootstrap-table/people" target="_blank">people</a></b>.</p>
            <GridBlock contents={supportLinks} layout="threeColumn" />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Help;
