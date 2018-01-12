---
id: basic-remote
title: Remote Table
sidebar_label: Work on Remote
---

## What is Remote

By default, `react-bootstrap-table2` always handle the data changes internally, such as sorting, paging, filtering etc. However, you may want to handle those logic or sync up to backend or Redux store so that `remote` can help you on it as well.

-----

## How
Make sure you already see [`remote`](./table-props.html#remote-bool-object) props on `BootstrapTable` firstly. In the beginning, you can assign `true` to enable the remote mode on table but few people doing like that, because it will enable all the functionalities(sort, filter etc) become `remote` mode.

In the most of case, you probably only need some functionalites handled on the remote, so `remote` allow you to pass an object to control it.

## Table/Data Change
It's the key point that you need to know something changed so that you can handle your data or logic externally. In the `remote` mode, you are supposed to give [`onTableChange`](./table-props.html#ontablechange-function) on `BootstrapTable` and it will being called when table have any changes if you enable the `remote` mode.

> All the changes are go though `onTableChange` listener,
> it's only way that table give fully control to you

Please read [`onTableChange`](./table-props.html#ontablechange-function) docs to understand how to leverage it.

## Remote Pagination
Pagination remote is a particular case in `react-bootstrap-table2`. If you enable the pagination remote mode, `react-bootstrap-table2` will not handle **sort** and **filter** internally, instead your application is supposed to handle it in the remote way.   

Because, **sort** and **filter** need to work on overall data. In the remote pagination, `react-bootstrap-table2` doesn't know all the data, only have the data on current page. So that's why you need to handle the remote filtering or sorting also.   

You can see [this](../storybook/index.html?selectedKind=Remote&selectedStory=Remote%20All) example to see how it work for above case.   

A good news is we are consider to easing this limitation through partical sorting/filtering on current page.