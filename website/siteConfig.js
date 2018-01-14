/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: '',
    // image: '/react-bootstrap-table2/img/docusaurus.svg',
    infoLink: 'https://github.com/react-bootstrap-table/react-bootstrap-table2',
    pinned: true,
  },
];

const siteConfig = {
  title: 'react-bootstrap-table2' /* title for your website */,
  tagline: 'Next Generation of react-bootstrap-table',
  url: 'https://react-bootstrap-table.github.io' /* your website url */,
  baseUrl: '/react-bootstrap-table2/' /* base url for your project */,
  projectName: 'react-bootstrap-table2',
  headerLinks: [
    {doc: 'about', label: 'Docs'},
    {doc: 'table-props', label: 'API'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],
  users,
  /* path to images for header/footer */
  // headerIcon: 'img/docusaurus.svg',
  // footerIcon: 'img/docusaurus.svg',
  // favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: '#294E80',
    secondaryColor: '#3CA7F2',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' react-bootstrap-table2',
  organizationName: 'react-bootstrap-table', // or set an env variable ORGANIZATION_NAME
  projectName: 'react-bootstrap-table2', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/react-bootstrap-table/react-bootstrap-table2',
};

module.exports = siteConfig;
