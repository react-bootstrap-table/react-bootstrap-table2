## Development Guide

### Setup
```bash
$ git clone https://github.com/react-bootstrap-table/react-bootstrap-table2.git
$ cd react-bootstrap-table
$ npm install
$ lerna bootstrap  # ./node_modules/.bin/lerna bootstrap
```
### Development
```bash
$ npm start
```

### Launch StoryBook
We use [storybook](https://storybook.js.org/) to list our examples and it also has hot reload from source code. Sometimes, it is also a good entry point to development.

```bash
$ cd packages/react-bootstrap-table2-example
$ npm run storybook
```

### Testing
```bash
$ npm test
$ npm run test:watch  # for watch mode
$ npm run test:coverage  # generate coverage report
```