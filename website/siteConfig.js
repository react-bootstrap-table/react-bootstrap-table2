/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const ORGANIZATION_NAME = 'react-bootstrap-table';
const PROJECT_NAME = 'react-bootstrap-table2';
const PRIMARY_COLOR = '#007bff';
const SECONDARY_COLOR = '#1769aa';

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: '',
    image: '/react-bootstrap-table2/img/logo/pure-color-square.svg',
    infoLink: 'https://github.com/react-bootstrap-table/react-bootstrap-table2',
    pinned: true,
  },
];

const siteConfig = {
  title: PROJECT_NAME /* title for your website */,
  tagline: 'Next Generation of react-bootstrap-table',
  url: 'https://react-bootstrap-table.github.io' /* your website url */,
  baseUrl: '/react-bootstrap-table2/' /* base url for your project */,
  projectName: PROJECT_NAME,
  headerLinks: [
    {doc: 'about', label: 'Docs'},
    {doc: 'table-props', label: 'API'},
    {page: 'help', label: 'Help'},
    {blog: true, label: 'Blog'},
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/logo/hybrid-white-large.svg',
  favicon: 'img/favicon.ico',
  disableHeaderTitle: true,

  /* colors for website */
  colors: {
    primaryColor: PRIMARY_COLOR,
    secondaryColor: SECONDARY_COLOR,
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} ${PROJECT_NAME}`,
  organizationName: ORGANIZATION_NAME,
  projectName: PROJECT_NAME,
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/react-bootstrap-table/react-bootstrap-table2',
};

module.exports = siteConfig;
