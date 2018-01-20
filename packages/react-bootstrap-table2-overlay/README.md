# react-bootstrap-table2-overlay
In `react-bootstrap-table2`, you will be easier to custom the loading or lverlay on table no matter if remote enabled or not. In the following, we have two way to do it:

-----

## Empty Table
[**`noDataIndication`**](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html#nodataindication-function) is a simple case you can take it, if current data size is empty, `react-bootstrap-table2` will call the `noDataIndication` prop and get the result to display on the table.   

[**Here**](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=EmptyTableOverlay) is a quick exmaple for `noDataIndication`.

## Loading Table
In the most of case for remote mode, you need the loading animation to tell the user the table is loading or doing some action in the background. Hence, you can lervarge [**`overlay`**](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html#overlay-function) prop.

[**Here**](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=EmptyTableOverlay) is also a example for `overlay`