---
id: basic-export-csv
title: Export to CSV
sidebar_label: Export to CSV
---

`react-bootstrap-table2` support export table data to CSV.

**[Live Demo For CSV Export](../storybook/index.html?selectedKind=Export%20CSV)**   
**[API & Props Definition](./export-csv-props.html)**   

-----

## Prepare

Please check [How to start with table toolkit](./toolkits-getting-started.html)


## Enable Export CSV

```js
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';

const { ExportCSVButton } = CSVExport;

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  exportCSV
>
  {
    props => (
      <div>
        <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
        <hr />
        <BootstrapTable { ...props.baseProps } />
      </div>
    )
  }
</ToolkitProvider>
```

* Give [`exportCSV`](./export-csv-props.html) prop as `true` on `ToolkitProvider`.
* Render `ExportCSVButton` with `csvProps`. The position of `ExportCSVButton` is depends on you.


## Customize Export CSV Component

`ExportCSVButton` is a independent component, it's free to place this component in anywhere, just make sure it is inside of the `ToolkitProvider`.   
You can add any `style` and `className` prop on `ExportCSVButton` for styling it.   

However, if you feel `ExportCSVButton` can not fit your requirement or you want more customization, you can create your own button like following:

```js
// This is my custom csv export component
const MyExportCSV = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <button className="btn btn-success" onClick={ handleClick }>Click me to export CSV</button>
    </div>
  );
};

export const MyTable = () => (
  <ToolkitProvider
    keyField="id"
    data={ products }
    columns={ columns }
    exportCSV
  >
    {
      props => (
        <div>
          <BootstrapTable { ...props.baseProps } />
          <hr />
          <MyExportCSV { ...props.csvProps } />
        </div>
      )
    }
  </ToolkitProvider>
);

```

Following, we just explain how it work:   

`ToolkitProvider` will pass a props which have a property called `csvProps`. `csvProps` have following properties: 

* `onExport`: Call this method will trigger export CSV.


In the customization case, you just need to pass `csvProps` to your component and call `csvProps.onExport` when export action trigger.

## Customize CSV Content

* Configure [column.csvExport](./column-props.html#columncsvExport-bool) to decide if hiden a column when exporting CSV.
* Configure [column.csvType](./column-props.html#columncsvType-object) to decide the data type.
* Configure [column.csvFormatter](./column-props.html#columncsvFormatter-function) to customize the column when exporting CSV.
* Configure [column.csvText](./column-props.html#columncsvText-string) to customize the column header.


## CSV Configuration

Please see available [`exportCSV`](./export-csv-props.html) props.


