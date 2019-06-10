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
* [blobType](#exportCSVblobtype-string)
* [exportAll](#exportCSVexportall-bool)
* [onlyExportSelection](#exportCSVonlyexportselection-bool)
* [onlyExportFiltered](#exportCSVonlyexportfiltered-bool)

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

## exportCSV.blobType - [string]
Default is `text/plain;charset=utf-8`. Change to update the blob type of the exported file.

## exportCSV.exportAll - [bool]
Default is `true`. `false` will only export current display data on table.

## exportCSV.onlyExportSelection - [bool]
Default is `false`. `true` will only export the data which is selected

## exportCSV.onlyExportFiltered - [bool]
Default is `false`. `true` will only export the data which is filtered/searched.

>> Note: When you configure this prop as true, you must turn off `exportAll`.
