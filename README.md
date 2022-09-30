# Forked
- origin: https://www.npmjs.com/package/data-table-reactjs
# data table reactjs Key Features

- Declarative Configuration
- Built-in and configurable:
  - Sorting
  - Filtering
  - Download
  - Pagination
- Themeable/Customizable
- Responsive

## Installation

Data table react has only react as dependancy no other third party library is used.

## API and Usage

### Columns

Nothing new here - we are using an array of object literals and properties to describe the columns:

| Property   | Type   | Required | Example                                                                                                                                                                                                                    |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name       | string | yes      | the display name of our Column e.g. 'Name'                                                                                                                                                                                 |
| selector   | string | yes      | a data set unique property in dot notation. e.g. `property1.nested1` . A `selector` is required anytime you want to display data but can be ommitted if your column does not require showing data (e.g. an actions column) |
| sortable   | bool   | no       | if the column is sortable. columns will be sorted using basic sor functions and will have ability to sort `string, date, number`                                                                                           |
| filterable | bool   | no       | if the column is filterable. Rows will be filter by converting data to string type                                                                                                                                         |
| width      | string | no       | give the column a fixed width. Can be skiped for last column to cover remaining space.                                                                                                                                     |

### Actions

| Property  | Type     | Required | Default | Description                                                                    |
| --------- | -------- | -------- | ------- | ------------------------------------------------------------------------------ |
| key       | string   | yes      |         | key to should be unique                                                        |
| label     | string   | no       |         | label for the action                                                           |
| handler   | function | yes      |         | Call back to be called after action `click` which should accept `index , item` |
| className | string   | no       |         | class for the action                                                           |

### ReactDataTable Properties

#### Basic

| Property           | Type                | Required | Default | Description                                                          |
| ------------------ | ------------------- | -------- | ------- | -------------------------------------------------------------------- |
| title              | string              | no       |         | The Title displayed in the Table Header                              |
| columns            | array<Columns>      | yes      | []      | The column configuration                                             |
| isLoading          | bool                | no       |         | Show a loader                                                        |
| loadingComponent   | Component or string | no       |         | custom component to display                                          |
| list               | array<Object>       | yes      | []      | List of records containing properties with name of `column selector` |
| actions            | array<Actions>      | no       | []      | The action configuration                                             |
| pagination         | bool                | no       | false   | to enable pagination                                                 |
| showSerialNumber   | bool                | no       | false   | to show the serial number as first column of table                   |
| showDownloadOption | bool                | no       | false   | to show download file option                                         |

#### Class Names to modify styles of table

the class names are self explantory and can be used to customize the table view
`containerClass | titleContainerClass | titleClass | downloadDropDownContainerClass | downloadDropDownClass | tableClass | tableWapperClass | headerRowClass | headerCellClass | headerIconContainerClass | filterInputContainerClass | filterInputFieldClass | filterInputCrossClass | tableBodyClassName | tableRowClass | tableCellClass | actionsClass | tableFooterClass | pageSizeDropDownContainerClass | pageSizeDropDownClass | pageNumberContainerClass | pageNumberCellClass | activePageCellClass`
All classes can be passed to table

### Usage example

```js
import ReactDataTable from 'data-table-reactjs';
const columns = [
  {
    name: 'column 1',
    selector: 'column1',
  },
  {
    name: 'column 2',
    selector: 'column2',
  },
];
const actions = [
  {
    key: 'viewDetails',
    handler: (index, item) => {
      console.log(index, item);
    },
    label: 'View record',
  },
];
const list = [
  {
    column1: 'Value 1',
    column2: 'value 2',
  },
  {
    column1: 'Value 3',
    column2: 'value 4',
  },
  {
    column1: 'Value 5',
    column2: 'value 6',
  },
];
const MyComponent = () => (
  <ReactDataTable
    title="Title of the table"
    columns={columns}
    list={list}
    actions={actions}
    showSerialNumber
  />
);
```
