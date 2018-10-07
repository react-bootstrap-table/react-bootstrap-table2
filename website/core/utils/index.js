const siteConfig = require(process.cwd() + '/siteConfig.js');

const imgUrl = (img) => {
  return siteConfig.baseUrl + 'img/' + img;
}

const docUrl = (doc, language) => {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

const pageUrl = (page, language) => {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

module.exports = {
  imgUrl,
  docUrl,
  pageUrl
}
