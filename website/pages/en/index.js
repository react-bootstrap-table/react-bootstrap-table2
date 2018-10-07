/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

// Built-in library
const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

// Customized component and utils
const HomeSplash = require(process.cwd() + '/core/homeSplash.js');
const utils = require(process.cwd() + '/core/utils');
const imgUrl = utils.imgUrl;

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
  >
    <GridBlock
      align={ props.align || 'center' }
      layout={props.layout}
      className={props.className}
      contents={props.children}
    />
  </Container>
);

const Features = () => (
  <Block layout="threeColumn" className="feature-block">
    {[
      {
        content: 'Sortable, Row Selection, Cell Editor, Row Expand, Column Filter Pagination etc.',
        image: imgUrl('icon/bulb.svg'),
        imageAlign: 'top',
        title: 'Rich Functionality',
      },
      {
        content: 'Configurable and customizable table',
        image: imgUrl('icon/tool.svg'),
        imageAlign: 'top',
        title: 'Customization',
      },
      {
        content: 'Satisfy for Redux/Mobx or any other state management tool.',
        image: imgUrl('icon/store.svg'),
        imageAlign: 'top',
        title: 'Remote',
      },
    ]}
  </Block>
);

const LearnHow = () => (
  <Block align="left">
    {[
      {
        content: 'Intuitive to use. <br/>Compatible for Bootstrap 3 and 4. <br/>Better than legacy react-bootstrap-table!!<br/>',
        image: imgUrl('react-bootstrap-table2-sample.png'),
        imageAlign: 'right',
        title: 'react-bootstrap-table2',
      },
    ]}
  </Block>
);

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <LearnHow />
        </div>
      </div>
    );
  }
}

module.exports = Index;
