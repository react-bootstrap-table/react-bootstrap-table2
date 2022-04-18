## BN fork

![Build Status](https://github.com/BonnierNews/react-bootstrap-table2/actions/workflows/node.js.yml/badge.svg)

This is a fork of Allen Fangs [react-bootstrap-table2](https://github.com/react-bootstrap-table/react-bootstrap-table2) repo, which is the repo for [react-bootstrap-table-next](https://www.npmjs.com/package/react-bootstrap-table-next) on npm.

That repo seems to have been abandoned, so this fork was created simply to keep packages up to date with security fixes.

Specific packages from this repo can be used via [gitpkg.now.sh](https://gitpkg.now.sh/):
e.g (packages from tag v1.0.0 in this repo):

`yarn add https://gitpkg.now.sh/BonnierNews/react-bootstrap-table2/packages/react-bootstrap-table2?v1.0.0`

`yarn add https://gitpkg.now.sh/BonnierNews/react-bootstrap-table2/packages/react-bootstrap-table2-editor?v1.0.0`

`yarn add https://gitpkg.now.sh/BonnierNews/react-bootstrap-table2/packages/react-bootstrap-table2-filter?v1.0.0`


Or by adding directly to package.json. 
e.g (packages from tag v1.0.0 in this repo)
```
    "react-bootstrap-table-next": "https://gitpkg.now.sh/BonnierNews/react-bootstrap-table2/packages/react-bootstrap-table2?v1.0.0",
    "react-bootstrap-table2-editor": "https://gitpkg.now.sh/BonnierNews/react-bootstrap-table2/packages/react-bootstrap-table2-editor?v1.0.0",
    "react-bootstrap-table2-filter": "https://gitpkg.now.sh/BonnierNews/react-bootstrap-table2/packages/react-bootstrap-table2-filter?v1.0.0",
```

# release new version of BN Fork
- locally (in new branch, after making changes, and bumping version string in root package.json):
```bash  
yarn test
yarn build
git add .
git commit -m"Bump version"
git push
```
- on Github
- - merge PR
- - create new release with tag matching new version string in root package.json

## react-bootstrap-table2

Rebuild of [react-bootstrap-table](https://github.com/AllenFang/react-bootstrap-table)

> Note that `react-bootstrap-table2`'s npm module name is [**`react-bootstrap-table-next`**](https://www.npmjs.com/package/react-bootstrap-table-next) due to the name being already taken.

`react-bootstrap-table2` separates some functionalities from its core modules to other modules as listed in the following:

- [`react-bootstrap-table-next`](https://www.npmjs.com/package/react-bootstrap-table-next)
- [`react-bootstrap-table2-filter`](https://www.npmjs.com/package/react-bootstrap-table2-filter)
- [`react-bootstrap-table2-editor`](https://www.npmjs.com/package/react-bootstrap-table2-editor)
- [`react-bootstrap-table2-paginator`](https://www.npmjs.com/package/react-bootstrap-table2-paginator)
- [`react-bootstrap-table2-overlay`](https://www.npmjs.com/package/react-bootstrap-table2-overlay)
- [`react-bootstrap-table2-toolkit`](https://www.npmjs.com/package/react-bootstrap-table2-toolkit)

Not only does this reduce the bundle size of your apps but also helps us have a cleaner design to avoid handling too much logic in the kernel module(SRP).

## Migration

If you are coming from the legacy [`react-bootstrap-table`](https://github.com/AllenFang/react-bootstrap-table/), please check out the [migration guide](./docs/migration.md).

## Usage

See [getting started](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/getting-started.html).

## Online Demo

See `react-bootstrap-table2` [storybook](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html).

## Development

Please check the [development guide](./docs/development.md).

## Running storybook example on your local machine

```sh
# Clone the repo
$ git clone https://github.com/react-bootstrap-table/react-bootstrap-table2.git

# change dir to the cloned repo
$ cd react-bootstrap-table2

# Install all dependencies with yarn
$ yarn install

# Start the stroybook server, then go to localhost:6006
$ yarn storybook

```

**Storybook examples: [`packages/react-bootstrap-table2-example/examples`](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/master/packages/react-bootstrap-table2-example/examples)**
