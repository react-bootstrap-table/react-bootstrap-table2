const React = require('react');
const Button = require('./button');
const utils = require('./utils');

const siteConfig = require(process.cwd() + '/siteConfig.js');

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = () => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <SplashContainer>
        <Logo img_src={utils.imgUrl('logo/pure-color-square.svg')} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href={utils.docUrl('getting-started.html', language)}>Try It Out</Button>
            <Button href='./storybook/index.html'>Live Demo</Button>
            <Button href={utils.docUrl('table-props.html', language)}>Docs</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

module.exports = HomeSplash;
