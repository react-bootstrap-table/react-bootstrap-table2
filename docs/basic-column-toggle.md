---
id: basic-column-toggle
title: Column Toggle
sidebar_label: Column Toggle
---

`react-bootstrap-table2` support a toggle list for user to toggle the column visibility.

**[Live Demo For Column Toggle](../storybook/index.html?selectedKind=Column%20Toggle)**  

-----

## Prepare

Please check [How to start with table toolkit](./toolkits-getting-started.html)


## Enable Column Toggle

```js
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';

const { ToggleList } = ColumnToggle;
//...

<ToolkitProvider
  keyField="id"
  data={ products }
  columns={ columns }
  columnToggle
>
  {
    props => (
      <div>
        <ToggleList { ...props.columnToggleProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
        />
      </div>
    )
  }
</ToolkitProvider>
```

1. Enable column toggle via `columnToggle` prop on `ToolkitProvider`.

2. `ToolkitProvider` is a wrapper of react context, you should wrap the `BootstrapTable` and `ToggleList` as the child of `ToolkitProvider`.

3. Rendering `ToggleList` with `columnToggleProps`. The position of `ToggleList` is depends on you.


## Customize ToggleList Component

So far we only have limited customization on `ToggleList` component, following props is available for you:

* `btnClassName`: Add custom class on toggle button.
* `className`: Add custom class on toggle list.
* `contextual`: config bootstrap contextual, default is `primary`.

However, you can custom the whole thing by yourself like following:

```js
// This is my custom column toggle component

const CustomToggleList = ({
  columns,
  onColumnToggle,
  toggles
}) => (
  <div className="btn-group btn-group-toggle btn-group-vertical" data-toggle="buttons">
    {
      columns
        .map(column => ({
          ...column,
          toggle: toggles[column.dataField]
        }))
        .map(column => (
          <button
            type="button"
            key={ column.dataField }
            className={ `btn btn-warning ${column.toggle ? 'active' : ''}` }
            data-toggle="button"
            aria-pressed={ column.toggle ? 'true' : 'false' }
            onClick={ () => onColumnToggle(column.dataField) }
          >
            { column.text }
          </button>
        ))
    }
  </div>
);

export const MyTable = () => (
    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columnsdt }
      columnToggle
    >
      {
        props => (
          <div>
            <CustomToggleList { ...props.columnToggleProps } />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
);
```

Following, we just explain how it work:   

`ToolkitProvider` will pass a props which have a property called `columnToggleProps`. `columnToggleProps` have following properties: 

* `columns`: Column list
* `toggles`: An object which describe current column visibilities. `true` is on and `false` is off.
* `onColumnToggle`: Call this method when user toggle a column.

