---
id: basic-column
title: Work on Column
sidebar_label: Work on Column
---

Firstly, legacy `react-bootstrap-table` is hard to customize the DOM Event, Attributes on column or header column. In the `react-bootstrap-table2`, we make those bad design become more easy and flexible.

-----

## Formatting Table Column

[`column.formatter`](./column-props.html#columnformatter-function) is a good chance for you to customize the cell. If you just want to add some styling, attributes or DOM event linstener, `react-bootstrap-table2` have respective props to handle:

* [`column.style`](./column-props.html#columnstyle-object-function)
* [`column.classes`](./column-props.html#columnclasses-string-function)
* [`column.events`](./column-props.html#columnevents-object)
* [`column.attrs`](./column-props.html#columnattrs-object-function)

In addition, we also give some useful props to let you have a quickly configuration:

* [`column.hidden`](./column-props.html#columnhidden-bool)
* [`column.title`](./column-props.html#columntitle-bool-function)
* [`column.align`](./column-props.html#columnalign-string-function)
* *Welcome to submit a PR or issue for asking a convinence props for column :)*

## Formatting Table Header
Formatting header column is almost same as column formatting, we got [`column.headerFormatter`](./column-props.html#columnheaderformatter-function) to let you customize the content of a header column. Default `react-bootstrap-table2` will take [`column.text`](./column-props.html#columntext-required-string) as the content of header column.

Following, we list some useful props for customization:

* [`column.headerStyle`](./column-props.html#columnheaderstyle-object-function)
* [`column.headerClasses`](./column-props.html#columnheaderclasses-string-function)
* [`column.headerEvents`](./column-props.html#columnheaderevents-object)
* [`column.headerAttrs`](./column-props.html#columnheaderattrs-object-function)
* [`column.headerTitle`](./column-props.html#columnheadertitle-bool-function)
* [`column.headerAlign`](./column-props.html#columnheaderalign-string-function)