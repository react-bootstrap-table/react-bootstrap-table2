---
id: export-csv-props
title: Export CSV Props
---
Export CSV in one of features supported by `react-bootstrap-table2-toolkit`. By passing `exportCSV` prop to `ToolkitProvider` for enabling this functionality. 


## Required
**N/A**

## Optional
* [fileName](#exportCSVfilename-string)
* [separator](#exportCSVseparator-string)
* [ignoreHeader](#exportCSVignoreheader-bool)
* [noAutoBOM](#exportCSVnoautobom-bool)

## Example

```js
<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  exportCSV={ {
    fileName: 'custom.csv',
    separator: '|',
    ignoreHeader: true,
    noAutoBOM: false
  } }
>
  //...
</ToolkitProvider>
```

-----

## exportCSV.fileName - [Bool]
Custom the csv file name.

## exportCSV.separator - [String]
Custom the csv file separator.

## exportCSV.ignoreHeader - [bool]
Default is `false`. Give true to avoid to attach the csv header.

## exportCSV.noAutoBOM - [bool]
Default is `true`.