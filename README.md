# react-bootstrap-table2
Rebuilt [react-bootstrap-table](https://github.com/AllenFang/react-bootstrap-table)

> `react-bootstrap-table2`'s npm module name is [**`react-bootstrap-table-next`**](https://www.npmjs.com/package/react-bootstrap-table-next) due to some guys already used it ;(   

`react-bootstrap-table2` separate some functionalities from core modules to other modules like following:

* [`react-bootstrap-table2-next`](https://www.npmjs.com/package/react-bootstrap-table-next)
* [`react-bootstrap-table2-filter`](https://www.npmjs.com/package/react-bootstrap-table2-filter)
* [`react-bootstrap-table2-editor`](https://www.npmjs.com/package/react-bootstrap-table2-editor)
* [`react-bootstrap-table2-paginator`](https://www.npmjs.com/package/react-bootstrap-table2-paginator)
* [`react-bootstrap-table2-overlay`](https://www.npmjs.com/package/react-bootstrap-table2-overlay)

This can help your application with less bundled size and also help us have clean design to avoid handling to much logic in kernal module(SRP).

## Migration
If you are the user from legacy [`react-bootstrap-table`](https://github.com/AllenFang/react-bootstrap-table/), please have a look on [this](./docs/migration.md).

## Usage
See [getting started](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/getting-started.html).

## Online Demo
See `react-bootstrap-table2` [storybook](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html).

## Roadmap
See [release plans](https://react-bootstrap-table.github.io/react-bootstrap-table2/blog/2018/01/24/release-plan.html).

## Development
Please check [development guide](./docs/development.md).

## How should I run storybook example in my local?

```sh
$ git clone https://github.com/react-bootstrap-table/react-bootstrap-table2.git
$ cd react-bootstrap-table2
$ yarn install
$ yarn storybook
$ Go to localhost:6006
```

**Storybook examples: [`packages/react-bootstrap-table2-example/examples`](https://github.com/react-bootstrap-table/react-bootstrap-table2/tree/master/packages/react-bootstrap-table2-example/examples)**